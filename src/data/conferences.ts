export type ConferenceRole =
  | "Ponente"
  | "Ponente / Tallerista"
  | "Tallerista"
  | "Panelista"
  | "Mentor"
  | "Keynote";

export interface EventTheme {
  background: string;
  patternType: "circuits" | "dots" | "none";
  accentColor: string;
  glowColor: string;
}

export interface Conference {
  role: ConferenceRole;
  talkTitle: string;
  event: string;
  eventAbbreviation: string;
  logoUrl?: string;
  eventTheme?: EventTheme;
  location: string;
  date: string;
  modality: "Presencial" | "Virtual" | "Híbrido";
  abstract?: string;
  tags: string[];
  certificateUrl?: string;
  slidesUrl?: string;
  videoUrl?: string;
  eventUrl?: string;
}

export const conferences: Conference[] = [
  {
    role: "Ponente / Tallerista",
    talkTitle:
      "Moodle performance and stability testing under high-demand conditions",
    event: "XVIII Congreso de Computación para el Desarrollo (COMPDES 2025)",
    eventAbbreviation: "COMPDES",
    logoUrl: "/icon/conferences/compdes-2025.png",
    eventTheme: {
      background:
        "#0b332e url('/icon/conferences/compdes-2025-bg.png') center / cover no-repeat",
      patternType: "none",
      accentColor: "rgba(45, 212, 191, 0.25)",
      glowColor: "rgba(20, 184, 166, 0.25)",
    },
    location: "Centro Universitario de Occidente, Quetzaltenango, Guatemala",
    date: "25 de julio de 2025",
    modality: "Virtual",
    abstract:
      "Comparación de despliegues locales vs online de Moodle bajo condiciones de alta demanda, analizando performance y estabilidad.",
    tags: ["Performance Testing", "Moodle", "Load Testing", "DevOps"],
    certificateUrl: "/certificates/compdes-2025.pdf",
    eventUrl: "https://www.compdes.org/compdes2025/",
  },
];
