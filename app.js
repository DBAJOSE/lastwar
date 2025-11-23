const SLOT_DURATION_HOURS = 4;

let timelineContext = {
  todayEventDay: 1,
  todayVsDay: 2,
  tomorrowEventDay: 2,
  tomorrowVsDay: 3
};

const themeDetails = {
  "Avance de Héroe": "Usa EXP, fragmentos y medallas. Tip S1: Prioriza subir a Mason a UR (5 estrellas) y guarda fragmentos para el día del duelo.",
  "Construcción de Ciudad": "Mejora Cuarteles y Centro de Mando. Tip S1: Prioriza las Granjas de Proteínas (sube a Nvl 10+ para optimizar costes).",
  "Progresión de Unidad": "Entrena tropas de alto nivel. Tip S1: Usa la profesión 'Ingeniero' para reducir costes de entrenamiento si es posible.",
  "Investigación Tecnológica": "Acelera el laboratorio. Tip S1: La 'Inmunidad al Virus' es crítica; sin ella no podrás atacar zombis de nivel alto.",
  "Mejora de Dron": "Consume componentes y placas. Tip: Acumula cofres toda la semana y ábrelos solo el día del duelo (Miércoles/Sábado).",
  "Construcción de Ciudad (final)": "Cierra la semana asegurando puntos. Tip S1: Usa los aceleradores de construcción sobrantes en el Instituto de Virus."
};

const themeBestVsDays = {
  "Avance de Héroe": [4],
  "Construcción de Ciudad": [2, 5, 6],
  "Progresión de Unidad": [5, 6],
  "Investigación Tecnológica": [5, 6],
  "Mejora de Dron": [3],
  "Construcción de Ciudad (final)": [2, 5, 6]
};


const eventDays = [
  {
    day: 1,
    weekday: "Martes",
    slots: [
      { startHour: 21, theme: "Avance de Héroe" },
      { startHour: 1, theme: "Construcción de Ciudad" },
      { startHour: 5, theme: "Progresión de Unidad" },
      { startHour: 9, theme: "Investigación Tecnológica" },
      { startHour: 13, theme: "Mejora de Dron" },
      { startHour: 17, theme: "Avance de Héroe" }
    ]
  },
  {
    day: 2,
    weekday: "Miércoles",
    slots: [
      { startHour: 21, theme: "Construcción de Ciudad" },
      { startHour: 1, theme: "Progresión de Unidad" },
      { startHour: 5, theme: "Investigación Tecnológica" },
      { startHour: 9, theme: "Mejora de Dron" },
      { startHour: 13, theme: "Avance de Héroe" },
      { startHour: 17, theme: "Construcción de Ciudad" }
    ]
  },
  {
    day: 3,
    weekday: "Jueves",
    slots: [
      { startHour: 21, theme: "Progresión de Unidad" },
      { startHour: 1, theme: "Investigación Tecnológica" },
      { startHour: 5, theme: "Mejora de Dron" },
      { startHour: 9, theme: "Avance de Héroe" },
      { startHour: 13, theme: "Construcción de Ciudad" },
      { startHour: 17, theme: "Progresión de Unidad" }
    ]
  },
  {
    day: 4,
    weekday: "Viernes",
    slots: [
      { startHour: 21, theme: "Investigación Tecnológica" },
      { startHour: 1, theme: "Mejora de Dron" },
      { startHour: 5, theme: "Avance de Héroe" },
      { startHour: 9, theme: "Construcción de Ciudad" },
      { startHour: 13, theme: "Progresión de Unidad" },
      { startHour: 17, theme: "Investigación Tecnológica" }
    ]
  },
  {
    day: 5,
    weekday: "Sábado",
    slots: [
      { startHour: 21, theme: "Mejora de Dron" },
      { startHour: 1, theme: "Avance de Héroe" },
      { startHour: 5, theme: "Construcción de Ciudad" },
      { startHour: 9, theme: "Progresión de Unidad" },
      { startHour: 13, theme: "Investigación Tecnológica" },
      { startHour: 17, theme: "Mejora de Dron" }
    ]
  },
  {
    day: 6,
    weekday: "Domingo",
    slots: [
      { startHour: 21, theme: "Avance de Héroe" },
      { startHour: 1, theme: "Construcción de Ciudad" },
      { startHour: 5, theme: "Progresión de Unidad" },
      { startHour: 9, theme: "Investigación Tecnológica" },
      { startHour: 13, theme: "Mejora de Dron" },
      { startHour: 17, theme: "Avance de Héroe" }
    ]
  },
  {
    day: 7,
    weekday: "Domingo (Cierre)",
    slots: [
      { startHour: 21, theme: "Construcción de Ciudad" },
      { startHour: 1, theme: "Progresión de Unidad" },
      { startHour: 5, theme: "Investigación Tecnológica" },
      { startHour: 9, theme: "Mejora de Dron" },
      { startHour: 13, theme: "Avance de Héroe" },
      { startHour: 17, theme: "Construcción de Ciudad" }
    ]
  }
];

