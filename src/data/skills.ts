export interface Skill {
    name: string;
    icon: string;
    category: 'Backend' | 'Frontend' | 'Frameworks' | 'Gestores de Bases de Datos';
}

export const skills: Skill[] = [
    //---------------------------------------------Backend---------------------------------------------
    { name: 'Python', icon: '/icon/python.svg', category: 'Backend' },
    { name: 'Java', icon: '/icon/java.svg', category: 'Backend' },
    { name: 'C++', icon: '/icon/cpp.svg', category: 'Backend' },
    { name: 'Typescript', icon: '/icon/typescript.svg', category: 'Backend' },

    //---------------------------------------------Frontend---------------------------------------------
    { name: 'HTML', icon: '/icon/html5.svg', category: 'Frontend' },
    { name: 'CSS', icon: '/icon/css.svg', category: 'Frontend' },
    { name: 'JavaScript', icon: '/icon/javascript.svg', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: '/icon/tailwindcss.svg', category: 'Frontend' },

    //---------------------------------------------Frameworks-------------------------------------------
    { name: 'Astro', icon: '/icon/astro.svg', category: 'Frameworks' },
    { name: 'Reflex', icon: '/icon/reflex.svg', category: 'Frameworks' },
    { name: 'FastAPI', icon: '/icon/fastapi.svg', category: 'Frameworks' },
    { name: 'Spring', icon: '/icon/spring.svg', category: 'Frameworks' },

    //---------------------------------------------Gestores de Bases de Datos---------------------------
    { name: 'Oracle', icon: '/icon/oracle.svg', category: 'Gestores de Bases de Datos' },
    { name: 'MySQL', icon: '/icon/mysql.svg', category: 'Gestores de Bases de Datos' },
    { name: 'PostgreSQL', icon: '/icon/postgresql.svg', category: 'Gestores de Bases de Datos' },
    { name: 'MongoDB', icon: '/icon/mongodb.svg', category: 'Gestores de Bases de Datos' },
];