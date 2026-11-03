
export function placesLibres(trip) {
    return trip.capacity - trip.reservations.length;
}

export function estComplet(trip) {
    return placesLibres(trip) <= 0; 
}
