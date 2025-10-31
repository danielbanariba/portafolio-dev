import React, { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Beam from "./Beam";

// Función de utilidad para combinar clases
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Componente para mostrar una etiqueta de tecnología
const TechTag = ({ tech }) => (
  <span className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-md mr-2 mb-2 border border-blue-700/30">
    {tech}
  </span>
);

// Componente para mostrar un logro destacado
const Achievement = ({ text }) => (
  <div className="mb-3 flex items-start">
    <div className="text-green-400 mr-2 mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <p className="text-gray-300">{text}</p>
  </div>
);

export const ClientTimeline = ({ experiences }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Extraer métricas de los puntos (números, porcentajes)
  const getMetrics = (point) => {
    // Resalta números con porcentajes o valores numéricos
    return point
      .replace
      // /(\d+(?:\.\d+)?%|\d+)/g,
      // '<span class="text-blue-400 font-semibold">$1</span>'
      ();
  };

  // Transformar los datos de experiencia al formato que espera el Timeline
  const timelineData = experiences.map((experience) => ({
    title: experience.date,
    content: (
      <motion.div
        initial={{ opacity: 0.9, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10 relative overflow-hidden border border-gray-700/50 backdrop-blur-sm"
      >
        {/* Agregar dos componentes Beam en la parte superior */}
        <Beam className="top-0" />
        <Beam className="top-0" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600 flex-shrink-0 p-2">
            <img
              src={experience.icon}
              alt={experience.company}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition duration-300">
              {experience.title}
            </h3>
            <p className="text-blue-400 font-medium text-lg">
              {experience.company}
            </p>
          </div>
        </div>

        {experience.positions.map((position, idx) => (
          <div key={idx} className="mb-8">
            <div className="text-gray-200 mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-bold text-xl text-white">
                {position.role}
              </span>
              {position.period && (
                <span className="text-sm bg-gray-700/50 px-3 py-1 rounded-full text-blue-300 mt-2 md:mt-0 inline-block">
                  {position.period}
                </span>
              )}
            </div>

            {/* Mostrar tecnologías como etiquetas */}
            <div className="mb-4">
              {position.technologies &&
                position.technologies.map((tech, i) => (
                  <TechTag key={i} tech={tech} />
                ))}
            </div>

            <div className="border-l-2 border-blue-600/30 pl-4 py-1 mt-6">
              {position.points.map((point, pointIdx) => (
                <Achievement
                  key={pointIdx}
                  text={
                    <span
                      dangerouslySetInnerHTML={{ __html: getMetrics(point) }}
                    />
                  }
                />
              ))}
            </div>
          </div>
        ))}

        {/* Agregar el gradiente en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 mt-[2px] flex h-8 items-end overflow-hidden z-0">
          <div className="flex -mb-px h-[2px] w-full -scale-x-100">
            <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          </div>
        </div>
      </motion.div>
    ),
  }));

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gray-900 font-sans px-0 md:px-1"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-10 md:gap-10"
          >
            {/* CÍRCULO Y TÍTULO - OCULTO EN MÓVILES */}
            <div className="hidden md:flex sticky flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-0 md:left-1.5 w-10 rounded-full bg-gray-800 flex items-center justify-center shadow-lg border border-blue-600/30">
                <div className="h-4 w-4 rounded-full bg-blue-500 border border-blue-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-16 md:text-1xl font-bold text-gray-300">
                {item.title}
              </h3>
            </div>

            {/* CONTENIDO DE LA TARJETA */}
            <div className="relative pl-0 md:pl-0 w-full md:w-auto md:min-w-[760px]">
              {/* TÍTULO VISIBLE SOLO EN MÓVILES */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-400">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* LÍNEA DEL TIMELINE - OCULTA EN MÓVILES */}
        <div
          style={{
            height: height + "px",
          }}
          className="hidden md:block absolute md:left-6 left-6 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-blue-500 via-blue-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientTimeline;
