import { renderTrajet } from "./render.js";
import { chargerTrajets } from "./store.js";

async function afficher() {
    const trajets = await chargerTrajets();

    const liste = document.getElementById("listeTrajets");

    liste.innerHTML = trajets
        .map(trip => renderTrajet(trip))
        .join("");

    const passagers = trajets.reduce((total, trip) => {
        return total + trip.reservations.length;
    }, 0);

    const recette = trajets.reduce((total, trip) => {
        return total + (trip.reservations.length * trip.price);
    }, 0);

    document.getElementById("totalPassagers").textContent = passagers;
    document.getElementById("recette").textContent = recette + " DH";
}

afficher();
