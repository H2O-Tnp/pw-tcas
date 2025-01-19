import React, { useState } from "react";

import { universities } from "#/lib/university";
import { faculties } from "#/lib/university";

function Form() {
  const [{ university, faculty, field, program}, setData] = useState({
    university: "",
    faculty: "",
    field: "",
    program: "",
  });

  // const [faculties, setFaculties] = useState([]);
  // const [fields, setFields] = useState([]);
  // const [programs, setPrograms] = useState([]);


  function handleUniversityChange(event) {
    setData(data => ({ faculty: '', university: event.target.value }));
    // setFaculties(universitiesData?.find(item => item.name === event.target.value)?.faculties);
  }

  function handleFacultyChange(event) {
    setData(data => ({ ...data, faculty: event.target.value }));
    // setFields(faculties?.find(item => item.name === event.target.value)?.fields);
  }

  function handleFieldChange(event) {
    setData(data => ({ ...data, field: event.target.value }));
    // setPrograms(fields?.find(item => item.name === event.target.value)?.programs);
  }

  // function handleProgramChange(event) {
  //   setData(data => ({ ...data, program: event.target.value }));
  // }

  return (
    <form className="flex flex-col space-y-3"
    onSubmit={() => console.log("Submitted")}>
      <span>มหาวิทยาลัย</span>
      <input className="space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800 text-pink-300 text-left"
        type="text" placeholder="" id="universitySelect" list="list-of-university" onChange={handleUniversityChange}/>
      {/* <datalist id="list-of-university">
        {universities?.map((university) => (
          <option key={university} value={university}></option>
        ))}
      </datalist> */}

      <span>คณะ</span>
      <input className="space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800 text-pink-300 text-left"
        type="text" placeholder="" id="facultySelect" list="list-of-faculty" onChange={handleFacultyChange}/>
      <datalist id="list-of-faculty">
        {faculties?.map((faculty) => (
          <option key={faculty} value={faculty}></option>
        ))}
      </datalist>

      {/* <span>สาขา</span>
      <input className="space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800 text-pink-300 text-left"
        type="text" placeholder="" id="facultySelect" list="list-of-field" onChange={handleFieldChange}/>
      <datalist id="list-of-field">
        {fields?.map((field) => (
          <option key={field.name} value={field.name}></option>
        ))}
      </datalist>
      <input type="submit" /> */}
    </form>
  );
}

export default Form;