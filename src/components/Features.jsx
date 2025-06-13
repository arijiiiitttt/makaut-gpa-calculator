import React from "react";

const features = [
    [
        {
            title: "Customizable",
            desc: "You don't need to be an expert to customize this plugin. Our code is very readable and well documented.",
            icon: "\u{1F527}"
        },
        {
            title: "Fully Responsive",
            desc: "With mobile, tablet & desktop support it doesn't matter what device you're using.",
            icon: "\u{1F4F1}"
        },
        {
            title: "Developer Support",
            desc: "Supported by sponsors who provide community help.",
            icon: "\u{1F4E7}"
        },
    ],
    [
        {
            title: "Cross Browser",
            desc: "Works perfectly in all modern browsers like Chrome, Firefox, Safari.",
            icon: "\u{1F310}"
        },
        {
            title: "Clean Code",
            desc: "We strictly follow a set of guidelines to keep it efficient.",
            icon: "\u{1F4C4}"
        },
        {
            title: "Well Maintained",
            desc: "Actively maintained by the core plugin team.",
            icon: "\u{1F527}"
        },
    ],
];

export default function Features() {
    return (
        <section id="features" className=" bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff] py-4 px-6 text-center">
            <h3 className="text-3xl font-bold mb-4">Features you'll love 😍</h3>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                Explore the features you'll love! Our MAKAUT GPA calculator makes calculating <br />
 your grades simple, accurate, and stress-free.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto px-9">
                {features.flat().map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-left">
                        <div className="text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-purple-300 shrink-0">
                            {f.icon}
                        </div>                        <div>
                            <h4 className="font-semibold text-lg">{f.title}</h4>
                            <p className="text-gray-500">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

