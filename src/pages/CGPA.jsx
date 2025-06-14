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
        if (!sgpa || !credits) hasError = true;
        const s = Number(sgpa);
        const c = Number(credits);
        totalCredits += c;
        totalWeightedSgpa += s * c;
      });

      if (hasError) {
        setError('Please fill all fields before calculating.');
        setResult(null);
        return;
      }

      const cgpa = (totalWeightedSgpa / totalCredits).toFixed(2);
      setResult(cgpa);
    } catch (err) {
      setError('An unexpected error occurred.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <motion.div
        className="max-w-3xl w-full p-6 sm:p-8 lg:p-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 150, damping: 20 }}
      >
        <div className={`rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
          <div className="px-6 py-10">
            <div className="flex items-center justify-center mb-8">
              <a href="/selection" className={`absolute left-6 top-6 p-3 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                <FiArrowLeft className="text-xl" />
              </a>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
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
                    className="flex items-center gap-4"
                  >
                    <div className={`flex-1 flex gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex-1">
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>SGPA</label>
                        <input
                          type="number"
                          placeholder="Enter SGPA"
                          value={sem.sgpa}
                          onChange={(e) => handleChange(index, 'sgpa', e.target.value)}
                          className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500' : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'} shadow-sm focus:outline-none text-sm`}
                          min="0"
                          max="10"
                          step="0.01"
                        />
                      </div>
                      <div className="flex-1">
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Credits</label>
                        <input
                          type="number"
                          placeholder="Enter credits"
                          value={sem.credits}
                          onChange={(e) => handleChange(index, 'credits', e.target.value)}
                          className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500' : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'} shadow-sm focus:outline-none text-sm`}
                          min="1"
                          max="50"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSemester(index)}
                      className={`p-2 rounded-full ${darkMode ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-gray-100'} transition-colors duration-200`}
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={handleAddSemester}
                className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white font-semibold transition-colors duration-200`}
              >
                <FiPlus className="mr-2 h-4 w-4 inline-block" />
                Add Semester
              </button>

              <button
                onClick={calculateCGPA}
                disabled={isCalculating}
                className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-pink-500 hover:bg-pink-600 disabled:bg-pink-700' : 'bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300'} text-white font-semibold transition-colors duration-200 disabled:cursor-not-allowed`}
              >
                {isCalculating ? 'Calculating...' : 'Calculate CGPA'}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-md bg-red-100 text-red-700 flex items-center justify-center"
                >
                  <FiAlertCircle className="mr-3 h-5 w-5" />
                  <p className="text-sm">{error}</p>
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
                  className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'} transition-all text-center`}
                >
                  <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your CGPA</h3>
                  <div className="flex items-center justify-center text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {result}
                    <FiCheckCircle className="ml-3 text-green-500 h-7 w-7" />
                  </div>
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cumulative Grade Point Average
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CGPA;
