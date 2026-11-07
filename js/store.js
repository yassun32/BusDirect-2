export async function trips() {
    const response = await fetch("./data/trips.json");
    const trips = await response.json();

    return trips;
}

export async function initialiser() {
    const donnees = localStorage.getItem("trips");

    if (donnees) {
        return JSON.parse(donnees);
    }

    const tripsData = await trips();

    localStorage.setItem("trips", JSON.stringify(tripsData));

    return tripsData;
}