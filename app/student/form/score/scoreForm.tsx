"use client";
import { useState, useEffect } from "react";
import clsx from 'clsx';
import { subjectName } from "#/lib/subjectName";

export function StudentForm() {
  const [scores, setScores] = useState<number[]>(Array(8).fill(0));
  const [lastScores, setlastScores] = useState<number[]>(Array(8).fill(0));
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const getScore = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/student/score");
      const data = await response.json();
      const transformedData = Array(8).fill(0);

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


  const handleChange = (index: number, value: number) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[index] = value;
      return updatedScores;
    });
  };

  const handleSubmit = async (index: number) => {
    try {
      const response = await fetch("/api/student/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, score: scores[index] }),
      });

      if (response.ok) {
        console.log(`Score for index ${index} submitted successfully`);
        getScore();
      } else {
        console.error("Error submitting score:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
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
                value={scores[index]}
                type="number"
                onChange={(e) => handleChange(index, Number(e.target.value))}
                min="0"
                max="100"
                step=".001"
              />
              <button
                className={clsx(
                  'group block space-y-1.5 rounded-lg  w-20 h-12 font-medium text-white transition-colors duration-300',
                  {
                    'bg-pink-400': lastScores[index] !== scores[index],
                    'bg-gray-700 hover:bg-gray-500': lastScores[index] === 0,
                    'bg-vercel-pink hover:bg-pink-600': lastScores[index] !== 0,
                  }
                )}
                onClick={() => handleSubmit(index)}
              >
                {lastScores[index] === 0 ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        )))}
    </div>
  );
}