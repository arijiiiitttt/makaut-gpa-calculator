import React from 'react';

function SelectionPg() {
    const handleSGPAClick = () => {
        alert("SGPA Calculation Coming Soon!"); 
    };

    const handleCGPAClick = () => {
        alert("CGPA Calculation Coming Soon!"); 
    };

    const ButtonCreativeTop = ({ text, onClick }) => {
        return (
            <div
                className="group relative cursor-pointer p-2 w-64 sm:w-80 lg:w-96 border bg-purple-500 text-white rounded-full overflow-hidden text-center font-semibold lg:text-4xl"
                onClick={onClick}
            >
                <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block py-2 px-4 lg:py-8 lg:px-12">
                    {text}
                </span>
                <div className="flex gap-2 text-white bg-purple-700 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none ">
                    <span className="py-2 px-4 lg:py-8 lg:px-12">{text}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col gap-6">
                <ButtonCreativeTop text="Calculate SGPA" onClick={handleSGPAClick} />
                <ButtonCreativeTop text="Calculate CGPA" onClick={handleCGPAClick} />
            </div>
        </div>
    );
}

export default SelectionPg;
