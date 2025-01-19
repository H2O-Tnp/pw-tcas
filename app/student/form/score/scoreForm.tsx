"use client";
import { useState, useEffect } from "react";
import clsx from 'clsx';
import { db } from "#/lib/db";

export function StudentForm(StudentId: any) {
  // const [scores, setScores] = useState({
  //   TGAT1: 0,
  //   TGAT2: 0,
  //   TGAT3: 0,
  //   TPAT1: 0,
  //   TPAT2: 0,
  //   TPAT3: 0,
  //   TPAT4: 0,
  //   TPAT5: 0,
  // });
  const [scores, setScores] = useState<number[]>(Array(8).fill(0));
  const [lastScores, setlastScores] = useState<number[]>(Array(8).fill(0));
  const subjectName = [
    "TGAT1 การสื่อสารภาษาอังกฤษ",
    "TGAT2 การคิดอย่างมีเหตุผล",
    "TGAT3 สมรรถนะการงาน",
    "TPAT1 กสพท",
    "TPAT2 ศิลปกรรมศาสตร์",
    "TPAT3 วิทยาศาสตร์ เทคโนโลยี และ วิศวะกรรมศาสตร์",
    "TPAT4 สถาปัตยกรรม",
    "TPAT5 ครุสาสตร์ - ศึกษาศาสตร์"
  ]

  const handleChange = (index: number, value: number): void => {
    const updatedValues = [...scores];
    updatedValues[index] = value; // Convert to number, default to 0 if invalid
    setScores(updatedValues);
    // console.log(updatedValues);
  };

  const handleSubmit = async (index: number): Promise<void> => {
    const scoreToFetch = scores[index];
    console.log(scoreToFetch);
    try {
      const response = await fetch("/api/student/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, score: scoreToFetch }),
      });

      // const data = await response.json();
      console.log(response);
      if (response.ok) {
        console.log(`Successfully submitted score for index ${index}:`, scoreToFetch);
      } else {
        console.error("Error submitting score:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
    getScore();
  };


  const getScore = async () => {
    try {
      const response = await fetch("/api/student/score", {
        method: "GET",
      });

      const data = await response.json();
      console.log("Raw Data:", data);

      // Extract and transform the data
      const transformedData = Array(8).fill(0); // Default values
      data.result.forEach((item: any) => {
        transformedData[item.subject_id - 1] = item.score; // Use subject_id - 1 as index
      });

      console.log("Transformed Data:", transformedData);
      setScores(transformedData); // Update the scores state
      setlastScores(transformedData); // Update the scores state
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  // Fetch scores when the component loads
  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className=" w-full">
      <h1>กรอกคะแนน</h1>
      {
        Object.keys(scores).map((subject, index) => (
          <div className="flex flex-col space-y-3 ml-8">
            <div className="flex flex-col space-y-1 0" key={index}>
              <h1 className="pt-3 w-[calc(100%/2)]">
                {subjectName[index]}:
              </h1>
              <div className="flex space-x-7">
                <input className=" text-cyan-600 rounded-lg w-[calc(100%/2)]"
                  value={scores[index]}
                  // placeholder={String(scores[index])}
                  type="number"
                  // name={subject_id[index]}
                  onChange={(e) => handleChange(index, Number(e.target.value))}
                  min="0"
                  max="100"
                  step=".001"
                />
                <button
                  className={clsx({
                    'bg-pink-400': lastScores[index]!==scores[index],
                    'group block space-y-1.5 rounded-lg px-5 py-3 bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white': lastScores[index] === 0,
                    'group block space-y-1.5 rounded-lg px-5 py-3 bg-vercel-pink text-red-50 hover:bg-pink-600 hover:text-white': lastScores[index] !== 0,
                  })} 
                  onClick={() => handleSubmit(index)}
                >
                  <div className="font-medium text-gray-200 group-hover:text-gray-50">
                    {lastScores[index] === 0 ? "Save" : "Edit"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div >
  );
}
