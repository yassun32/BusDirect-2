export function validerNom(nom, reservations) {

    if (nom.trim() === "") {
        return "Le nom du passager est obligatoire.";
    }

    const existe = reservations.some(reservation =>
        reservation.name.toLowerCase() === nom.trim().toLowerCase()
    );

    if (existe) {
        return "Ce passager est déjà réservé sur ce trajet.";
    }

    return "";
}
export function validerTelephone(telephone) {

    if (!/^0[67]\d{8}$/.test(telephone)) {
        return "10 chiffres commençant par 06 ou 07";
    }

    return "";
}
export function validerTelephoneExiste(telephone, trip) {

    const existeReservation = trip.reservations.some(reservation =>
        reservation.phone === telephone
    );

    const existeWaiting = trip.waitingList.some(personne =>
        personne.phone === telephone
    );

    if (existeReservation || existeWaiting) {
        return "Ce numéro est déjà utilisé sur ce trajet.";
    }

    return "";
}