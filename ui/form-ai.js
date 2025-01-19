import React, { useState, useEffect } from 'react';

const Form = () => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    // const fetchUniversities = async () => {
      //   try {
      //     const res = await fetch(`#/api/universities/universities.json`);
      //     const json = await res.json();
          // dispatch({ type: 'UPDATE_UNIVERSITIES', data: json });
      //   } catch (error) {
      //     console.error('Error while trying to fetch universities.', error);
      //   }
      // };
      // if (!loaded) {
      //   fetchUniversities();
      // }
    const fetchUniversities = async () => {
      try {
        await fetch('/universities.json')
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
      } catch (error) {
        console.error('Error while trying to fetch universities data.', error);
      }
    }
    fetchUniversities();
    
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
    setSelectedItem('');
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    setSelectedItem('');
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    // <form className="flex flex-col space-y-3"
    // onSubmit={() => console.log("Submitted")}>
    //   <span>มหาวิทยาลัย</span>
    //   <input className="space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800 text-pink-300 text-left"
    //     type="text" placeholder="" id="universitySelect" list="list-of-university" onChange={handleUniversityChange}/>
    
    // </form>
    <>
      <form className="flex flex-col space-y-3"
            onSubmit={() => console.log("Submitted")}>
        <h1>มหาวิทยาลัย</h1>

        {/* Category Dropdown */}
        <label>Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {Object.keys(data).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <>
            <label> Subcategory: </label>
            <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
              <option value="">Select a subcategory</option>
              {Object.keys(data[selectedCategory] || {}).map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Item Dropdown */}
        {selectedSubcategory && (
          <>
            <label> Item: </label>
            <select value={selectedItem} onChange={handleItemChange}>
              <option value="">Select an item</option>
              {(data[selectedCategory][selectedSubcategory] || []).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </>
        )}
      </form>
    </>
  );
};

export default Form;
