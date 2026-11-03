
import { placesLibres, estComplet } from "./reservations.js";

export function renderTrajet(trip) {
    const { departure, destination, price } = trip;

    const libres = placesLibres(trip);
    const complet = estComplet(trip);

    const badge = complet
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700";

    const statut = complet ? "Complet" : "Disponible"; // "condition ?" valueIfTrue : valueIfFalse

    return `
        <article class="m-6 bg-white rounded-xl border p-5 shadow-sm">

            <div class="flex justify-between items-center mb-5">
                <h2 class="font-bold text-lg">BusDirect</h2>

                <span class="${badge} px-3 py-1 rounded-full text-sm">
                    ${statut}
                </span>
            </div>

            <div class="flex justify-between items-center mb-5">
                <div>
                    <h3 class="font-bold text-lg">${departure}</h3>
                    <p class="text-gray-500">${trip.departureTime}</p>
                </div>

                <span class="text-blue-600 text-xl">&rarr;</span>

                <div class="text-right">
                    <h3 class="font-bold text-lg">${destination}</h3>
                    <p class="text-gray-500">${trip.arrivalTime}</p>
                </div>
            </div>

            <div class="border-t pt-4 space-y-3">
                <p class="flex justify-between">
                    <span>Prix</span>
                    <span class="font-bold">${price} DH</span>
                </p>

                <p class="flex justify-between">
                    <span>Places libres</span>
                    <span>${libres}</span>
                </p>

                <p class="flex justify-between">
                    <span>Liste d'attente</span>
                    <span>${trip.waitingList.length}</span>
                </p>
            </div>

        </article>
    `;
}
export function  renderPagination(page, total) {
    
}
export function  renderCabine(trip) {
    
}
export function  renderListeAttente(trip)
{
    
}
export function  afficherMessage(el, texte) {
    
}
