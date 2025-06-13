import React from "react";

export default function Footer() {
  return (
    <footer className="border-t py-6 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
      <p>© 2025 All rights reserved</p>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">License</a>
        <a href="#" className="hover:underline">FAQ</a>
      </div>
      <a
        href="https://github.com/arijiiiitttt/makaut-gpa-calculator" target="_blank"
        className="mt-2 md:mt-0 inline-flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100"
      >
        <span className="bg-purple-700 text-white px-2 py-0.5 rounded text-xs font-bold">MK</span>
        <span className="text-sm">Calc</span>
      </a>
    </footer>
  );
}
