// Add each newly confirmed talk here. The site sorts talks by date automatically.
const talks = [
  {
    title: "Lagrangian Frame Approximation: From Dirichlet to Khintchine",
    event: "Online Seminar in Diophantine Approximation and Related Topics",
    startsAt: "2026-11-05T14:00:00+01:00",
    timeZone: "Europe/Paris",
    timeZoneLabel: "Paris",
    venue: "Online · Zoom",
    summary: [
      "Approximating with several independent integer vectors usually weakens the classical Dirichlet rate. For symmetric matrices, the talk explains how imposing the Lagrangian condition on a primitive frame restores that rate.",
      "It also presents a Khintchine-type result for these frames and describes the role of reduction theory, symplectic lattices, and frame counting in the proofs."
    ],
    attendance: "Registration is required. Contact the organizers through the seminar page to receive the Zoom link.",
    url: "https://perso.math.u-pem.fr/marnat.antoine/online-seminar-in-diophantine-approximation-and-related-topics.html"
  }

  // For another talk, add a comma after the previous } and copy this example:
  // {
  //   title: "Talk title",
  //   event: "Seminar or conference name",
  //   startsAt: "2026-12-10T14:00:00+01:00", // local time + UTC offset
  //   timeZone: "Europe/Paris",             // IANA time zone for date display
  //   timeZoneLabel: "Paris",
  //   venue: "Online · Zoom",
  //   summary: ["Brief description of the talk."],
  //   attendance: "Registration details, if any.",
  //   url: "https://example.com/event"
  // }
];

const sortedTalks = [...talks].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
const now = Date.now();
const upcomingTalks = sortedTalks.filter(talk => Date.parse(talk.startsAt) >= now);
const pastTalks = sortedTalks.filter(talk => Date.parse(talk.startsAt) < now).reverse();

function formatDate(talk, options) {
  return new Intl.DateTimeFormat("en-US", { timeZone: talk.timeZone, ...options })
    .format(new Date(talk.startsAt));
}

function formatTime(talk, timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(talk.startsAt));
}

function timeDetails(talk) {
  const localDate = formatDate(talk, { year: "numeric", month: "numeric", day: "numeric" });
  const seoulDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul", year: "numeric", month: "numeric", day: "numeric"
  }).format(new Date(talk.startsAt));
  const nextDay = localDate === seoulDate ? "" : ` (${new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul", month: "short", day: "numeric"
  }).format(new Date(talk.startsAt))})`;
  return `${formatTime(talk, talk.timeZone)} ${talk.timeZoneLabel} · ${formatTime(talk, "Asia/Seoul")} Seoul${nextDay}`;
}

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
}

function renderHome() {
  const feature = document.getElementById("next-talk");
  if (!feature || upcomingTalks.length === 0) return;
  const next = upcomingTalks[0];
  document.getElementById("next-talk-month").textContent = formatDate(next, { month: "short" }).toUpperCase();
  document.getElementById("next-talk-day").textContent = formatDate(next, { day: "2-digit" });
  document.getElementById("talk-feature-title").textContent = next.title;
  document.getElementById("next-talk-info").textContent = `${formatDate(next, {
    year: "numeric", month: "long", day: "numeric"
  })} · ${timeDetails(next)}`;
  feature.hidden = false;
}

function talkCard(talk, isPast) {
  const card = element("article", "talk-card");
  card.append(
    element("p", "section-label", talk.venue),
    element("h3", "", talk.title),
    element("p", "talk-event", talk.event),
    element("p", "talk-time", `${formatDate(talk, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    })} · ${timeDetails(talk)}`)
  );
  for (const paragraph of talk.summary || []) card.append(element("p", "talk-summary", paragraph));
  if (!isPast && talk.attendance) card.append(element("p", "talk-attendance", talk.attendance));
  if (talk.url) {
    const link = element("a", "talk-link", "Official event page ↗");
    link.href = talk.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.append(link);
  }
  return card;
}

function renderTalksPage() {
  const upcomingList = document.getElementById("upcoming-talks");
  if (!upcomingList) return;
  if (upcomingTalks.length === 0) {
    upcomingList.append(element("p", "empty-state", "No upcoming talks have been announced."));
  } else {
    upcomingTalks.forEach(talk => upcomingList.append(talkCard(talk, false)));
  }

  const pastSection = document.getElementById("past-section");
  if (pastTalks.length > 0) {
    const pastList = document.getElementById("past-talks");
    pastTalks.forEach(talk => pastList.append(talkCard(talk, true)));
    pastSection.hidden = false;
  }
}

renderHome();
renderTalksPage();
