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
  // {
  //   title: "Portfolio Self-Hosted + CI/CD",
  //   imageUrl: "project/metal-archive.png",
  //   description:
  //     "Portfolio full-stack desplegado en hardware propio con Cloudflare Tunnel (sin IP estática ni puertos abiertos), servicios systemd para auto-arranque, y webhook con validación HMAC que ejecuta git pull + restart automático en cada push a main.",
  //   technologies: [
  //     "Python",
  //     "Reflex",
  //     "Cloudflare Tunnel",
  //     "systemd",
  //     "GitHub Webhooks",
  //     "Linux",
  //   ],
  //   githubUrl: "https://github.com/danielbanariba/links-bio",
  //   projectUrl: "https://danielbanariba.com",
  // },
  {
    title: "Metal Archive",
    imageUrl: "project/metal-archive.png",
    description:
      "Catálogo de álbumes del canal con sincronización automática desde YouTube, filtrado por género/país/año y descubrimiento aleatorio. Backend con estado reactivo en tiempo real vía WebSocket.",
    technologies: ["Python", "Reflex", "SQLite", "YouTube API"],
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
  {
    title: "SoundCloud Clone",
    imageUrl: "project/soundcloud.jpg",
    description:
      "Analizar y clonar la funcionalidad de SoundCloud, creación de la base de datos, backend y frontend.",
    technologies: ["OracleSQL", "Python", "FastAPI", "HTML", "CSS"],
    githubUrl: "https://github.com/danielbanariba/soundclound",
  },
];
