import { initialiser } from "./store.js";
import { estVIP, prixSiege } from "./reservations.js";

const trips = await initialiser();
const id = Number(new URLSearchParams(location.search).get("id"))
const trajet = trips.find(trip => trip.id === id);

if (!trajet) {
    document.querySelector("#cabine").textContent = "Trajet introuvable";
} else {
    const placesLibres = trajet.capacity - trajet.reservations.length;
    const recette = trajet.reservations.reduce((total, reservation) => {
    return total + prixSiege(trajet.price, reservation.seat);
}, 0);

    const info = document.getElementById("infoTrajet");
    info.innerHTML = `
        <span class="font-bold">${trajet.departure} -> ${trajet.destination}</span>
        <span>${trajet.price} DH / place</span>
    `;
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
}
for (let i = 1; i <= 20; i++) {

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