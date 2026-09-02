/* ============================================================
   Datos simulados del prototipo. Ninguna llamada a red:
   todo vive en memoria para poder validar el flujo con
   coaches y atletas (Etapa 2 del documento maestro).
   ============================================================ */

window.APP = {
  brand: "Nombre genérico",
  tagline: "Build your team. Train smarter.",

  disciplines: {
    running:  { label: "Running",   color: "var(--run)",      icon: "🏃", key: "running" },
    strength: { label: "Fuerza",    color: "var(--strength)", icon: "🏋", key: "strength" },
    swim:     { label: "Natación",  color: "var(--swim)",     icon: "🏊", key: "swim" },
    hyrox:    { label: "HYROX",     color: "var(--hyrox)",    icon: "⚡", key: "hyrox" },
    mobility: { label: "Movilidad", color: "var(--mobility)", icon: "🧘", key: "mobility" }
  },

  athlete: {
    name: "Regina",
    initials: "R",
    level: "Intermedio",
    daysPerWeek: 5,
    goal: {
      event: "HYROX Valencia",
      date: "10 mayo 2027",
      daysLeft: 266,
      prep: [
        { area: "Running", pct: 80 },
        { area: "Strength", pct: 60 },
        { area: "Conditioning", pct: 70 }
      ]
    },
    passport: {
      prs: [
        { label: "5K PR", value: "24:42" },
        { label: "10K PR", value: "52:31" },
        { label: "HYROX", value: "1:38:21" }
      ],
      sessions: 184,
      adherence: 91
    }
  },

  coaches: [
    {
      id: "carlos",
      name: "Carlos Martínez",
      initials: "CM",
      role: "Running Coach",
      discipline: "running",
      rating: 4.9,
      athletes: 127,
      years: 7,
      price: 700,
      modality: "Online",
      levels: ["Principiante", "Intermedio"],
      verification: "ELITE",
      match: 96,
      a1: "#ccff00", a2: "#7de08d",
      specialties: ["5K", "10K", "Medio maratón", "Running para HYROX"],
      why: [
        "Especializado en 10K",
        "Trabaja con principiantes",
        "Disponibilidad compatible",
        "Precio compatible",
        "Experiencia en atletas similares"
      ],
      services: [
        { name: "Running Base", sessions: "3 sesiones/semana", price: 700, featured: false,
          includes: ["Programación semanal", "Calendario integrado", "Videos de técnica", "Chat con el coach"] },
        { name: "Performance", sessions: "5 sesiones/semana", price: 1200, featured: true,
          includes: ["Todo lo de Running Base", "Ajustes semanales", "Revisión de cada sesión", "Análisis de progreso"] },
        { name: "Elite", sessions: "Coaching avanzado", price: 2100, featured: false,
          includes: ["Todo lo de Performance", "Llamada mensual 1:1", "Preparación de competencia", "Coordinación multi-coach"] }
      ],
      results: ["43 PRs conseguidos por atletas", "12 maratones preparados", "9 atletas HYROX en 2026"]
    },
    {
      id: "diego",
      name: "Diego Herrera",
      initials: "DH",
      role: "Strength Coach",
      discipline: "strength",
      rating: 4.8,
      athletes: 88,
      years: 6,
      price: 850,
      modality: "Híbrido",
      levels: ["Intermedio", "Avanzado"],
      verification: "CERTIFIED",
      match: 92,
      a1: "#ff8a3d", a2: "#ffd166",
      specialties: ["Fuerza para híbridos", "Ganancia muscular", "Prevención"],
      why: ["Especializado en atletas híbridos", "Compatible con carga de running", "Modalidad híbrida"],
      services: [
        { name: "Strength Base", sessions: "2 sesiones/semana", price: 850, featured: true,
          includes: ["Programación de fuerza", "Biblioteca de ejercicios", "Videos y cues", "Chat con el coach"] }
      ],
      results: ["Sentadilla +18% promedio en 12 semanas", "31 atletas híbridos activos"]
    },
    {
      id: "carla",
      name: "Carla Ríos",
      initials: "CR",
      role: "Swimming Coach",
      discipline: "swim",
      rating: 4.9,
      athletes: 64,
      years: 9,
      price: 780,
      modality: "Presencial",
      levels: ["Principiante", "Intermedio", "Avanzado"],
      verification: "ELITE",
      match: 89,
      a1: "#4cc9f0", a2: "#8ee3ff",
      specialties: ["Técnica", "Aguas abiertas", "Triatlón"],
      why: ["Técnica para adultos", "Horario compatible", "Trabaja con triatletas"],
      services: [
        { name: "Técnica", sessions: "2 sesiones/semana", price: 780, featured: true,
          includes: ["Corrección de técnica", "Video análisis", "Series semanales"] }
      ],
      results: ["Mejora media de 6 s/100 m en 8 semanas"]
    },
    {
      id: "marisol",
      name: "Marisol Vega",
      initials: "MV",
      role: "HYROX Coach",
      discipline: "hyrox",
      rating: 4.7,
      athletes: 52,
      years: 4,
      price: 990,
      modality: "Online",
      levels: ["Intermedio", "Competitivo"],
      verification: "CERTIFIED",
      match: 87,
      a1: "#ffd166", a2: "#ff8a3d",
      specialties: ["HYROX Open", "HYROX Pro", "Compromised running"],
      why: ["Especialista HYROX", "Experiencia en competencia", "Programación híbrida"],
      services: [
        { name: "HYROX Prep", sessions: "4 sesiones/semana", price: 990, featured: true,
          includes: ["Bloques de estación", "Compromised running", "Simulacros de carrera"] }
      ],
      results: ["17 atletas clasificados a Major"]
    },
    {
      id: "andres",
      name: "Andrés Lugo",
      initials: "AL",
      role: "Running Coach",
      discipline: "running",
      rating: 4.6,
      athletes: 41,
      years: 3,
      price: 520,
      modality: "Online",
      levels: ["Principiante"],
      verification: "VERIFIED",
      match: 81,
      a1: "#a6e04a", a2: "#4cc9f0",
      specialties: ["Primer 5K", "10K", "Vuelta a correr"],
      why: ["Precio accesible", "Enfoque en principiantes"],
      services: [
        { name: "Primer 5K", sessions: "3 sesiones/semana", price: 520, featured: true,
          includes: ["Plan progresivo de 8 semanas", "Chat con el coach"] }
      ],
      results: ["Más de 100 personas completaron su primer 5K"]
    },
    {
      id: "paulina",
      name: "Paulina Cruz",
      initials: "PC",
      role: "Strength & Conditioning",
      discipline: "strength",
      rating: 4.9,
      athletes: 73,
      years: 8,
      price: 1100,
      modality: "Híbrido",
      levels: ["Avanzado", "Competitivo"],
      verification: "ELITE",
      match: 84,
      a1: "#ff8a3d", a2: "#b388ff",
      specialties: ["Performance", "Potencia", "Preparación competitiva"],
      why: ["Preparación de competencia", "Trabajo con atletas avanzados"],
      services: [
        { name: "Performance", sessions: "3 sesiones/semana", price: 1100, featured: true,
          includes: ["Bloques de potencia", "Testing mensual", "Coordinación con otros coaches"] }
      ],
      results: ["Atletas en podio nacional HYROX 2026"]
    },
    {
      id: "tomas",
      name: "Tomás Beltrán",
      initials: "TB",
      role: "Mobility Coach",
      discipline: "mobility",
      rating: 4.8,
      athletes: 96,
      years: 11,
      price: 450,
      modality: "Online",
      levels: ["Principiante", "Intermedio", "Avanzado"],
      verification: "CERTIFIED",
      match: 76,
      a1: "#b388ff", a2: "#4cc9f0",
      specialties: ["Movilidad", "Recuperación", "Prevención de lesiones"],
      why: ["Complementa cargas altas", "Sesiones cortas"],
      services: [
        { name: "Mobility", sessions: "2 sesiones/semana", price: 450, featured: true,
          includes: ["Rutinas de 20 min", "Videos guiados"] }
      ],
      results: ["Reducción de molestias reportadas en 8 de cada 10 atletas"]
    },
    {
      id: "ivan",
      name: "Iván Sotelo",
      initials: "IS",
      role: "HYROX & Hybrid",
      discipline: "hyrox",
      rating: 4.5,
      athletes: 29,
      years: 3,
      price: 690,
      modality: "Presencial",
      levels: ["Intermedio"],
      verification: "VERIFIED",
      match: 74,
      a1: "#ffd166", a2: "#ccff00",
      specialties: ["HYROX Open", "Entrenamiento híbrido"],
      why: ["Sesiones presenciales", "Enfoque híbrido"],
      services: [
        { name: "Hybrid Base", sessions: "3 sesiones/semana", price: 690, featured: true,
          includes: ["Sesiones híbridas", "Seguimiento semanal"] }
      ],
      results: ["Grupo presencial semanal en CDMX"]
    },
    {
      id: "lucia",
      name: "Lucía Ferrer",
      initials: "LF",
      role: "Swimming Coach",
      discipline: "swim",
      rating: 4.7,
      athletes: 38,
      years: 5,
      price: 620,
      modality: "Presencial",
      levels: ["Principiante", "Intermedio"],
      verification: "VERIFIED",
      match: 71,
      a1: "#4cc9f0", a2: "#ccff00",
      specialties: ["Aprender a nadar", "Técnica de crol"],
      why: ["Ideal para empezar en el agua"],
      services: [
        { name: "Aprende a nadar", sessions: "2 sesiones/semana", price: 620, featured: true,
          includes: ["Técnica desde cero", "Sesiones en alberca"] }
      ],
      results: ["Grupos de iniciación con 95% de adherencia"]
    }
  ],

  /* Semana integrada de Regina (documento, sección 9) */
  week: [
    { dow: "Lun", num: 8, sessions: [
      { id: "w-run-int", title: "Intervalos 4×8 min", discipline: "running", coach: "Carlos", dur: "45 min", intensity: "Alta", state: "done" }
    ]},
    { dow: "Mar", num: 9, sessions: [
      { id: "w-str-low", title: "Fuerza — Lower body", discipline: "strength", coach: "Diego", dur: "60 min", intensity: "Alta", state: "done" }
    ]},
    { dow: "Mié", num: 10, sessions: [
      { id: "w-run-tempo", title: "Tempo 25 min", discipline: "running", coach: "Carlos", dur: "50 min", intensity: "Media", state: "today" }
    ]},
    { dow: "Jue", num: 11, sessions: [
      { id: "w-swim", title: "Natación — Técnica", discipline: "swim", coach: "Carla", dur: "45 min", intensity: "Baja", state: "scheduled" }
    ]},
    { dow: "Vie", num: 12, sessions: [
      { id: "w-str-up", title: "Fuerza — Upper body", discipline: "strength", coach: "Diego", dur: "55 min", intensity: "Media", state: "scheduled" }
    ]},
    { dow: "Sáb", num: 13, sessions: [
      { id: "w-long", title: "Long run 14 km", discipline: "running", coach: "Carlos", dur: "80 min", intensity: "Media", state: "scheduled" },
      { id: "w-mob", title: "Movilidad post-carrera", discipline: "mobility", coach: "Tomás", dur: "20 min", intensity: "Baja", state: "scheduled" }
    ]},
    { dow: "Dom", num: 14, sessions: [] }
  ],

  /* Sesión abierta en la pantalla de workout (documento, sección 18) */
  workout: {
    id: "w-run-int",
    discipline: "running",
    title: "Running — Interval Session",
    duration: "45 min",
    coach: "Carlos Martínez",
    goal: "Mejorar velocidad y capacidad aeróbica.",
    blocks: [
      { time: "10 min", name: "Calentamiento", detail: "Trote suave + movilidad dinámica de cadera y tobillo.", cue: "Respiración nasal. Debes poder conversar." },
      { time: "4 × 8 min", name: "Tempo", detail: "Ritmo objetivo 5:10–5:20 /km. Mantén el ritmo estable en cada bloque.", cue: "Cadencia alta, hombros relajados, mirada al frente." },
      { time: "2 min", name: "Recuperación", detail: "Trote muy suave entre bloques.", cue: "No camines: mantén el trote." },
      { time: "10 min", name: "Enfriamiento", detail: "Trote regenerativo + estiramientos.", cue: "Baja pulsaciones antes de parar." }
    ],
    log: [
      { key: "distance", label: "Distancia (km)", placeholder: "9.4" },
      { key: "time", label: "Tiempo total", placeholder: "45:20" },
      { key: "pace", label: "Ritmo medio /km", placeholder: "5:14" },
      { key: "hr", label: "FC media", placeholder: "162" }
    ]
  },

  insights: [
    { text: "Regina completó <b>91%</b> de sus sesiones durante las últimas cuatro semanas." },
    { text: "Su volumen de running aumentó <b>18%</b> respecto al bloque anterior." },
    { text: "El <b>miércoles</b> presenta menor adherencia que el resto de la semana." }
  ],

  conflict: {
    title: "Posible conflicto de carga",
    detail: "Martes: fuerza de tren inferior (Diego) el mismo día que intervalos intensos (Carlos)."
  },

  plans: [
    { name: "10K Beginner", weeks: 12, coach: "Carlos Martínez", discipline: "running", price: 890,
      includes: ["4 sesiones/semana", "Calentamientos", "Sesiones de running", "Recuperación", "Videos", "Progresión semanal"] },
    { name: "HYROX Sub 1:30", weeks: 10, coach: "Marisol Vega", discipline: "hyrox", price: 1290,
      includes: ["5 sesiones/semana", "Bloques de estación", "Compromised running", "Simulacro de carrera"] },
    { name: "Hybrid Strength", weeks: 8, coach: "Diego Herrera", discipline: "strength", price: 750,
      includes: ["3 sesiones/semana", "Fuerza compatible con running", "Biblioteca de ejercicios"] }
  ],

  /* Coach dashboard (documento, sección 20) */
  coachDash: {
    coach: "Carlos Martínez",
    kpis: [
      { k: "34", l: "Atletas activos" },
      { k: "$23,800", l: "Ingresos del mes" },
      { k: "88%", l: "Adherencia media" },
      { k: "6", l: "Sesiones por revisar" }
    ],
    athletes: [
      { name: "Regina M.", initials: "RM", a1: "#ccff00", a2: "#4cc9f0", plan: "Performance", adherence: 91, last: "Hoy", state: "En progreso" },
      { name: "Julián R.", initials: "JR", a1: "#ff8a3d", a2: "#ffd166", plan: "Running Base", adherence: 76, last: "Ayer", state: "Revisar" },
      { name: "Ana P.", initials: "AP", a1: "#4cc9f0", a2: "#b388ff", plan: "Elite", adherence: 97, last: "Hoy", state: "En progreso" },
      { name: "Mauricio T.", initials: "MT", a1: "#b388ff", a2: "#ccff00", plan: "Running Base", adherence: 54, last: "Hace 6 días", state: "En riesgo" },
      { name: "Sofía L.", initials: "SL", a1: "#ffd166", a2: "#ff8a3d", plan: "Performance", adherence: 84, last: "Hace 2 días", state: "En progreso" }
    ]
  }
};
