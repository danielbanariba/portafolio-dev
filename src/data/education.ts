export interface Education {
    title: string;
    institution: string;
    date: string;
    logoUrl: string;
    certificateUrl: string;
    iconUrl?: string;
}

export const educations: Education[] = [
    {
        title: "Licenciatura en Matemáticas",
        institution: "Universidad Nacional Autónoma de Honduras",
        date: "2024 - Actualidad",
        logoUrl: "icon/education/unah.svg",
        certificateUrl: "https://ejemplo.com/certificado",
        iconUrl: "icon/education/certificate-off.svg"
    },
    {
        title: "Ingeniería en Sistemas Computacionales",
        institution: "Universidad Nacional Autónoma de Honduras",
        date: "2019 - Actualidad",
        logoUrl: "icon/education/unah.svg",
        certificateUrl: "https://ejemplo.com/certificado",
        iconUrl: "icon/education/certificate-off.svg"
    },
    {
        title: "Oracle Next Education F2 T5 Back-end",
        institution: "Alura Latam",
        date: "2023 - 2023",
        logoUrl: "icon/education/alura.svg",
        certificateUrl: "https://app.aluracursos.com/program/certificate/0145c274-7455-4314-8489-428d66171743",
        iconUrl: "icon/education/file-certificate.svg"
    },
    {
        title: "Database Foundations",
        institution: "Oracle Academy",
        date: "2023 - 2023",
        logoUrl: "icon/education/oracle_academy.png",
        certificateUrl: "https://drive.google.com/file/d/1HfNX6xVt7whiO7zvQli6ixwIwKQXdWTq/view?usp=drive_link",
        iconUrl: "icon/education/certificate-2.svg"
    },
    {
        title: "Java Foundations",
        institution: "Oracle Academy",
        date: "2021 - 2022",
        logoUrl: "icon/education/oracle_academy.png",
        certificateUrl: "https://drive.google.com/file/d/1lCtk8rQ6Tnj9K4dKTR0QtCqrtgcZXIHr/view?usp=drive_link",
        iconUrl: "icon/education/file-certificate.svg"
    },
    {
        title: "Pensamiendo Computacion con Python",
        institution: "Platzi",
        date: "2021 - 2021",
        logoUrl: "icon/education/platzi.svg",
        certificateUrl: "https://drive.google.com/file/d/1WOqYLkAPY5Jg7tdWA9dnHaLMTvYZXqap/view?usp=drive_link",
        iconUrl: "icon/education/file-certificate.svg"
    },
];