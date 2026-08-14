export const projects = [
  {
    title: "Navidrome — Open Source",
    imageUrl: "project/navidrome/banner.jpg",
    description:
      "Contribuciones mergeadas al servidor de streaming musical Navidrome. Frontend en React, fixes de accesibilidad y nuevas features.",
    technologies: [
      "React",
      "react-admin",
      "JavaScript",
      "Accesibilidad",
      "Open Source",
    ],
    documentacionUrl: "/navidrome",
    githubUrl:
      "https://github.com/navidrome/navidrome/pulls?q=is%3Apr+author%3Adanielbanariba+is%3Amerged",
    projectUrl: "https://github.com/navidrome/navidrome",
  },
  {
    title: "hvault — Sincronización de Certificados TLS",
    description:
      "Servicio en Rust puro (CLI + daemon) que sincroniza certificados TLS de Traefik entre nodos vía HashiCorp Vault (KV-v2): escritura atómica para hot-reload sin downtime, validación x509 sin OpenSSL y UI de administración en Leptos/WASM con OIDC.",
    technologies: ["Rust", "HashiCorp Vault", "Traefik", "Leptos", "WASM", "OIDC", "x509"],
  },
  {
    title: "MCP Servers Suite — Fleet propio en producción",
    description:
      "Fleet de servidores MCP (Model Context Protocol) que habilitan a la IA operar Dagster, SQL Server, SMB, Dokploy y Microsoft Graph desde Claude Code. Endurecido con validador SQL read-only, optimización de tokens y auditoría adversarial multiagente.",
    technologies: ["Python", "MCP", "Dagster", "SQL Server", "Claude Code", "smbprotocol", "Dokploy"],
  },
  {
    title: "Metal Archive",
    imageUrl: "project/metal-archive.png",
    description:
      "Catálogo de álbumes de metal sincronizado automáticamente desde YouTube. Migrado de Reflex a Astro: el sitio se genera estático desde SQLite y carga como HTML completo, con reproductor de YouTube y búsqueda. Páginas de banda y un microservicio FastAPI para los formularios.",
    technologies: [
      "Astro",
      "Preact",
      "TypeScript",
      "Python",
      "FastAPI",
      "SQLite",
      "YouTube API",
    ],
    documentacionUrl: "/metal-archive",
    githubUrl: "https://github.com/danielbanariba/links-bio",
    projectUrl: "https://danielbanariba.com/metal-archive",
  },
  {
    title: "Canal de YouTube Automatizado",
    imageUrl: "project/click-auto-editor.png",
    description:
      "Pipeline que automatiza un canal de YouTube: scraping de música underground, renderizado 4K con efectos VHS y subida programada con gestión de playlists y copyright.",
    technologies: [
      "Python",
      "C++",
      "CUDA",
      "FFmpeg",
      "Playwright",
      "YouTube API",
    ],
    documentacionUrl: "/canal-youtube-automatizado",
    githubUrl: "https://github.com/danielbanariba/click-auto-editor",
    projectUrl: "https://www.youtube.com/@danielbanariba",
  },
  {
    title: "Sistema Contable",
    imageUrl: "project/azure-app-service.png",
    description:
      "Infraestructura en Azure para un sistema contable. Incluye red virtual, base de datos SQL, almacenamiento y aplicación web.",
    technologies: ["Azure", "Terraform"],
    documentacionUrl: "/sistema-contable",
    githubUrl: "https://github.com/danielbanariba/sistema-contable",
  },
  {
    title: "Analyzepy",
    imageUrl: "project/analizador_lexico.png",
    description:
      "Es una herramienta que traduce código de Python a JavaScript, utilizando técnicas avanzadas de parsing y generación de código",
    technologies: ["Python", "Reflex"],
    githubUrl: "https://github.com/danielbanariba/analizador-lexico",
    projectUrl: "https://analyzepy-navy-orca.reflex.run/",
  },
  {
    title: "Resuelve Sistemas de Ecuaciones",
    imageUrl: "project/sistemas_de_ecuaciones.png",
    description:
      "Aplicación web para resolver sistemas de ecuaciones lineales, aplicando métodos algebraicos y ofreciendo una interfaz amigable para los usuarios.",
    technologies: ["Python", "Reflex"],
    githubUrl: "https://github.com/danielbanariba/sistemas-de-ecuaciones",
    projectUrl: "https://resuelvesistema-cyan-wood.reflex.run/",
  },
];
