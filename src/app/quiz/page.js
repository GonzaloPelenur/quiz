"use client";

import React from "react";
import { useEffect, useState } from "react";

const Page = () => {
  const [processedData, setProcessedData] = useState([]);
  useEffect(() => {
    console.log("HOLA");
    async function fetchData() {
      try {
        const response = await fetch("/api/airtable"); // Updated the API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProcessedData(data.result.airtableData);
          // setProcessedData(data.result); // Access the data using the 'result' key
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {/* Use the fetched data */}
      <h1>Will put smth here</h1>
      {/* <Form data={data} /> */}
      <ul>
        {processedData.map((item, index) => (
          <li key={index}>
            <div className="inline-flex">
              <button className="bg-blue-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                {item.One}
              </button>
              <button className="bg-blue-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                {item.Two}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Page;
