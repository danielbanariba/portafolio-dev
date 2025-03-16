// Beam.jsx
import { useEffect, useRef } from "react";

const Beam = ({ className }) => {
  const meteorRef = useRef(null);

  useEffect(() => {
    // Agregar los estilos de animación si no existen
    if (!document.getElementById("beam-keyframes")) {
      const style = document.createElement("style");
      style.id = "beam-keyframes";
      style.innerHTML = `
        @keyframes meteor {
          0% {
            left: 0;
            opacity: 0;
          }
          70% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const meteor = meteorRef.current;

    const handleAnimationEnd = () => {
      meteor.style.visibility = "hidden";
      const animationDelay = Math.floor(Math.random() * 3);
      const animationDuration = Math.floor(Math.random() * 4) + 2;
      const meteorWidth = Math.floor(Math.random() * 80) + 20;
      
      meteor.style.setProperty("--meteor-delay", `${animationDelay}s`);
      meteor.style.setProperty("--meteor-duration", `${animationDuration}s`);
      meteor.style.setProperty("--meteor-width", `${meteorWidth}px`);
      
      // Reiniciar animación
      setTimeout(() => {
        meteor.style.animation = "none";
        void meteor.offsetWidth; // Forzar reflow
        meteor.style.animation = `meteor ${animationDuration}s linear ${animationDelay}s`;
      }, 0);
    };

    const handleAnimationStart = () => {
      meteor.style.visibility = "visible";
    };

    meteor.addEventListener("animationend", handleAnimationEnd);
    meteor.addEventListener("animationstart", handleAnimationStart);

    return () => {
      meteor.removeEventListener("animationend", handleAnimationEnd);
      meteor.removeEventListener("animationstart", handleAnimationStart);
    };
  }, []);

  return (
    <span
      ref={meteorRef}
      className={`absolute z-40 h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${className || ""}`}
      style={{
        transform: "rotate(-180deg)",
        animation: "meteor 3s linear",
        position: "absolute"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "var(--meteor-width, 50px)",
          height: "1px",
          background: "linear-gradient(90deg, #6366f1, #7dd3fc, transparent)"
        }}
      />
    </span>
  );
};

export default Beam;