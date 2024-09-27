import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HoverEffect = ({ title, imageUrl, description, technologies, githubUrl, projectUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        scale: isHovered ? 1.02 : 1,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div
        className="absolute inset-0 bg-purple-600 rounded-3xl"
        initial={false}
        animate={{
          opacity: isHovered ? 0.5 : 0,
          transition: { duration: 0.3 }
        }}
      />
      <motion.div 
        className="rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-800/[0.2] border-2 border-transparent relative z-10"
        initial={false}
        animate={{
          borderColor: isHovered ? 'rgba(147, 51, 234, 0.7)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px 5px rgba(147, 51, 234, 0.3)' : '0 0 0 0 rgba(0, 0, 0, 0)',
          transition: { duration: 0.3 }
        }}
      >
        {/* El contenido de la tarjeta permanece igual */}
        <div className="relative z-20">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span key={index} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{tech}</span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {projectUrl && (
              <motion.a 
                href={projectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyecto
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HoverEffect;