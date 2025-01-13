import React from "react";

export default function About() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-400 min-h-screen">
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg rounded-lg p-10 mt-16 max-w-2xl w-full">
        <div className="flex items-center animation-fadeIn">
          <div>
            <h3 className="text-4xl font-bold text-white">Wania Maham</h3>
            <p className="text-teal-200 text-lg">Web Developer</p>
          </div>
        </div>

        <p className="mt-6 text-slate-200 leading-relaxed text-lg">
          I’m Wania Maham and have a love for crafting efficient and visually
          compelling digital experiences. I specialize in building responsive,
          user-centered websites and applications that look great on any device.
          I'm currently exploring advanced tools like Next.js and Tailwind CSS to
          take my projects to the next level.
        </p>

        <div className="mt-6 flex space-x-4">
          <a
            href="#"
            className="px-6 py-3 text-teal-800 bg-teal-200 rounded-md hover:bg-teal-300 transition duration-300"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/wania-m-7306322b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-teal-800 bg-teal-200 rounded-md hover:bg-teal-300 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/waniamaham"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-teal-800 bg-teal-200 rounded-md shadow-md hover:bg-teal-300 transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
