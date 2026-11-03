export async function chargerTrajets() {
    const response = await fetch("./data/trips.json");
    const trips = await response.json();

    return trips;
}

export async function initialiser() {
    const donnees = localStorage.getItem("trips");

    if (donnees) {
        return JSON.parse(donnees);
    }

    const trips = await chargerTrajets();

    localStorage.setItem("trips", JSON.stringify(trips));

    return trips;
}