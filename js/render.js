import { placesLibres, estComplet } from "./reservations.js";

// Master array to store loaded trips for filtering
let allTrips = [];

export function setAllTrips(data) {
  allTrips = data;
}

export function renderTrajet(trip) {
  const { departure, destination, price } = trip;

  const libres = placesLibres(trip);
  const complet = estComplet(trip);

  const badge = complet
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";

  const statut = complet ? "Complet" : "Disponible";

  return `
        <article data-id="${trip.id}" class="m-6 bg-white rounded-xl border p-5 shadow-sm cursor-pointer hover:shadow-lg">
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

export function renderTrips(modifiedTrips, page = 1, size = 6) {
  if (modifiedTrips === undefined || modifiedTrips === null) {
    modifiedTrips = allTrips;
  }

  let tripsContainer = document.getElementById("listeTrajets");
  tripsContainer.innerHTML = "";

  let startIndex = (page - 1) * size;
  let endIndex = startIndex + size;

  let selectedTrips = modifiedTrips.slice(startIndex, endIndex);

  selectedTrips.forEach((trip) => {
    tripsContainer.innerHTML += renderTrajet(trip);
  });

  renderPagination(modifiedTrips, page, modifiedTrips.length, size);
}

export function handleFilter() {
  const serchCity = document.getElementById("ville");
  const statusSelector = document.getElementById("filter");

  const city = serchCity.value.toLowerCase().trim();
  const status = statusSelector.value.toLowerCase();

  const filtredTrips = allTrips.filter((trip) => {
    const matchCity =
      trip.departure.toLowerCase().includes(city) ||
      trip.destination.toLowerCase().includes(city);

    let matchFilter = false;

    if (status === "tous") {
      matchFilter = true;
    } else if (status === "disponible") {
      matchFilter = !estComplet(trip);
    } else if (status === "complet") {
      matchFilter = estComplet(trip);
    }

    return matchCity && matchFilter;
  });

  renderTrips(filtredTrips, 1, 6);
}

export function renderPagination(modifiedTrips, courantPage, totalElement, pageSize) {
  const paginationHTML = document.getElementById("pagination");

  paginationHTML.innerHTML = "";

  let totalPages = Math.ceil(totalElement / pageSize);

  if (totalPages <= 1) {
    return;
  }

  // Previous button
  if (courantPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "&lt;";
    prevBtn.className = "hover:cursor-pointer rounded-[12px] px-4 py-2 bg-[#E7E5E4] text-black font-semibold";
    prevBtn.addEventListener("click", () => {
      renderTrips(modifiedTrips, courantPage - 1, pageSize);
    });
    paginationHTML.appendChild(prevBtn);
  }

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === courantPage) {
      btn.className = "rounded-[12px] px-4 py-2 bg-[#0C1E4A] text-white font-semibold";
    } else {
      btn.className = "hover:cursor-pointer rounded-[12px] px-4 py-2 bg-[#E7E5E4] text-black";
    }

    btn.addEventListener("click", () => {
      renderTrips(modifiedTrips, i, pageSize);
    });

    paginationHTML.appendChild(btn);
  }

  // Next button
  if (courantPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&gt;";
    nextBtn.className = "hover:cursor-pointer rounded-[12px] px-4 py-2 bg-[#E7E5E4] text-black font-semibold";
    nextBtn.addEventListener("click", () => {
      renderTrips(modifiedTrips, courantPage + 1, pageSize);
    });
    paginationHTML.appendChild(nextBtn);
  }
}

export function renderCabine(trip) {}
export function renderListeAttente(trip) {}
export function afficherMessage(el, texte) {}