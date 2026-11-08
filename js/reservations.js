
export function placesLibres(trip) {
    return trip.capacity - trip.reservations.length;
}

export function estComplet(trip) {
    return placesLibres(trip) <= 0; 
}
export function estVIP(numero) {
    return numero >= 1 && numero <= 4;
}
export function prixSiege(prix, numero) {
    if (estVIP(numero)) {
        return Math.round(prix * 1.1);
    }

    return prix;
}