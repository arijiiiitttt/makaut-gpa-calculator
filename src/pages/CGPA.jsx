// CGPA.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiArrowLeft, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CGPA = ({ darkMode }) => {
  const [semesters, setSemesters] = useState([{ sgpa: '', credits: '' }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAddSemester = () => {
    setSemesters([...semesters, { sgpa: '', credits: '' }]);
    setError(null);
  };

  const handleRemoveSemester = (index) => {
    if (semesters.length > 1) {
      const updated = semesters.filter((_, i) => i !== index);
      setSemesters(updated);
      setError(null);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
    setError(null);
  };

  const calculateCGPA = async () => {
    setIsCalculating(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let totalCredits = 0;
      let totalWeightedSgpa = 0;
      let hasError = false;

      semesters.forEach(({ sgpa, credits }) => {
        const numSgpa = Number(sgpa);
        const numCredits = Number(credits);

        if (isNaN(numSgpa) || isNaN(numCredits) || sgpa === '' || credits === '' || numSgpa < 0 || numSgpa > 10 || numCredits <= 0) {
          hasError = true;
          return;
        }
        totalCredits += numCredits;
        totalWeightedSgpa += numSgpa * numCredits;
      });

      if (hasError) {
        setError('Please fill all fields with valid numbers (SGPA 0-10, Credits > 0).');
        setResult(null);
        return;
      }

      if (totalCredits === 0) {
        setError('Total credits cannot be zero. Please add semesters with valid credits.');
        setResult(null);
        return;
      }

      const cgpa = (totalWeightedSgpa / totalCredits).toFixed(2);
      setResult(cgpa);
    } catch (err) {
      console.error("CGPA Calculation Error:", err);
      setError('An unexpected error occurred during calculation.');
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const semesterVariants = {
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
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="relative flex items-center justify-center mb-8">
            {/* Optional back button, hidden as no /selection route */}
            {/* <a href="/selection" className={`absolute left-0 p-3 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}>
              <FiArrowLeft className="text-xl" />
            </a> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-center">
              CGPA Calculator
            </h1>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {semesters.map((sem, index) => (
                <motion.div
                  key={index}
                  variants={semesterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col sm:flex-row items-center gap-4 py-4 bg rounded-full px-20 shadow-sm transition-colors duration-300 bg-white hover:shadow-md"
                >
                  <div className="flex-1 w-full sm:w-auto">
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>SGPA (0-10)</label>
                    <input
                      type="number"
                      placeholder="e.g., 8.5"
                      value={sem.sgpa}
                      onChange={(e) => handleChange(index, 'sgpa', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-xl
                                   ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                                   focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 shadow-inner`}
                      min="0"
                      max="10"
                      step="0.01"
                    />
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Credits (1-50)</label>
                    <input
                      type="number"
                      placeholder="e.g., 20"
                      value={sem.credits}
                      onChange={(e) => handleChange(index, 'credits', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-xl
                                   ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                                   focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 shadow-inner`}
                      min="1"
                      max="50"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveSemester(index)}
                    className={`p-3 rounded-full flex-shrink-0
                                 ${darkMode ? 'bg-gray-600 text-red-400 hover:bg-red-900' : 'bg-red-50 text-red-600 hover:bg-red-100'}
                                 transition-colors duration-200 shadow-sm hover:shadow-md`}
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAddSemester}
              className={`flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold
                           ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40' : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-300/50'}
                           transition-all duration-300 transform hover:-translate-y-1`}
            >
              <FiPlus className="mr-2 h-5 w-5 inline-block" />
              Add Semester
            </button>

            <button
              onClick={calculateCGPA}
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
                'Calculate CGPA'
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
                <FiAlertCircle className="mr-3 h-6 w-6" />
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
                <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your CGPA</h3>
                <div className="flex items-center justify-center text-5xl font-extrabold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {result}
                  <FiCheckCircle className="ml-4 text-green-500 h-8 w-8" />
                </div>
                <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cumulative Grade Point Average
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CGPA;
