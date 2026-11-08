import { initialiser } from "./store.js";

const trips = await initialiser();
const id = Number(new URLSearchParams(location.search).get("id"))

const trajet = trips.find(trip => trip.id === id)
const reservation = trajet.reservations.find(
    reservation => reservation.seat === numero
)
if (!trajet) {
    document.querySelector("#cabine").textContent = "Trajet introuvable";
}

const placesLibres = trajet.capacity - trajet.reservations.length;
const recette = trajet.reservations.length * trajet.price;
const info = document.getElementById("infoTrajet")

info.innerHTML = `
    <span class="font-bold">${trajet.departure} -> ${trajet.destination}</span>
    <span class="font-bold">${trajet.departureTime} -> ${trajet.arrivalTime}</span>
    <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">${trajet.price} DH / place </span>
    <span>Places libres : ${placesLibres}</span>
    <span>Recette : ${recette} DH</span>
`;

const sieges = document.getElementById("sieges");

for (let i = 1; i <= 20; i++) {

    const reservation = trajet.reservations.find(
        reservation => reservation.seat === i
    );

    sieges.innerHTML += `
        <div class="${reservation ? 'bg-red-100' : 'bg-green-100'} p-4 rounded shadow">
            <div class="text-lg font-bold">${i}</div>
            <p class="text-xs text-black">
                ${reservation ? reservation.name : "Libre"}
            </p>
        </div>
    `;
}