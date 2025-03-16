import React, { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Beam from "./Beam";

// Función de utilidad para combinar clases (equivalente a cn)
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const ClientTimeline = ({ experiences }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  // Transformar los datos de experiencia al formato que espera el Timeline
  const timelineData = experiences.map((experience) => ({
    title: experience.date,
    content: (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10 relative overflow-hidden">
        {/* Agregar dos componentes Beam en la parte superior */}
        <Beam className="top-0" />
        <Beam className="top-0" />
        <Beam className="top-0" />
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            <img
              src={experience.icon}
              alt={experience.company}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {experience.title}
            </h3>
            <p className="text-blue-400">{experience.company}</p>
          </div>
        </div>
        
        {experience.positions.map((position, idx) => (
          <div key={idx} className="mb-6">
            <div className="text-gray-400 mb-3">
              <span className="font-medium">{position.role}</span>
              {position.period && (
                <span className="text-sm text-gray-500">
                  {" "}
                  • {position.period}
                </span>
              )}
            </div>
            <ul className="list-disc list-inside text-gray-300">
              {position.points.map((point, pointIdx) => (
                <li key={pointIdx} className="mb-2">{point}</li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Agregar el gradiente en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 mt-[2px] flex h-8 items-end overflow-hidden z-0">
          <div className="flex -mb-px h-[2px] w-full -scale-x-100">
            <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          </div>
        </div>
      </div>
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
      className="w-full bg-gray-900 font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-10 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500 border border-blue-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-2xl font-bold text-gray-400">
                {item.title}
              </h3>
            </div>
            
            <div className="relative pl-20 pr-4 md:pl-0 w-full md:w-auto md:min-w-[630px]">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-400">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-500 via-blue-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientTimeline;