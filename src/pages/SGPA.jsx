// SGPA.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiArrowLeft, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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
      await new Promise(resolve => setTimeout(resolve, 500));

      let totalCredits = 0;
      let totalGradePoints = 0;
      let hasError = false;

      subjects.forEach(({ marks, credits }) => {
        if (!marks || !credits) hasError = true;
        const grade = calculateGradePoint(Number(marks));
        const credit = Number(credits);
        totalCredits += credit;
        totalGradePoints += grade * credit;
      });

      if (hasError) {
        setError('Please fill all fields before calculating.');
        setResult(null);
        return;
      }

      const sgpa = (totalGradePoints / totalCredits).toFixed(2);
      setResult(sgpa);
    } catch (err) {
      setError('An unexpected error occurred.');
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
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">
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
                    className="flex items-center gap-4"
                  >
                    <div className={`flex-1 flex gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex-1">
                        <label htmlFor={`marks-${index}`} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Marks</label>
                        <input
                          type="number"
                          id={`marks-${index}`}
                          placeholder="Enter marks"
                          value={subject.marks}
                          onChange={(e) => handleChange(index, 'marks', e.target.value)}
                          className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm focus:outline-none text-sm`}
                          min="0"
                          max="100"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor={`credits-${index}`} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Credits</label>
                        <input
                          type="number"
                          id={`credits-${index}`}
                          placeholder="Enter credits"
                          value={subject.credits}
                          onChange={(e) => handleChange(index, 'credits', e.target.value)}
                          className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm focus:outline-none text-sm`}
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSubject(index)}
                      className={`p-2 rounded-full ${darkMode ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-gray-100'} transition-colors duration-200`}
                      aria-label="Remove Subject"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={handleAddSubject}
                className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-semibold transition-colors duration-200`}
              >
                <FiPlus className="mr-2 h-4 w-4 inline-block" />
                Add Subject
              </button>

              <button
                onClick={calculateSGPA}
                disabled={isCalculating}
                className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-purple-500 hover:bg-purple-600 disabled:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300'} text-white font-semibold transition-colors duration-200 disabled:cursor-not-allowed`}
              >
                {isCalculating ? 'Calculating...' : 'Calculate SGPA'}
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
                  className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-indigo-50'} transition-all text-center`}
                >
                  <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your SGPA</h3>
                  <div className="flex items-center justify-center text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {result}
                    <FiCheckCircle className="ml-3 text-green-500 h-7 w-7" />
                  </div>
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Semester Grade Point Average
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

export default SGPA;
