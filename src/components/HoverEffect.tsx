import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HoverEffectProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  documentacionUrl?: string;
  githubUrl: string;
  projectUrl?: string;
}

const HoverEffect = ({
  title,
  description,
  imageUrl,
  technologies,
  documentacionUrl,
  githubUrl,
  projectUrl,
}: HoverEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-800/[0.2] border border-transparent group-hover:border-slate-700 relative z-50 flex flex-col">
        <div className="flex-grow">
          <h4 className="text-zinc-100 font-bold tracking-wide mb-4">
            {title}
          </h4>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <div className="mb-4">
            <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-slate-700 text-zinc-200 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-end items-center gap-6 pt-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 hover:scale-125 duration-200 hover:stroke-blue-500"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          {documentacionUrl && (
            <a
              href={documentacionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <svg
                className="w-8 h-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
          )}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <svg
                className="w-8 h-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 22 22"
              >
                <path d="M15.17 11.053L11.18 15.315C10.8416 15.6932 10.3599 15.9119 9.85236 15.9178C9.34487 15.9237 8.85821 15.7162 8.51104 15.346C7.74412 14.5454 7.757 13.2788 8.54004 12.494L13.899 6.763C14.4902 6.10491 15.3315 5.72677 16.2161 5.72163C17.1006 5.71649 17.9463 6.08482 18.545 6.736C19.8222 8.14736 19.8131 10.2995 18.524 11.7L12.842 17.771C12.0334 18.5827 10.9265 19.0261 9.78113 18.9971C8.63575 18.9682 7.55268 18.4695 6.78604 17.618C5.0337 15.6414 5.07705 12.6549 6.88604 10.73L12.253 5" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoverEffect;