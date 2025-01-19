"use client";

import prisma from "#/lib/db";
import { db } from "#/lib/db";
import { auth } from '#/auth';

import { useState } from "react";
import { Session } from "inspector";

export default function StudentForm() {
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

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        // Success handling
        // alert(`Successfully submitted index ${index} (${subject_id[index]}) with score: ${scoreToFetch}`);
        // console.log(data); // Optional: Log the response data for debugging
      } else {
        // Error handling
        // alert(data.message || `Error submitting ${subject_id[index]} with score: ${scoreToFetch}`);
      }
    } catch (error) {
      // alert(error);
      // alert(`Error submitting ${subject_id[index]} with score: ${scoreToFetch}`);
    }
  };  

  return (
    <div >
      <h1>Enter Subject Scores</h1>
      {Object.keys(scores).map((subject, index) => (
        <div className="flex flex-col space-y-3 ml-8">
          <div className="flex flex-col space-y-1 0" key={index}>
            <h1 className="pt-3 w-[calc(100%/2)]">
              {subjectName[index]}:
            </h1>
            <div className="flex space-x-7">
              <input className=" text-cyan-600 rounded-lg w-[calc(100%/2)]"
                // placeholder={subject_id[index]}
                type="number"
                // name={subject_id[index]}
                // value={index}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                min="0"
                max="100"
                step=".01"
              />
              <button className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                onClick={() => handleSubmit(index)}
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {'Save'}
                </div>
              </button>
            </div>
          </div>
        </div >
      ))
      }
    </div>
  );
}
