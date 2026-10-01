/*
  CONFERENCE PAGE DATA
  --------------------
  To add a new event, copy one item in CONFERENCES and change its values.
  Dates use YYYY-MM-DD. The page sorts entries, years, statistics, and map
  counts automatically. The `url` field is optional.

  If the event is in a new country, add that country once to COUNTRIES.
  Use the country's approximate longitude and latitude; the marker is then
  projected onto the map automatically. dx/dy are optional collision offsets.
*/

const COUNTRIES = {
  KR: { name: "South Korea", longitude: 127.8, latitude: 36.5 },
  IT: { name: "Italy", longitude: 12.6, latitude: 42.8, dx: 1.1, dy: 2.8 },
  FR: { name: "France", longitude: 2.2, latitude: 46.2, dx: -1.2 },
  PL: { name: "Poland", longitude: 19.1, latitude: 51.9, dx: 1.4, dy: -1.5 },
  JP: { name: "Japan", longitude: 140.1, latitude: 36.1, dx: 1.1, dy: 1.2 }
};

const CONFERENCES = [
  {
    title: "2026 International Conference for the 80th Anniversary of the KMS",
    start: "2026-06-22",
    end: "2026-06-25",
    venue: "ST Convention Center",
    city: "Seoul",
    country: "KR",
    url: "https://www.kms.or.kr/conference/meeting/index.html?period=91"
  },
  {
    title: "Ergodic Geometry and Discrete Groups in Irregular Worlds / Beyond Riemann",
    start: "2026-06-01",
    end: "2026-06-05",
    venue: "CIRM",
    city: "Marseille",
    country: "FR",
    url: "https://www.cirm-math.fr/Schedule/display.php?id_renc=3517"
  },
  {
    title: "Simons Semester: Continued Fractions, Fractals, Ergodic Theory and Dynamics (Weeks 4–5)",
    start: "2026-05-18",
    end: "2026-05-31",
    venue: "IMPAN",
    city: "Warsaw",
    country: "PL",
    url: "https://sites.google.com/impan.pl/simons-cfd2026/conference?authuser=0"
  },
  {
    title: "2026 Algebra Camp",
    start: "2026-01-25",
    end: "2026-01-29",
    venue: "Elysian Gangchon",
    city: "Gangchon",
    country: "KR"
  },
  {
    title: "Dynamical Group Theory VII",
    start: "2025-11-26",
    end: "2025-11-28",
    venue: "Seoul National University",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "2025 KMS Annual Meeting",
    start: "2025-10-22",
    end: "2025-10-24",
    venue: "ST Convention Center",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "Numeration and Substitution 2025",
    start: "2025-09-08",
    end: "2025-09-12",
    venue: "Tsukuba University",
    city: "Tsukuba",
    country: "JP"
  },
  {
    title: "Beyond Uniform Hyperbolicity II",
    start: "2025-06-09",
    end: "2025-06-13",
    venue: "ICTP",
    city: "Trieste",
    country: "IT"
  },
  {
    title: "Beyond Uniform Hyperbolicity I",
    start: "2025-06-02",
    end: "2025-06-06",
    venue: "ICTP",
    city: "Trieste",
    country: "IT"
  },
  {
    title: "2025 KMS Annual Meeting",
    start: "2025-04-24",
    end: "2025-04-26",
    venue: "KAIST",
    city: "Daejeon",
    country: "KR"
  },
  {
    title: "Workshop on Homogeneous and Complex Dynamics",
    start: "2025-03-26",
    end: "2025-03-28",
    venue: "Seoul National University",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "2025 Algebra Camp",
    start: "2025-02-09",
    end: "2025-02-13",
    venue: "Yangpyeong",
    city: "Yangpyeong",
    country: "KR"
  },
  {
    title: "Dynamical Group Theory V",
    start: "2024-11-19",
    end: "2024-11-22",
    venue: "Gimhae",
    city: "Gimhae",
    country: "KR"
  },
  {
    title: "2024 KMS Annual Meeting",
    start: "2024-10-24",
    end: "2024-10-26",
    venue: "Sungkyunkwan University",
    city: "Suwon",
    country: "KR"
  },
  {
    title: "Dynamical Group Theory IV",
    start: "2024-09-24",
    end: "2024-09-27",
    venue: "KIAS",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "Dynamical Group Theory III",
    start: "2024-08-13",
    end: "2024-08-16",
    venue: "KIAS",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "Number Theory Intensive Lecture Series",
    start: "2024-06-10",
    end: "2024-06-13",
    venue: "POSTECH",
    city: "Pohang",
    country: "KR"
  },
  {
    title: "Dynamical Group Theory",
    start: "2024-02-29",
    end: "2024-02-29",
    venue: "KIAS",
    city: "Seoul",
    country: "KR"
  },
  {
    title: "2024 Algebra Camp",
    start: "2024-02-03",
    end: "2024-02-07",
    venue: "Yangpyeong",
    city: "Yangpyeong",
    country: "KR"
  },
  {
    title: "2023 KMS Special Conference with 2022 Fields Medalists",
    start: "2023-10-26",
    end: "2023-10-28",
    venue: "Seoul National University",
    city: "Seoul",
    country: "KR"
  }
];

