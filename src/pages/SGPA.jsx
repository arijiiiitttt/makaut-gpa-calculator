import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const Trash2Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.74 5.79m14.42-3.21v-.344a1.5 1.5 0 00-1.5-1.5H9.75a1.5 1.5 0 00-1.5 1.5v.344m7.844 0H3.36l-.38-1.523A1.125 1.125 0 002.88 2.25H5.25a2.25 2.25 0 012.24-2.077h9.02A2.25 2.25 0 0118.75 2.25h2.37c.366 0 .684.234.784.577z" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.176 3.374 1.948 3.374h14.71c1.772 0 2.812-1.874 1.945-3.374L13.949 3.37a1.875 1.875 0 00-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const SGPA = ({ darkMode }) => {
  const [subjects, setSubjects] = useState([{ marks: '', credits: '' }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const storedSubjects = localStorage.getItem('sgpaSubjects');
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sgpaSubjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { marks: '', credits: '' }]);
    setError(null);
  };

  const handleRemoveSubject = (index) => {
    if (subjects.length > 1) {
      const updated = subjects.filter((_, i) => i !== index);
      setSubjects(updated);
      setError(null);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
    setError(null);
  };

  const calculateGradePoint = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 5;
    return 2;
  };

  const calculateSGPA = async () => {
    setIsCalculating(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a delay

      let totalCredits = 0;
      let totalGradePoints = 0;
      let hasError = false;

      subjects.forEach(({ marks, credits }) => {
        const numMarks = Number(marks);
        const numCredits = Number(credits);

        if (isNaN(numMarks) || isNaN(numCredits) || marks === '' || credits === '' || numMarks < 0 || numMarks > 100 || numCredits <= 0) {
          hasError = true;
          return;
        }
        
        const grade = calculateGradePoint(numMarks);
        totalCredits += numCredits;
        totalGradePoints += grade * numCredits;
      });

      if (hasError) {
        setError('Please fill all fields with valid numbers (Marks 0-100, Credits > 0).');
        setResult(null);
        return;
      }

      if (totalCredits === 0) {
          setError('Total credits cannot be zero. Please add subjects with valid credits.');
          setResult(null);
          return;
      }

      const sgpa = (totalGradePoints / totalCredits).toFixed(2);
      setResult(sgpa);
    } catch (err) {
      console.error("SGPA Calculation Error:", err);
      setError('An unexpected error occurred during calculation.');
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const subjectVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-950 font-sans">
      <motion.div
        className="max-w-3xl w-full p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Removed the white div */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="relative flex items-center justify-center mb-8">
              {/* Optional back button, hidden as no /selection route */}
              {/* <a href="/selection" className={`absolute left-0 p-3 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}>
                <ArrowLeftIcon className="text-xl" />
              </a> */}
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-center">
                SGPA Calculator
              </h1>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    variants={subjectVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col sm:flex-row items-center gap-4 py-4 bg rounded-full px-20 shadow-sm transition-colors duration-300 bg-white hover:shadow-md"
                  >
                    <div className="flex-1 w-full sm:w-auto">
                      <label htmlFor={`marks-${index}`} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Marks (0-100)</label>
                      <input
                        type="number"
                        id={`marks-${index}`}
                        placeholder="e.g., 85"
                        value={subject.marks}
                        onChange={(e) => handleChange(index, 'marks', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xl
                                   ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                                   focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 shadow-inner`}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <label htmlFor={`credits-${index}`} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Credits (1-10)</label>
                      <input
                        type="number"
                        id={`credits-${index}`}
                        placeholder="e.g., 4"
                        value={subject.credits}
                        onChange={(e) => handleChange(index, 'credits', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xl
                                   ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                                   focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 shadow-inner`}
                        min="1"
                        max="10"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveSubject(index)}
                      className={`p-3 rounded-full flex-shrink-0
                                 ${darkMode ? 'bg-gray-600 text-red-400 hover:bg-red-900' : 'bg-red-50 text-red-600 hover:bg-red-100'}
                                 transition-colors duration-200 shadow-sm hover:shadow-md`}
                      aria-label="Remove Subject"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddSubject}
                className={`flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold
                           ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40' : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-300/50'}
                           transition-all duration-300 transform hover:-translate-y-1`}
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Subject
              </button>

              <button
                onClick={calculateSGPA}
                disabled={isCalculating}
                className={`flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold
                           ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/40 disabled:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-300/50 disabled:bg-purple-300'}
                           transition-all duration-300 transform hover:-translate-y-1 disabled:cursor-not-allowed`}
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  'Calculate SGPA'
                )}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-6 p-4 rounded-xl flex items-center justify-center shadow-md
                             ${darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-700'}`}
                >
                  <AlertCircleIcon className="mr-3 h-6 w-6" />
                  <p className="text-base font-medium text-center">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 15 }}
                  className={`mt-8 p-6 rounded-3xl transition-all text-center shadow-xl
                             ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}
                >
                  <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your SGPA</h3>
                  <div className="flex items-center justify-center text-5xl font-extrabold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    {result}
                    <CheckCircleIcon className="ml-4 text-green-500 h-8 w-8" />
                  </div>
                  <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Semester Grade Point Average
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </motion.div>
    </div>
  );
};

export default SGPA;
