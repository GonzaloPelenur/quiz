"use client";

import React from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

const Page = () => {
  const [processedData, setProcessedData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleCardSelect = (questionId, option) => {
    setSelectedOptions((prevOptions) => [
      ...prevOptions.filter((item) => item.questionId !== questionId),
      { questionId, option },
    ]);
    console.log(`Selected option for question ${questionId}: ${option}`);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/airtable"); // Updated the API endpoint
        if (response.ok) {
          const data = await response.json();
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
      {processedData.map((options, index) => (
        <div key={index}>
          <Card
            options={options}
            selectedOption={
              selectedOptions.find((item) => item.questionId === index)
                ?.option || ""
            }
            onSelect={(option) => handleCardSelect(index, option)}
          />
        </div>
      ))}
    </div>
  );
};
export default Page;
