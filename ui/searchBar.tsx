"use client";
import { useState } from "react";

export function SearchBar({ onSelectStudent }: { onSelectStudent: (student: any) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/students/search?query=${query}`);
      const data = await response.json();
      setResults(data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between items-center ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a student"
        className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="flex self-start px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* {results.length > 0 && (
        <ul className="w-full max-w-md p-2 border rounded-lg">
          {results.map((student) => (
            <li
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {student.name}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
