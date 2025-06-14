import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

function SelectionPg() {
    const navigate = useNavigate();

    const ButtonCreativeTop = ({ text, onClick, to, videoSrc }) => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <Link to={to} className="no-underline">
                <div
                    className="group relative cursor-pointer p-2 w-64 sm:w-80 lg:w-96 rounded-full overflow-hidden text-center font-semibold lg:text-4xl hover:scale-105 hover:shadow-lg"
                    onClick={onClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        background: '#9810fa',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    }}
                >
                    {/* Original Text - Hidden on Hover */}
                    <span className={`translate-y-0 transition-all duration-300 inline-block py-2 px-4 lg:py-8 lg:px-12 text-white z-20 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        {text}
                    </span>

                    {/* Hovered Text - Shown on Hover */}
                    <span className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 text-white ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {text}
                    </span>

                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-purple-200 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-full"></div>

                    {/* Shiny Effect */}
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/50 to-transparent transform skew-x-[-45deg] translate-x-[-150%] transition-all duration-500 group-hover:translate-x-[150%]"></div>

                    {/* Pop Animation */}
                    <style>
                        {`
                            .pop-animation {
                                animation: pop 0.3s ease-in-out;
                            }

                            @keyframes pop {
                                0% {
                                    transform: scale(1);
                                }
                                50% {
                                    transform: scale(1.1);
                                }
                                100% {
                                    transform: scale(1);
                                }
                            }
                        `}
                    </style>

                    {isHovered && videoSrc && (
                        <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            className={`absolute top-0 left-0 w-full h-full object-cover rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            style={{ zIndex: 1 }}
                        />
                    )}
                </div>
            </Link>
        );
    };

    const handleGoBack = () => {
        navigate('/'); // Navigate to the root path ("/")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff]">
            {/* Back Button */}
            <button
                onClick={handleGoBack}
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                style={{ padding: '4px', borderRadius: '50%' }} // Added padding and rounded corners
            >
                <FaArrowLeft size={16} /> {/* Reduced icon size */}
            </button>

            <div className="flex flex-col gap-6">
                <ButtonCreativeTop text="Calculate SGPA" to="/sgpa" videoSrc="" />
                <ButtonCreativeTop text="Calculate CGPA" to="/cgpa" videoSrc="" />
            </div>
        </div>
    );
}

export default SelectionPg;
