import React, { useState } from 'react';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FiCode, FiCpu, FiBox } from "react-icons/fi";


export default function Hero() {
    const [menuOpen, setMenuOpen] = useState(false);
    const features = [
        {
            icon: <FiCode className="text-purple-500 text-xl" />,
            title: "Expressive API",
            desc: "You don't need to be an expert to use our plugin. Our expressive API is readable and well documented.",
        },
        {
            icon: <FiCpu className="text-purple-500 text-xl" />,
            title: "Highly performant",
            desc: "You can make sure your website or app is highly performant with a built-in system to help you optimize.",
        },
        {
            icon: <FiBox className="text-purple-500 text-xl" />,
            title: "No dependencies",
            desc: "Our plugins do not have any external dependencies so our plugin has the minimal footprint possible.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff] text-gray-900 relative overflow-hidden">
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-md">MK</span> Calc
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <a href="#" className="hover:underline">Documentation</a>
                    <a href="https://www.makautexam.net/" target='_blank' className="hover:underline flex items-center gap-1">
                        Main Website <span className="text-xs">↗</span>
                    </a>
                    <a href="https://github.com/arijiiiitttt/makaut-gpa-calculator" target='_blank' className="text-xl">
                        <FaGithub />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 text-center pb-6 text-sm font-medium">
                    <a href="#" className="hover:underline">Documentation</a>
                    <a href="https://www.makautexam.net/" target='_blank' className="hover:underline flex items-center gap-1">
                        Main Website<span className="text-xs">↗</span>
                    </a>
                    <a href="https://github.com/arijiiiitttt/makaut-gpa-calculator" target='_blank' className="text-xl">
                        <FaGithub />
                    </a>
                </div>
            )}
            <section className="text-center pt-10 md:pt-16 px-4 md:px-0">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-purple-600 text-white rounded-full p-4 mb-4 text-3xl">
                        <HiOutlineRocketLaunch />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-2">
                        Effortless GPA Calculation for <br />
                        <span className="text-black">MAKAUT Students</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg mb-6 px-2">
                        The primary tool input fields for course codes, credits, and grades. Clear display of the calculated SGPA & CGPA.     </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href='https://github.com/arijiiiitttt/makaut-gpa-calculator' target='_blank' className="bg-purple-100 text-purple-900 px-6 py-3 rounded-full flex items-center gap-2 text-sm font-mono cursor-pointer hover:bg-purple-200 transition">
                            <span>Give Stars to this repo ⭐</span>
                        </a>
                        <a
                            href="/selection"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition flex items-center justify-center"
                        >
                            Let's Calculate →
                        </a>
                    </div>
                </div>
            </section>
            <div className="w-full bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff] py-20 px-30">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-start gap-10 text-center md:text-left">
                    {features.map((feature, index) => (
                        <div key={index} className="flex-1">
                            <div className="flex justify-center md:justify-start mb-4">
                                <div className="bg-purple-200 p-3 rounded-full">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                            <p className=" text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
