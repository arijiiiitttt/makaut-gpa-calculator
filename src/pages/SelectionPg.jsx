import React from 'react';
import { Link } from 'react-router-dom';

function SelectionPg() {

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
                        background: '#9810fa', // Corrected: Added missing closing parenthesis
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    }}
                >
                    <span className="translate-y-0 group-hover:translate-y-0 group-hover:opacity-0 transition-all duration-300 inline-block py-2 px-4 lg:py-8 lg:px-12 text-white z-20">
                        {text}
                    </span>
                    <div className="flex gap-2 text-white items-center absolute left-0 top-0 h-full w-full justify-center transition-all duration-300 rounded-full" style={{ opacity: isHovered ? 0 : 1 }}> {/* Removed opacity-100 */}
                        <span className="py-2 px-4 lg:py-8 lg:px-12 z-30">{text}</span>
                    </div>
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
                            className={`absolute top-0 left-0 w-full h-full object-cover rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} // Corrected: Used opacity-100 and opacity-0 for visibility
                            style={{ zIndex: 1 }} // Removed redundant opacity style
                        />
                    )}
                </div>
            </Link>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-[#fafafa] to-[#f7faff]">
            <div className="flex flex-col gap-6">
                <ButtonCreativeTop text="Calculate SGPA" to="/sgpa" videoSrc="./video/cal.mp4" />
                <ButtonCreativeTop text="Calculate CGPA" to="/cgpa" videoSrc="./video/cal.mp4" />
            </div>
        </div>
    );
}

export default SelectionPg;
