export const projects = [
  // {
  //   title: "MCP Servers Suite",
  //   imageUrl: "project/metal-archive.png",
  //   description:
  //     "Suite de servidores MCP (Model Context Protocol) que habilitan operación completa desde Claude Code: (1) mcp-dagster — materialización de assets y consulta de runs/logs/errores en 3 entornos vía GraphQL, (2) mcp-db — allowlist de queries parametrizadas con Jinja sobre SQL Server y PostgreSQL, (3) mcp-api-check — verificación de health endpoints, (4) outlook-todoist-mcp — sincronización Outlook → Todoist vía Microsoft Graph. Permite un flujo end-to-end de CI/observabilidad operado desde IA.",
  //   technologies: [
  //     "Python",
  //     "MCP Protocol",
  //     "Dagster GraphQL",
  //     "SQL Server",
  //     "PostgreSQL",
  //     "Jinja2",
  //     "Microsoft Graph",
  //     "Claude Code",
  //   ],
  // },
  // {
  //   title: "Dagster Watchdog",
  //   imageUrl: "project/metal-archive.png",
  //   description:
  //     "Sistema autónomo de monitoreo para pipelines Dagster en producción. Consulta la API GraphQL cada 5 minutos, detecta runs pegados comparando contra baselines aprendidos de 100+ ejecuciones históricas por tipo de sensor, cancela y re-lanza automáticamente con tags de retry, y notifica vía Telegram. Desplegado como servicio systemd 24/7.",
  //   technologies: [
  //     "Python",
  //     "Dagster GraphQL",
  //     "Telegram Bot",
  //     "systemd",
  //     "asyncio",
  //   ],
  // },
  // {
  //   title: "Inventario Personal",
  //   imageUrl: "project/inventario-personal.png",
  //   description:
  //     "App móvil para gestionar inventario doméstico con sincronización familiar en tiempo real, estadísticas de compras con insights accionables, presupuesto inteligente, escaneo de códigos de barras y comandos de voz.",
  //   technologies: ["Flutter", "Dart", "SQLite", "Firebase", "fl_chart"],
  //   documentacionUrl: "/inventario-personal",
  //   githubUrl: "https://github.com/danielbanariba/inventario_personal",
  // },
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
  // {
  //   title: "Arsenal de Odio Website",
  //   imageUrl: "project/arsenal-de-odio.png",
  //   description:
  //     "Arsenal De Odio es una banda de Thrash Metal de Honduras, quise plasmar su espíritu como banda en la pagina web. Aquí se puede encontrar todo relacionado con la banda, sus integrantes, discografía, mercadería, etc.",
  //   technologies: ["Python", "Reflex", "Javascript"],
  //   githubUrl: "https://github.com/danielbanariba/arsenal-de-odio-web",
  //   projectUrl: "https://arsenaldeodio.reflex.run/",
  // },
];
