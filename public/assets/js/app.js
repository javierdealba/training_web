/* ============================================================
   Lógica del prototipo: navegación compartida y render de cada
   pantalla a partir de los datos simulados de data.js.
   ============================================================ */

(function () {
  const A = window.APP;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const money = (n) => "$" + n.toLocaleString("es-MX") + " MXN";
  const disc = (key) => A.disciplines[key] || A.disciplines.running;

  /* ---------------- Navegación y footer ---------------- */

  const NAV = [
    { href: "/marketplace", label: "Marketplace", page: "marketplace" },
    { href: "/dashboard", label: "Mi entrenamiento", page: "dashboard" },
    { href: "/calendario", label: "Calendario", page: "calendario" },
    { href: "/coach-dashboard", label: "Soy coach", page: "coach-dashboard" }
  ];

  function mountChrome() {
    const page = document.body.dataset.page;

    const nav = $("#nav");
    if (nav) {
      nav.innerHTML = `
        <div class="proto-bar">Prototipo de validación · datos simulados · Etapa 1 del documento maestro</div>
        <div class="nav">
          <div class="container nav-inner">
            <a class="brand" href="/"><span class="logo-ph">logo</span>Nombre genérico</a>
            <div class="nav-links">
              ${NAV.map((n) => `<a href="${n.href}" class="${n.page === page ? "active" : ""}">${n.label}</a>`).join("")}
            </div>
            <div class="nav-actions">
              <a class="btn btn-ghost btn-sm" href="/onboarding">Empezar</a>
              <a class="avatar avatar-sm" href="/dashboard" style="--a1:#ccff00;--a2:#4cc9f0" title="Regina">R</a>
            </div>
          </div>
        </div>`;
    }

    const foot = $("#footer");
    if (foot) {
      foot.innerHTML = `
        <div class="footer">
          <div class="container row-between wrap" style="align-items:flex-start">
            <div>
              <div class="brand" style="font-size:16px"><span class="logo-ph">logo</span>Nombre genérico</div>
              <p class="footer-note mt-8">${A.tagline} — El marketplace y sistema operativo
              para el entrenamiento deportivo personalizado.</p>
            </div>
            <div class="faint">Prototipo interno · nombre, logo y colores por definir</div>
          </div>
        </div>`;
    }
  }

  /* ---------------- Componentes reutilizables ---------------- */

  function coachCard(c) {
    const d = disc(c.discipline);
    return `
      <a class="card card-link coach-card" href="/coach?id=${c.id}">
        <div class="coach-top">
          <div class="avatar" style="--a1:${c.a1};--a2:${c.a2}">${c.initials}</div>
          <div>
            <div class="coach-name">${c.name}</div>
            <div class="coach-role">${c.role}</div>
          </div>
          <div class="match"><b>${c.match}%</b><span>match</span></div>
        </div>
        <div class="row wrap" style="gap:8px">
          <span class="chip" style="color:${d.color}"><i class="dot"></i>${d.label}</span>
          <span class="badge">${c.verification}</span>
        </div>
        <div class="coach-meta">
          <span class="stars">★★★★★ <span class="muted">${c.rating}</span></span>
          <span>${c.athletes} atletas</span>
          <span>${c.years} años</span>
          <span>${c.modality}</span>
        </div>
        <div class="coach-price">
          <div><b>${money(c.price)}</b> <span class="faint">/mes</span></div>
          <span class="btn btn-quiet btn-sm">Ver perfil</span>
        </div>
      </a>`;
  }

  function sessionChip(s, opts) {
    const d = disc(s.discipline);
    const done = s.state === "done" ? " done" : "";
    const href = opts && opts.link === false ? "" : ` href="/workout?id=${s.id}"`;
    return `
      <a class="sess${done}"${href} style="--c:${d.color}">
        <div class="sess-d">${d.label}</div>
        <div class="sess-t">${s.title}</div>
        <div class="sess-m"><span>${s.coach}</span><span>${s.dur}</span><span>${s.intensity}</span></div>
      </a>`;
  }

  /* ---------------- Marketplace ---------------- */

  function initMarketplace() {
    const grid = $("#coach-grid");
    const count = $("#coach-count");
    const state = { discipline: [], level: [], modality: [], max: 2200 };

    function apply() {
      const list = A.coaches.filter((c) => {
        if (state.discipline.length && !state.discipline.includes(c.discipline)) return false;
        if (state.level.length && !c.levels.some((l) => state.level.includes(l))) return false;
        if (state.modality.length && !state.modality.includes(c.modality)) return false;
        if (c.price > state.max) return false;
        return true;
      });
      grid.innerHTML = list.length
        ? list.map(coachCard).join("")
        : `<div class="card center muted">Ningún coach coincide con estos filtros. Ajusta la búsqueda.</div>`;
      count.textContent = list.length;
    }

    $$(".filter-opt input").forEach((input) => {
      input.addEventListener("change", () => {
        const group = input.dataset.group;
        const val = input.value;
        const arr = state[group];
        const i = arr.indexOf(val);
        if (input.checked && i === -1) arr.push(val);
        if (!input.checked && i > -1) arr.splice(i, 1);
        apply();
      });
    });

    const price = $("#price");
    if (price) {
      price.addEventListener("input", () => {
        state.max = Number(price.value);
        $("#price-label").textContent = "hasta " + money(state.max);
        apply();
      });
    }

    $("#clear-filters").addEventListener("click", () => {
      $$(".filter-opt input").forEach((i) => (i.checked = false));
      state.discipline = []; state.level = []; state.modality = []; state.max = 2200;
      price.value = 2200;
      $("#price-label").textContent = "hasta " + money(2200);
      apply();
    });

    apply();
  }

  /* ---------------- Perfil de coach ---------------- */

  function initCoach() {
    const id = new URLSearchParams(location.search).get("id") || "carlos";
    const c = A.coaches.find((x) => x.id === id) || A.coaches[0];
    const d = disc(c.discipline);
    document.title = c.name + " — Nombre genérico";

    $("#coach-head").innerHTML = `
      <div class="avatar avatar-lg" style="--a1:${c.a1};--a2:${c.a2}">${c.initials}</div>
      <div class="grow">
        <div class="row wrap" style="gap:10px">
          <h1 style="font-size:34px">${c.name}</h1>
          <span class="badge badge-volt">${c.verification}</span>
        </div>
        <p class="muted mt-8">${c.role} · ${c.modality} · ${c.years} años de experiencia</p>
        <div class="coach-meta mt-16">
          <span class="stars">★★★★★ <span class="muted">${c.rating}</span></span>
          <span>${c.athletes} atletas</span>
          <span class="chip" style="color:${d.color}"><i class="dot"></i>${d.label}</span>
        </div>
      </div>
      <div style="text-align:right">
        <div class="match"><b>${c.match}%</b><span>match contigo</span></div>
        <a class="btn btn-primary mt-16" href="/dashboard">Contratar</a>
      </div>`;

    $("#coach-why").innerHTML = c.why.map((w) => `<span>${w}</span>`).join("");
    $("#coach-specialties").innerHTML = c.specialties
      .map((s) => `<span class="chip">${s}</span>`).join("");
    $("#coach-results").innerHTML = c.results
      .map((r) => `<div class="insight">${r}</div>`).join("");

    $("#coach-services").innerHTML = c.services.map((s) => `
      <div class="card service-card${s.featured ? " featured" : ""}">
        ${s.featured ? '<span class="badge badge-volt" style="align-self:flex-start">Más contratado</span>' : ""}
        <h3 style="font-size:19px;margin-top:${s.featured ? "12px" : "0"}">${s.name}</h3>
        <div class="service-price">${money(s.price)}<small> /mes</small></div>
        <div class="faint" style="font-size:13px">${s.sessions}</div>
        <ul class="service-list">${s.includes.map((i) => `<li>${i}</li>`).join("")}</ul>
        <a class="btn ${s.featured ? "btn-primary" : "btn-quiet"} btn-block" style="margin-top:auto" href="/dashboard">Contratar</a>
      </div>`).join("");
  }

  /* ---------------- Onboarding ---------------- */

  function initOnboarding() {
    const steps = [
      { n: "Paso 1 de 4", q: "¿Cuál es tu objetivo?", multi: false,
        opts: ["Primer 5K", "10K", "Medio maratón", "Maratón", "HYROX", "Ganancia muscular", "Pérdida de grasa", "Preparación competitiva"] },
      { n: "Paso 2 de 4", q: "¿Qué disciplinas quieres entrenar?", multi: true,
        opts: ["Running", "Fuerza", "HYROX", "Natación", "Movilidad"] },
      { n: "Paso 3 de 4", q: "¿Cuál es tu nivel?", multi: false,
        opts: ["Principiante", "Intermedio", "Avanzado", "Competitivo"] },
      { n: "Paso 4 de 4", q: "¿Cuántos días por semana puedes entrenar?", multi: false,
        opts: ["2 días", "3 días", "4 días", "5 días", "6 días"] }
    ];
    const answers = steps.map(() => []);
    let i = 0;

    function render() {
      const s = steps[i];
      $("#steps").innerHTML = steps.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("");
      $("#step-n").textContent = s.n;
      $("#step-q").textContent = s.q;
      $("#step-hint").textContent = s.multi ? "Puedes elegir varias." : "Elige una opción.";
      $("#opts").innerHTML = s.opts.map((o) => `
        <button type="button" class="opt${answers[i].includes(o) ? " sel" : ""}" data-v="${o}">
          <span class="opt-mark"></span>${o}
        </button>`).join("");
      $("#back").style.visibility = i === 0 ? "hidden" : "visible";
      $("#next").textContent = i === steps.length - 1 ? "Ver mis coaches" : "Continuar";
      $("#next").disabled = answers[i].length === 0;
      $("#next").style.opacity = answers[i].length === 0 ? 0.45 : 1;

      $$("#opts .opt").forEach((b) => b.addEventListener("click", () => {
        const v = b.dataset.v;
        if (steps[i].multi) {
          const k = answers[i].indexOf(v);
          k > -1 ? answers[i].splice(k, 1) : answers[i].push(v);
        } else {
          answers[i] = [v];
        }
        render();
      }));
    }

    $("#next").addEventListener("click", () => {
      if (answers[i].length === 0) return;
      if (i === steps.length - 1) {
        sessionStorage.setItem("onboarding", JSON.stringify(answers));
        location.href = "/marketplace";
        return;
      }
      i++; render();
    });
    $("#back").addEventListener("click", () => { if (i > 0) { i--; render(); } });

    render();
  }

  /* ---------------- Dashboard del atleta ---------------- */

  function initDashboard() {
    const g = A.athlete.goal;
    $("#goal").innerHTML = `
      <div class="eyebrow">Objetivo principal</div>
      <div class="row-between wrap">
        <div>
          <h2 style="font-size:30px;text-transform:uppercase">${g.event}</h2>
          <p class="muted mt-8">${g.date}</p>
        </div>
        <div style="text-align:right">
          <div class="goal-date">${g.daysLeft}</div>
          <div class="stat-l">días restantes</div>
        </div>
      </div>
      <div class="mt-24" style="display:flex;flex-direction:column;gap:12px">
        ${g.prep.map((p) => `
          <div class="prep-row">
            <span>${p.area}</span>
            <span class="meter"><i style="width:${p.pct}%"></i></span>
            <span>${p.pct}%</span>
          </div>`).join("")}
      </div>`;

    const today = A.week.find((d) => d.sessions.some((s) => s.state === "today"));
    $("#today").innerHTML = today
      ? sessionChip(today.sessions.find((s) => s.state === "today"))
      : `<p class="muted">Hoy toca descanso.</p>`;

    $("#week-preview").innerHTML = A.week
      .filter((d) => d.sessions.length)
      .slice(0, 4)
      .map((d) => `
        <div style="margin-bottom:10px">
          <div class="cal-dow" style="margin-bottom:6px">${d.dow} ${d.num}</div>
          ${d.sessions.map((s) => sessionChip(s)).join("")}
        </div>`).join("");

    const team = [
      { name: "Carlos", role: "Running", id: "carlos", a1: "#ccff00", a2: "#7de08d", initials: "C" },
      { name: "Carla", role: "Swimming", id: "carla", a1: "#4cc9f0", a2: "#8ee3ff", initials: "C" },
      { name: "Diego", role: "Strength", id: "diego", a1: "#ff8a3d", a2: "#ffd166", initials: "D" }
    ];
    $("#team").innerHTML = team.map((t) => `
      <a class="team-member" href="/coach?id=${t.id}">
        <div class="avatar" style="--a1:${t.a1};--a2:${t.a2}">${t.initials}</div>
        <div class="grow">
          <div style="font-weight:600">${t.name}</div>
          <div class="faint" style="font-size:12.5px">${t.role} Coach</div>
        </div>
        <span class="faint">›</span>
      </a>`).join("");

    $("#insights").innerHTML = A.insights.map((i) => `<div class="insight">${i.text}</div>`).join("");

    $("#conflict").innerHTML = `
      <div class="row" style="align-items:flex-start;gap:10px">
        <span style="font-size:16px">⚠️</span>
        <div>
          <b>${A.conflict.title}</b>
          <p class="muted mt-8" style="font-size:13.5px">${A.conflict.detail}</p>
          <div class="row mt-16" style="gap:8px">
            <a class="btn btn-quiet btn-sm" href="/calendario">Revisar</a>
            <button class="btn btn-quiet btn-sm">Contactar coach</button>
          </div>
        </div>
      </div>`;

    const p = A.athlete.passport;
    $("#passport").innerHTML = `
      <div class="pr-grid">
        ${p.prs.map((x) => `<div class="pr"><b>${x.value}</b><span>${x.label}</span></div>`).join("")}
      </div>
      <div class="grid g2 mt-16">
        <div class="stat"><div class="stat-k">${p.sessions}</div><div class="stat-l">Sesiones completadas</div></div>
        <div class="stat"><div class="stat-k">${p.adherence}%</div><div class="stat-l">Adherencia</div></div>
      </div>
      <p class="faint mt-16" style="font-size:12.5px">Tu historial es tuyo. Con tu autorización, un nuevo
      coach puede ver el contexto de tu entrenamiento previo.</p>`;
  }

  /* ---------------- Calendario ---------------- */

  function initCalendar() {
    $("#cal").innerHTML = A.week.map((d) => {
      const isToday = d.sessions.some((s) => s.state === "today");
      return `
        <div class="cal-day${isToday ? " today" : ""}">
          <div class="cal-head">
            <span class="cal-dow">${d.dow}</span>
            <span class="cal-num">${d.num}</span>
          </div>
          ${d.sessions.length
            ? d.sessions.map((s) => sessionChip(s)).join("")
            : '<div class="cal-rest">Descanso</div>'}
        </div>`;
    }).join("");

    const total = A.week.reduce((n, d) => n + d.sessions.length, 0);
    const done = A.week.reduce((n, d) => n + d.sessions.filter((s) => s.state === "done").length, 0);
    $("#cal-stats").innerHTML = `
      <div class="stat"><div class="stat-k">${total}</div><div class="stat-l">Sesiones esta semana</div></div>
      <div class="stat"><div class="stat-k">${done}/${total}</div><div class="stat-l">Completadas</div></div>
      <div class="stat"><div class="stat-k">3</div><div class="stat-l">Coaches coordinados</div></div>
      <div class="stat"><div class="stat-k">4h 55m</div><div class="stat-l">Volumen planificado</div></div>`;
  }

  /* ---------------- Workout ---------------- */

  function initWorkout() {
    const w = A.workout;
    const d = disc(w.discipline);

    $("#wo-head").innerHTML = `
      <div class="chip" style="color:${d.color}"><i class="dot"></i>${d.label}</div>
      <h1 class="mt-16">${w.title}</h1>
      <div class="wo-meta">
        <span>${w.duration}</span>
        <span>Coach: ${w.coach}</span>
        <span>Estado: programado</span>
      </div>
      <p class="muted mt-24" style="max-width:60ch"><b style="color:var(--text)">Objetivo.</b> ${w.goal}</p>`;

    $("#wo-blocks").innerHTML = w.blocks.map((b) => `
      <div class="block">
        <div class="block-time">${b.time}</div>
        <div>
          <h4>${b.name}</h4>
          <p>${b.detail}</p>
          <div class="cue">Cue del coach: ${b.cue}</div>
        </div>
      </div>`).join("");

    $("#wo-log").innerHTML = `
      <div class="log-row">
        ${w.log.map((f) => `
          <div class="field">
            <label>${f.label}</label>
            <input class="input" placeholder="${f.placeholder}" />
          </div>`).join("")}
      </div>
      <div class="field mt-16">
        <label>RPE percibido</label>
        <div class="rpe" id="rpe">${[...Array(10)].map((_, i) => `<button type="button">${i + 1}</button>`).join("")}</div>
      </div>
      <div class="field mt-16">
        <label>Notas para el coach</label>
        <input class="input" placeholder="Piernas pesadas en el tercer bloque" />
      </div>
      <button class="btn btn-primary btn-block mt-24" id="wo-done">Marcar como completado</button>`;

    $$("#rpe button").forEach((b) => b.addEventListener("click", () => {
      $$("#rpe button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
    }));

    $("#wo-done").addEventListener("click", (e) => {
      e.target.textContent = "Sesión registrada ✓";
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-quiet");
    });
  }

  /* ---------------- Coach dashboard ---------------- */

  function initCoachDash() {
    const c = A.coachDash;
    $("#kpis").innerHTML = c.kpis
      .map((k) => `<div class="stat"><div class="stat-k">${k.k}</div><div class="stat-l">${k.l}</div></div>`).join("");

    $("#athletes").innerHTML = `
      <table class="table">
        <thead><tr><th>Atleta</th><th>Servicio</th><th>Adherencia</th><th>Última sesión</th><th>Estado</th></tr></thead>
        <tbody>
          ${c.athletes.map((a) => `
            <tr>
              <td>
                <div class="row">
                  <div class="avatar avatar-sm" style="--a1:${a.a1};--a2:${a.a2}">${a.initials}</div>
                  <span>${a.name}</span>
                </div>
              </td>
              <td class="muted">${a.plan}</td>
              <td>
                <div class="adh">
                  <span class="meter"><i style="width:${a.adherence}%;background:${a.adherence < 70 ? "var(--warn)" : "var(--volt)"}"></i></span>
                  <span class="faint">${a.adherence}%</span>
                </div>
              </td>
              <td class="muted">${a.last}</td>
              <td><span class="badge ${a.state === "En riesgo" ? "badge-warn" : a.state === "Revisar" ? "" : "badge-ok"}">${a.state}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
  }

  /* ---------------- Landing ---------------- */

  function initLanding() {
    $("#featured-coaches").innerHTML = A.coaches.slice(0, 3).map(coachCard).join("");
    $("#plans").innerHTML = A.plans.map((p) => {
      const d = disc(p.discipline);
      return `
        <div class="card card-link">
          <div class="row-between">
            <span class="chip" style="color:${d.color}"><i class="dot"></i>${d.label}</span>
            <span class="faint" style="font-size:12.5px">${p.weeks} semanas</span>
          </div>
          <h3 style="font-size:20px;margin:14px 0 6px">${p.name}</h3>
          <p class="faint" style="font-size:13px">Creado por ${p.coach}</p>
          <ul class="service-list">${p.includes.slice(0, 4).map((i) => `<li>${i}</li>`).join("")}</ul>
          <div class="coach-price"><b>${money(p.price)}</b><span class="btn btn-quiet btn-sm">Ver plan</span></div>
        </div>`;
    }).join("");
  }

  /* ---------------- Arranque ---------------- */

  const PAGES = {
    index: initLanding,
    marketplace: initMarketplace,
    coach: initCoach,
    onboarding: initOnboarding,
    dashboard: initDashboard,
    calendario: initCalendar,
    workout: initWorkout,
    "coach-dashboard": initCoachDash
  };

  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    const fn = PAGES[document.body.dataset.page];
    if (fn) fn();
  });
})();
