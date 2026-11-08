import { renderTrajet, renderTrips, setAllTrips, handleFilter } from "./render.js";
import { trips } from "./store.js";

async function afficher() {
    const trajets = await trips();

    // Pass loaded data to render module and display first 6 trips
    setAllTrips(trajets);
    renderTrips(trajets, 1, 6);

    const passagers = trajets.reduce((total, trip) => {
        return total + trip.reservations.length;
    }, 0);

    const recette = trajets.reduce((total, trip) => {
        return total + (trip.reservations.length * trip.price);
    }, 0);

    document.getElementById("totalPassagers").textContent = passagers;
    document.getElementById("recette").textContent = recette + " DH";
}

const ville = document.getElementById("ville");
const filter = document.getElementById("filter");
const listeTrajets = document.getElementById("listeTrajets");

listeTrajets.addEventListener("click", function (event) {
    const cabine = event.target.closest("article");

    if (cabine && cabine.dataset.id) {
        const id = cabine.dataset.id;
        window.location.href = `cabine.html?id=${id}`;
    }
});

ville.addEventListener("input", handleFilter);
filter.addEventListener("change", handleFilter);

afficher();