const vsDays = [
  {
    day: 1,
    weekday: "Lunes",
    tasks: [
      { name: "Use 1 de energía", points: 300 },
      { name: "Complete 1 tarea de radar", points: 25000 },
      { name: "Use al menos 6600 puntos EXP de héroe en una sola vez", points: 2 },
      { name: "Use 1 poción de datos de batalla de dron", points: 5 },
      { name: "Use 1 placa de dron", points: 5000 },
      { name: "Compre paquetes que contengan diamantes (1 diamante)", points: 30 },
      { name: "Reduzca el daño (varios tipos, cada uno)", points: 40 }
    ]
  },
  {
    day: 2,
    weekday: "Martes",
    tasks: [
      { name: "Use acelerador de construcción 1 m", points: 125 },
      { name: "Aumente el poder de edificio en 1 punto", points: 21.5 },
      { name: "Envíe caravana de comercio legendario 1 vez", points: 200000 },
      { name: "Realice 1 tarea secreta de rango-UR", points: 150000 },
      { name: "Compre paquetes con diamantes (1 diamante)", points: 30 },
      { name: "Reclute superviviente 1 vez", points: 3000 }
    ]
  },
  {
    day: 3,
    weekday: "Miércoles",
    tasks: [
      { name: "Complete 1 tarea de radar", points: 25000 },
      { name: "Compra paquetes que contengan diamantes (1 diamante)", points: 30 },
      { name: "Cofre de componentes de dron Nvl. 1 abierto", points: 2200 },
      { name: "Cofre de componentes de dron Nvl. 2 abierto", points: 6600 },
      { name: "Cofre de componentes de dron Nvl. 3 abierto", points: 20000 },
      { name: "Cofre de componentes de dron Nvl. 4 abierto", points: 60000 },
      { name: "Cofre de componentes de dron Nvl. 5 abierto", points: 180000 },
      { name: "Cofre de componentes de dron Nvl. 6 abierto", points: 540000 },
      { name: "Cofre de componentes de dron Nvl. 7 abierto", points: 1620000 }
    ]
  },
  {
    day: 4,
    weekday: "Jueves",
    tasks: [
      { name: "Realice 1 reclutamiento de héroe", points: 3525 },
      { name: "Use al menos 660 puntos EXP de héroe en una sola vez", points: 2 },
      { name: "Use 1 fragmento de héroe de rango-UR", points: 20000 },
      { name: "Use 1 fragmento de héroe de rango-SSR", points: 7000 },
      { name: "Use 1 fragmento de héroe de rango-SR", points: 2000 },
      { name: "Usar 1 medalla de habilidad", points: 20 },
      { name: "Compra paquetes que contengan diamantes (1 diamante)", points: 30 }
    ]
  },
  {
    day: 5,
    weekday: "Viernes",
    tasks: [
      { name: "Complete 1 tarea de radar", points: 25000 },
      { name: "Use acelerador de construcción 1 m", points: 125 },
      { name: "Aumente el poder de edificio en 1 punto", points: 21.5 },
      { name: "Use acelerador de investigación 1 m", points: 125 },
      { name: "Aumente el poder de tecnología en 1 punto", points: 21.5 },
      { name: "Use acelerador de entrenamiento 1 m", points: 125 },
      { name: "Entrene una unidad de Nvl. 7", points: 184 },
      { name: "Compra paquetes que contengan diamantes (1 diamante)", points: 30 }
    ]
  },
  {
    day: 6,
    weekday: "Sábado",
    tasks: [
      { name: "Envíe camión de comercio legendario 1 vez", points: 200000 },
      { name: "Realice 1 tarea secreta de rango-UR", points: 150000 },
      { name: "Use acelerador de construcción 1 m", points: 125 },
      { name: "Use acelerador de investigación 1 m", points: 125 },
      { name: "Use acelerador de entrenamiento 1 m", points: 125 },
      { name: "Use acelerador de curación 1 m", points: 125 },
      { name: "Cada unidad Nvl. 1 muerta de la alianza rival", points: 23 },
      { name: "Cada unidad Nvl. 2 muerta de la alianza rival", points: 34.5 },
      { name: "Cada unidad Nvl. 3 muerta de la alianza rival", points: 46 },
      { name: "Cada unidad Nvl. 4 muerta de la alianza rival", points: 57.5 },
      { name: "Cada unidad Nvl. 5 muerta de la alianza rival", points: 69 }
    ]
  }
];