const state = {
  year: "all",
  country: "all"
};

const summary = document.querySelector("#summary");
const markers = document.querySelector("#map-markers");
const conferenceList = document.querySelector("#conference-list");
const yearFilters = document.querySelector("#year-filters");
const countryName = document.querySelector("#country-name");
const countryCities = document.querySelector("#country-cities");
const countryCount = document.querySelector("#country-count");
const countryCountLabel = document.querySelector("#country-count-label");
const clearCountry = document.querySelector("#clear-country");

const sortedEvents = [...CONFERENCES].sort(
  (a, b) => b.start.localeCompare(a.start)
);

const years = [
  ...new Set(sortedEvents.map(event => event.start.slice(0, 4)))
];

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function formatDateRange(startValue, endValue) {
  const start = parseDate(startValue);
  const end = parseDate(endValue);

  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  const startMonth = start.toLocaleString("en", {
    month: "short",
    timeZone: "UTC"
  });

  const endMonth = end.toLocaleString("en", {
    month: "short",
    timeZone: "UTC"
  });

  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();

  if (startValue === endValue) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${startDay}–${endMonth} ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear}–${endMonth} ${endDay}, ${endYear}`;
}

function eventStatus(event) {
  const today = new Date();

  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const start = parseDate(event.start).getTime();
  const end = parseDate(event.end).getTime();

  if (todayUTC < start) {
    return "Upcoming";
  }

  if (todayUTC <= end) {
    return "In progress";
  }

  return "Past";
}

function countryStats() {
  return sortedEvents.reduce((stats, event) => {
    if (!stats[event.country]) {
      stats[event.country] = {
        count: 0,
        cities: new Set()
      };
    }

    stats[event.country].count += 1;
    stats[event.country].cities.add(event.city);

    return stats;
  }, {});
}

function renderSummary() {
  const firstYear = Math.min(...years.map(Number));
  const lastYear = Math.max(...years.map(Number));

  const stats = [
    [sortedEvents.length, "academic events"],
    [Object.keys(countryStats()).length, "countries"],
    [`${firstYear}–${lastYear}`, "attendance record"]
  ];

  summary.innerHTML = stats
    .map(
      ([value, label]) =>
        `<li>
          <strong>${value}</strong>
          <span>${label}</span>
        </li>`
    )
    .join("");
}

function markerPosition(country) {
  const left =
    3.5 +
    ((country.longitude + 180) / 360) * 93 +
    (country.dx || 0);

  const top =
    7 +
    ((90 - country.latitude) / 180) * 86 +
    (country.dy || 0);

  return {
    left,
    top
  };
}

function renderMarkers() {
  const stats = countryStats();

  markers.innerHTML = Object.entries(stats)
    .map(([code, data]) => {
      const country = COUNTRIES[code];
      const position = markerPosition(country);
      const pressed = state.country === code;

      return `
        <button
          class="map-marker"
          type="button"
          data-country="${code}"
          style="left:${position.left}%;top:${position.top}%"
          aria-label="${country.name}: ${data.count} events"
          aria-pressed="${pressed}"
        >
          <span class="marker-core">${data.count}</span>
          <span class="marker-name">${country.name}</span>
        </button>
      `;
    })
    .join("");

  markers.querySelectorAll(".map-marker").forEach(marker => {
    marker.addEventListener("click", () => {
      state.country = marker.dataset.country;

      renderAllDynamic();

      document.querySelector("#archive-title").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderCountryDetail() {
  const stats = countryStats();

  if (state.country === "all") {
    countryName.textContent = "All destinations";
    countryCities.textContent =
      "Select a country marker to filter the attendance archive.";
    countryCount.textContent = sortedEvents.length;
    countryCountLabel.textContent = "events in total";
    clearCountry.hidden = true;

    return;
  }

  const country = COUNTRIES[state.country];
  const data = stats[state.country];

  countryName.textContent = country.name;
  countryCities.textContent = [...data.cities].sort().join(" · ");
  countryCount.textContent = data.count;

  countryCountLabel.textContent =
    data.count === 1
      ? "event attended"
      : "events attended";

  clearCountry.hidden = false;
}

function renderYearFilters() {
  const options = ["all", ...years];

  yearFilters.innerHTML = options
    .map(year => {
      const label =
        year === "all"
          ? "All years"
          : year;

      return `
        <button
          class="filter-button"
          type="button"
          data-year="${year}"
          aria-pressed="${state.year === year}"
        >
          ${label}
        </button>
      `;
    })
    .join("");

  yearFilters
    .querySelectorAll(".filter-button")
    .forEach(button => {
      button.addEventListener("click", () => {
        state.year = button.dataset.year;

        renderYearFilters();
        renderEvents();
      });
    });
}

function eventMarkup(event) {
  const status = eventStatus(event);
  const isUpcoming = status !== "Past";
  const country = COUNTRIES[event.country];

  const place =
    event.venue === event.city
      ? `${event.city}, ${country.name}`
      : `${event.venue} · ${event.city}, ${country.name}`;

  const link = event.url
    ? `
      <a
        class="event-link"
        href="${event.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Event page ↗
      </a>
    `
    : "";

  return `
    <article class="event-card${isUpcoming ? " is-upcoming" : ""}">
      <div class="event-date">
        ${
          isUpcoming
            ? `<span class="event-status">${status}</span>`
            : ""
        }
        ${formatDateRange(event.start, event.end)}
      </div>

      <div>
        <h3>${event.title}</h3>
        <p class="event-meta">${place}</p>
      </div>

      ${link}
    </article>
  `;
}

function renderEvents() {
  const filtered = sortedEvents.filter(event => {
    const yearMatch =
      state.year === "all" ||
      event.start.startsWith(state.year);

    const countryMatch =
      state.country === "all" ||
      event.country === state.country;

    return yearMatch && countryMatch;
  });

  if (!filtered.length) {
    conferenceList.innerHTML = `
      <p class="empty-state">
        No events match the selected filters.
      </p>
    `;

    return;
  }

  const groups = filtered.reduce((result, event) => {
    const year = event.start.slice(0, 4);

    if (!result[year]) {
      result[year] = [];
    }

    result[year].push(event);

    return result;
  }, {});

  conferenceList.innerHTML = Object.entries(groups)
    .map(
      ([year, events]) => `
        <section
          class="year-group"
          aria-labelledby="year-${year}"
        >
          <h3
            class="year-heading"
            id="year-${year}"
          >
            ${year}
          </h3>

          <div class="event-list">
            ${events.map(eventMarkup).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderAllDynamic() {
  renderMarkers();
  renderCountryDetail();
  renderEvents();
}

clearCountry.addEventListener("click", () => {
  state.country = "all";

  renderAllDynamic();
});

renderSummary();
renderYearFilters();
renderAllDynamic();
