"use client";
import { useState, useEffect } from "react";
import clsx from 'clsx';
import { subjectName } from "#/lib/AlevelsubjectName";

export function StudentForm() {
  const [scores, setScores] = useState<number[]>(Array(16).fill(0));
  const [lastScores, setlastScores] = useState<number[]>(Array(16).fill(0));
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null); // Track which button is loading

  const getScore = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/student/alevel");
      const data = await response.json();
      const transformedData = Array(16).fill(0);

      data.result.forEach((item: any) => {
        transformedData[item.subject_id - 1] = item.score;
      });

      setScores(transformedData);
      setlastScores(transformedData);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
    setLoading(false); // End loading
  };

  const updateScore = async () => {
    // setLoading(true); // Start loading
    try {
      const response = await fetch("/api/student/alevel");
      const data = await response.json();
      const transformedData = Array(16).fill(0);

      data.result.forEach((item: any) => {
        transformedData[item.subject_id - 1] = item.score;
      });

      // setScores(transformedData);
      setlastScores(transformedData);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
    // setLoading(false); // End loading
  };


  const handleChange = (index: number, value: number) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[index] = value;
      return updatedScores;
    });
  };

  const handleSubmit = async (index: number) => {
    setLoadingIndex(index); // Set only the clicked button to loading state
    try {
      const response = await fetch("/api/student/alevel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, score: scores[index] }),
      });

      if (response.ok) {
        console.log(`Score for index ${index} submitted successfully`);
        updateScore();
      } else {
        alert("Error submitting score: " + response.statusText);
      }
    } catch (error) {
      alert("Error submitting score: " + error);
    }
    setLoadingIndex(null); // End loading
  };


  // Fetch scores when the component loads
  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">กรอกคะแนน</h1>
      {/* Loading Screen */}
      {loading ? (
        <div className="text-lg font-semibold text-gray-500 animate-pulse">กำลังโหลด...</div>
      ) : (
        Object.keys(scores).map((subject, index) => (
          <div className="flex flex-col space-y-3 w-[62%] max-w-lg" key={index}>
            <h1 className="text-lg font-medium">{subjectName[index]}:</h1>
            <div className="flex items-center justify-between space-x-4">
              <input
                className="text-cyan-600 rounded-lg h-12 w-[70%] p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={scores[index] === 0 ? "" : scores[index]}
                type="number"
                onChange={(e) => handleChange(index, Number(e.target.value))}
                min="0"
                max="100"
                step=".001"
              />
              <button
                className={clsx(
                  'group relative flex items-center justify-center rounded-lg w-20 h-12 font-medium text-white transition-all duration-300 active:scale-90',
                  {
                    "bg-pink-400": lastScores[index] !== scores[index],
                    "bg-gray-700 hover:bg-gray-500": lastScores[index] === 0,
                    "bg-vercel-pink hover:bg-pink-600": lastScores[index] === scores[index] && lastScores[index] !== 0,
                    "cursor-not-allowed opacity-50": loadingIndex === index, // Disable only the clicked button
                  }
                )}
                onClick={() => handleSubmit(index)}
                disabled={loadingIndex === index} // Only disable the clicked button
              >
                {loadingIndex === index ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </span>
                ) : (
                  lastScores[index] === 0 ? "Save" : "Edit"
                )}
              </button>
            </div>
          </div>
        ))
      )
      }
    </div>
  );
}