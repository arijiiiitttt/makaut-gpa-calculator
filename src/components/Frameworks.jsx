import React from "react";
import {
  FaReact,
  FaCss3Alt,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiSanity, SiVercel } from "react-icons/si";
import { TbBrandVite } from "react-icons/tb";

export default function Frameworks() {
  return (
    <section id="sponsors" className=" bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff] text-center py-16 px-6 ">
      <h3 className="text-3xl font-bold mb-4">Frameworks Used 👇🏻</h3>
      <p className="text-gray-500 max-w-2xl mx-auto mb-8">
Seamless and accurate, this MAKAUT GPA calculator offers a user-friendly and reliable grade calculation tool, built with modern web technologies
      </p>
      <div className="flex flex-wrap justify-center items-center gap-10 text-xl md:text-2xl text-gray-600">
        <div className="flex items-center gap-2 text-cyan-500"><FaReact className="text-3xl" /> React</div>
        <div className="flex items-center gap-2 text-[#a648f3]"><TbBrandVite className="text-3xl" /> Vite.dev</div>
        <div className="flex items-center gap-2 text-sky-500"><SiTailwindcss className="text-3xl" /> tailwindcss</div>
        <div className="flex items-center gap-2 text-red-400"><SiSanity className="text-3xl" /> SANITY</div>
        <div className="flex items-center gap-2"><SiVercel className="text-3xl" /> Vercel</div>
      </div>
    </section>
  );
}