const eventVsMapping = new Map([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, null],
  [7, 1]
]);

const vsDayMap = new Map(vsDays.map((day) => [day.day, day]));

const bestDuelsByVsDay = new Map(
  vsDays.map((day) => {
    const best = day.tasks.reduce((prev, current) => (current.points > prev.points ? current : prev));
    return [day.day, best];
  })
);

const numberFormatter = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 2
});

const timeFormatter = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit"
});

function updateTimelineContext() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  // Map dayOfWeek to EventDay
  // Tue(2) -> 1, Wed(3) -> 2, Thu(4) -> 3, Fri(5) -> 4, Sat(6) -> 5, Sun(0) -> 6, Mon(1) -> 7
  const dayToEventDay = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6, 1: 7 };
  const todayEventDay = dayToEventDay[dayOfWeek];
  
  // Calculate tomorrow
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(now.getDate() + 1);
  const tomorrowDayOfWeek = tomorrowDate.getDay();
  const tomorrowEventDay = dayToEventDay[tomorrowDayOfWeek];

  // Map to VS Day
  const todayVsDay = eventVsMapping.get(todayEventDay);
  const tomorrowVsDay = eventVsMapping.get(tomorrowEventDay);

  timelineContext = {
    todayEventDay,
    todayVsDay,
    tomorrowEventDay,
    tomorrowVsDay
  };
}

function generateRecommendations() {
  const todayEvent = eventDays.find(d => d.day === timelineContext.todayEventDay);
  if (!todayEvent) return [];

  return todayEvent.slots.map(slot => {
    const theme = slot.theme;
    const bestDays = themeBestVsDays[theme] || [];
    const isGoodDay = bestDays.includes(timelineContext.todayVsDay);
    
    let verdict, verdictType, recommendedWindow, vsSyncTitle, vsSyncDetail, reason;

    if (isGoodDay) {
      verdict = "Hacer hoy";
      verdictType = "now";
      recommendedWindow = `Hoy · ${formatRangeLabel(slot.startHour)}`;
      vsSyncTitle = `VS Día ${timelineContext.todayVsDay}`;
      vsSyncDetail = "Coincide con tareas clave";
      reason = "Aprovecha el solapamiento para puntuar doble en el evento y el VS.";
    } else {
      verdict = "Esperar";
      verdictType = "wait";
      const nextBestVsDayNum = bestDays[0];
      const nextBestVsDay = vsDays.find(d => d.day === nextBestVsDayNum);
      recommendedWindow = nextBestVsDay ? `${nextBestVsDay.weekday}` : "Próximamente";
      vsSyncTitle = nextBestVsDay ? `VS Día ${nextBestVsDay.day}` : "";
      vsSyncDetail = "Mejor multiplicador";
      reason = "Espera al día correcto para maximizar puntos y recompensas.";
    }

    return {
      theme,
      eventRange: formatRangeLabel(slot.startHour),
      verdict,
      verdictType,
      recommendedWindow,
      vsSyncTitle,
      vsSyncDetail,
      reason
    };
  });
}

function formatHour(hour) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

function formatRangeLabel(startHour) {
  const endHour = (startHour + SLOT_DURATION_HOURS) % 24;
  const resolvedEnd = endHour === 0 ? "00:00" : formatHour(endHour);
  return `${formatHour(startHour)} – ${resolvedEnd}`;
}

