import { initialiser, sauvegarder } from "./store.js";
import { estVIP, prixSiege } from "./reservations.js";
import { validerNom, validerTelephone, validerTelephoneExiste } from "./validators.js";

const trips = await initialiser()
const id = Number(new URLSearchParams(location.search).get("id"))
const trajet = trips.find(trip => trip.id === id)

if (!trajet) {
    document.querySelector("#cabine").textContent = "Trajet introuvable"
} else {
    const info = document.getElementById("infoTrajet")
    const choix = document.getElementById("choix");
    info.innerHTML = `
        <span class="font-bold">${trajet.departure} -> ${trajet.destination}</span>
        <span>${trajet.price} DH / place</span>
    `


    function afficherDonnees() {
        const placesLibres = trajet.capacity - trajet.reservations.length;

        const recette = trajet.reservations.reduce((total, reservation) => {
            return total + prixSiege(trajet.price, reservation.seat);
        }, 0);

        // Actualiser les informations
        const totalp = document.getElementById("totalp");

        totalp.innerHTML = `
        <span class="font-bold">Time : ${trajet.departureTime} -> ${trajet.arrivalTime}</span>
        <p class="text-green-600 font-semibold">
            • Places disponibles : ${placesLibres}
        </p>
        <p class="text-red-600 font-semibold">
            • Places réservées : ${trajet.reservations.length}
        </p>
        <p class="text-yellow-600 font-semibold">
            • Sièges VIP : 01 - 04
        </p>
        <p>• Recette : ${recette} DH</p>
    `;

        // Actualiser la liste des sièges libres
        const choixSiege = document.getElementById("availbelseats");

        choixSiege.innerHTML = `<option value="">-- Siège libre --</option>`;

        for (let i = 1; i <= trajet.capacity; i++) {
            const reservation = trajet.reservations.find(
                reservation => reservation.seat === i
            );

            if (!reservation) {
                const prix = prixSiege(trajet.price, i);

                choixSiege.innerHTML += `
                <option value="${i}">
                    Siège ${String(i).padStart(2, "0")}
                    ${estVIP(i) ? "— VIP" : "—"}
                    ${prix} DH
                </option>
            `;
            }
        }

        // Actualiser les sièges affichés
        for (let i = 1; i <= trajet.capacity; i++) {
            const seat = document.getElementById(i);

            const reservation = trajet.reservations.find(
                reservation => reservation.seat === i
            );

            const vip = estVIP(i);

            seat.className = `
            ${vip ? 'bg-yellow-100 border-yellow-400' :
                    reservation ? 'bg-red-100 border-red-200' :
                        'bg-green-100 border-green-200'}
            p-4 rounded shadow border text-center
        `;

            seat.innerHTML = `
            <div class="text-lg font-bold">${i}</div>
            ${vip ? '<span class="text-xs bg-yellow-400 px-2 rounded">VIP</span>' : ''}
            <p class="text-xs text-black">
                ${reservation ? reservation.name : "Libre"}
            </p>
        `;
        }
        const choixSupp = document.getElementById("choixSupp");
        choix.innerHTML = `<option value="">-- Choisir passager --</option>`;
        choixSupp.innerHTML = `<option value="">-- Choisir passager --</option>`;
        trajet.reservations.forEach(function (reservation) {
            choix.innerHTML += `
        <option value="${reservation.seat}">
            ${reservation.name}
        </option>
    `;

            choixSupp.innerHTML += `
        <option value="${reservation.seat}">
            ${reservation.name}
        </option>
    `;
        });
    }
    afficherDonnees();


    // Formulaire de réservation
    const form = document.getElementById("ajout")

    form.addEventListener("submit", function (event) {
        event.preventDefault()

        const nom = document.getElementById("nome").value
        const telephone = document.getElementById("telephone").value
        const erreurNom = validerNom(nom, trajet.reservations)
        document.getElementById("erreurNom").textContent = erreurNom
        if (erreurNom) {
            return
        }
        const erreurTelephone = validerTelephone(telephone)
        document.getElementById("erreurTelephone").textContent = erreurTelephone

        if (erreurTelephone) {
            return
        }
        const erreurTelephoneExiste = validerTelephoneExiste(telephone, trajet)
        document.getElementById("erreurTelephone").textContent = erreurTelephoneExiste

        if (erreurTelephoneExiste) {
            return
        }
        const siegeChoisi = Number(document.getElementById("availbelseats").value)
        let siege = siegeChoisi
        if (!siege) {
            for (let i = 5; i <= trajet.capacity; i++) {
                const existe = trajet.reservations.some(
                    reservation => reservation.seat === i
                )

                if (!existe) {
                    siege = i
                    break
                }
            }
        }
        if (!siege) {
            return
        }
        const nouvelle = {
            seat: siege,
            name: nom,
            phone: telephone
        }

        trajet.reservations = [...trajet.reservations, nouvelle]
        sauvegarder(trips)
        afficherDonnees();
        const message = document.getElementById("message");

        message.textContent = "Réservation confirmée";

        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    })

    choix.addEventListener("change", function () {
        const reservation = trajet.reservations.find(function (r) {
            return r.seat === Number(choix.value);
        });

        if (!reservation) {
            return;
        }

        document.getElementById("nvnome").value = reservation.name;
        document.getElementById("nvtelephone").value = reservation.phone;

        const choixSiege = document.getElementById("siege");

        choixSiege.innerHTML = `
        <option value="">-- Garder même siège --</option>
    `;

        for (let i = 1; i <= trajet.capacity; i++) {

            const occupe = trajet.reservations.some(function (reservation) {
                return reservation.seat === i;
            });

            if (occupe === false || i === reservation.seat) {
                choixSiege.innerHTML += `
            <option value="${i}">Siège ${i}</option>
        `;
            }
        }
    });
    const modification = document.getElementById("modification");


    modification.addEventListener("submit", function (event) {
        event.preventDefault();

        const siegeActuel = Number(choix.value);
        const nom = document.getElementById("nvnome").value;
        const telephone = document.getElementById("nvtelephone").value;
        const siege = Number(document.getElementById("siege").value);
        if (!choix.value) {
            return;
        }
        console.log("siegeActuel:", siegeActuel);
        console.log("telephone:", telephone);
        console.log("reservations:", trajet.reservations);
        const erreurNom = validerNom(nom, trajet.reservations, siegeActuel);
        const erreurTelephone = validerTelephone(telephone);
        const erreurTelephoneExiste = validerTelephoneExiste(telephone, trajet, siegeActuel);
        if (erreurNom || erreurTelephone || erreurTelephoneExiste) {
            document.getElementById("message").textContent =
                erreurNom || erreurTelephone || erreurTelephoneExiste;

            return;
        }
        const nouveauSiege = siege || siegeActuel;
        trajet.reservations = trajet.reservations.map(function (seulReservation) {
            if (seulReservation.seat === siegeActuel) {
                return {
                    ...seulReservation,
                    name: nom,
                    phone: telephone,
                    seat: nouveauSiege
                };
            }
            return seulReservation;
        });
        sauvegarder(trips);
        afficherDonnees();
        const message = document.getElementById("message");
        message.textContent = "Modification effectuée avec succès.";
        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    });
    const supprition = document.getElementById("supprition");
    supprition.addEventListener("submit", function (event) {
        event.preventDefault();
        const siegeSupp = Number(document.getElementById("choixSupp").value);
        if (!siegeSupp) {
            return;
        }
        trajet.reservations = trajet.reservations.filter(function (reservation) {
            return reservation.seat !== siegeSupp;
        });
        sauvegarder(trips);
        afficherDonnees();
        const message = document.getElementById("message");
        message.textContent = "Réservation annulée avec succès.";
        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    });
}