function buildBadge(type) {
  if (type === "today") {
    return '<span class="badge today">Hoy</span>';
  }
  if (type === "tomorrow") {
    return '<span class="badge tomorrow">Mañana</span>';
  }
  return "";
}

function buildEventDayCell(day) {
  const fragments = [`<strong>Día ${day.day}</strong>`, `<span>${day.weekday}</span>`];
  if (day.day === timelineContext.todayEventDay) {
    fragments.push(buildBadge("today"));
  } else if (day.day === timelineContext.tomorrowEventDay) {
    fragments.push(buildBadge("tomorrow"));
  }
  return fragments.join("\n");
}

function buildVsDayCell(vsDayNumber, options = {}) {
  const { eventDay } = options;
  if (!vsDayNumber) {
    return '<span class="vs-off">VS finalizado</span>';
  }
  const vsDay = vsDayMap.get(vsDayNumber);
  if (!vsDay) {
    return '<span class="vs-off">Sin datos del VS</span>';
  }
  const fragments = [`<strong>Día ${vsDay.day}</strong>`, `<span>${vsDay.weekday}</span>`];
  const isToday = vsDay.day === timelineContext.todayVsDay;
  const isTomorrow = vsDay.day === timelineContext.tomorrowVsDay;

  if (isToday) {
    fragments.push(buildBadge("today"));
  } else if (isTomorrow) {
    fragments.push(buildBadge("tomorrow"));
  } else if (eventDay === 7 && vsDayNumber === 1) {
    fragments.push('<span class="badge tomorrow">Próximo VS</span>');
  }
  return fragments.join("\n");
}

function buildBestDuelCell(vsDayNumber, options = {}) {
  const { eventDay } = options;
  if (!vsDayNumber) {
    return '<span class="vs-off">VS finalizado</span>';
  }
  const duel = bestDuelsByVsDay.get(vsDayNumber);
  if (!duel) {
    return '<span class="vs-off">Sin duelo destacado</span>';
  }
  const note = eventDay === 7 && vsDayNumber === 1
    ? '<span class="duel-note">Planifica el reinicio del VS (Día 1)</span>'
    : "";
  return `<span class="duel-name">${duel.name}</span><span class="duel-points">${numberFormatter.format(duel.points)} pts</span>${note}`;
}

function renderTable() {
  const tbody = document.querySelector("#sync-table tbody");
  tbody.innerHTML = "";

  eventDays.forEach((day) => {
    const vsDayNumber = eventVsMapping.has(day.day)
      ? eventVsMapping.get(day.day)
      : null;
    day.slots.forEach((slot, index) => {
      const tr = document.createElement("tr");

      if (index === 0) {
        const eventTd = document.createElement("td");
        eventTd.className = "event-day";
        eventTd.rowSpan = day.slots.length;
        eventTd.innerHTML = buildEventDayCell(day);
        tr.appendChild(eventTd);

        const vsTd = document.createElement("td");
        vsTd.className = "vs-day";
        vsTd.rowSpan = day.slots.length;
  vsTd.innerHTML = buildVsDayCell(vsDayNumber, { eventDay: day.day });
        tr.appendChild(vsTd);
      }

      const rangeTd = document.createElement("td");
      rangeTd.className = "range-cell";
      rangeTd.textContent = formatRangeLabel(slot.startHour);
      rangeTd.dataset.eventDay = String(day.day);
      rangeTd.dataset.startMinutes = String(slot.startHour * 60);
      rangeTd.dataset.durationMinutes = String(SLOT_DURATION_HOURS * 60);
      tr.appendChild(rangeTd);

      const themeTd = document.createElement("td");
      themeTd.className = "theme-cell";
      themeTd.textContent = slot.theme;
      tr.appendChild(themeTd);

      const detailTd = document.createElement("td");
      detailTd.className = "theme-detail";
      detailTd.textContent = themeDetails[slot.theme] || "Consulta la guía de Last War Survival para más detalles operativos.";
      tr.appendChild(detailTd);

      if (index === 0) {
        const duelTd = document.createElement("td");
        duelTd.className = "best-duel";
        duelTd.rowSpan = day.slots.length;
  duelTd.innerHTML = buildBestDuelCell(vsDayNumber, { eventDay: day.day });
        tr.appendChild(duelTd);
      }

      tbody.appendChild(tr);
    });
  });
}

function renderRecommendationTable() {
  const tbody = document.querySelector("#recommendations-table tbody");
  if (!tbody) {
    return;
  }
  tbody.innerHTML = "";

  const recommendations = generateRecommendations();

  recommendations.forEach((item) => {
    const tr = document.createElement("tr");

    const taskTd = document.createElement("td");
    taskTd.textContent = item.theme;
    tr.appendChild(taskTd);

    const rangeTd = document.createElement("td");
    rangeTd.textContent = item.eventRange;
    tr.appendChild(rangeTd);

    const recommendationTd = document.createElement("td");
    const verdict = document.createElement("span");
    verdict.className = `verdict-chip ${item.verdictType}`;
    verdict.textContent = item.verdict;
    const windowInfo = document.createElement("div");
    windowInfo.textContent = item.recommendedWindow;
    recommendationTd.appendChild(verdict);
    recommendationTd.appendChild(windowInfo);
    tr.appendChild(recommendationTd);

    const vsTd = document.createElement("td");
    vsTd.className = "vs-sync";
    const vsTitle = document.createElement("strong");
    vsTitle.textContent = item.vsSyncTitle;
    const vsDetail = document.createElement("span");
    vsDetail.textContent = item.vsSyncDetail;
    vsTd.appendChild(vsTitle);
    vsTd.appendChild(vsDetail);
    tr.appendChild(vsTd);

    const reasonTd = document.createElement("td");
    reasonTd.className = "reason-text";
    reasonTd.textContent = item.reason;
    tr.appendChild(reasonTd);

    tbody.appendChild(tr);
  });
}

function highlightActiveSlot() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const cells = document.querySelectorAll(".range-cell");
  const rows = document.querySelectorAll("#sync-table tbody tr");

  // Limpiar estado anterior
  rows.forEach(row => row.classList.remove("active-row"));

  cells.forEach((cell) => {
    const eventDay = Number(cell.dataset.eventDay);
    if (eventDay !== timelineContext.todayEventDay) {
      return;
    }
    const start = Number(cell.dataset.startMinutes);
    const duration = Number(cell.dataset.durationMinutes);
    const end = (start + duration) % (24 * 60);
    const inRange = start < end
      ? currentMinutes >= start && currentMinutes < end
      : currentMinutes >= start || currentMinutes < end;
    if (inRange) {
      const row = cell.closest("tr");
      if (row) {
        row.classList.add("active-row");
      }
    }
  });
}

function renderContextCards() {
  const todayEventLabel = eventDays.find((day) => day.day === timelineContext.todayEventDay);
  const tomorrowEventLabel = eventDays.find((day) => day.day === timelineContext.tomorrowEventDay);
  const todayVsLabel = vsDayMap.get(timelineContext.todayVsDay);
  const tomorrowVsLabel = vsDayMap.get(timelineContext.tomorrowVsDay);

  const todayEventEl = document.querySelector("[data-today-event]");
  const todayVsEl = document.querySelector("[data-today-vs]");
  const tomorrowEventEl = document.querySelector("[data-tomorrow-event]");
  const tomorrowVsEl = document.querySelector("[data-tomorrow-vs]");
  const clockEl = document.querySelector("[data-clock]");

  if (todayEventEl && todayEventLabel) {
    todayEventEl.textContent = `Día ${todayEventLabel.day} · ${todayEventLabel.weekday}`;
  }
  if (todayVsEl && todayVsLabel) {
    todayVsEl.textContent = `VS Día ${todayVsLabel.day} · ${todayVsLabel.weekday}`;
  }
  if (tomorrowEventEl && tomorrowEventLabel) {
    tomorrowEventEl.textContent = `Día ${tomorrowEventLabel.day} · ${tomorrowEventLabel.weekday}`;
  }
  if (tomorrowVsEl) {
    if (tomorrowVsLabel) {
      tomorrowVsEl.textContent = `VS Día ${tomorrowVsLabel.day} · ${tomorrowVsLabel.weekday}`;
    } else {
      tomorrowVsEl.textContent = "VS finalizado";
    }
  }
  if (clockEl) {
    clockEl.textContent = timeFormatter.format(new Date());
  }
}

function tick() {
  renderContextCards();
  highlightActiveSlot();
}

function init() {
  updateTimelineContext();
  renderTable();
  renderRecommendationTable();
  tick();
  setInterval(tick, 60000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
