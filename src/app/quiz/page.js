"use client";

import React from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

const Page = () => {
  const [processedData, setProcessedData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [generatedText, setGeneratedText] = useState([`""`]);
  const handleCardSelect = (questionId, option) => {
    setSelectedOptions((prevOptions) => [
      ...prevOptions.filter((item) => item.questionId !== questionId),
      { questionId, option },
    ]);
    // console.log(`Selected option for question ${questionId}: ${option}`);
  };

  const handleSubmit = async () => {
    // const prompt = selectedOptions.map((opt) => opt.option).join(" ");
    const optionsList = selectedOptions.map((item) => item.option);
    if (optionsList.length !== processedData.length) {
      console.error("Empty or invalid prompt");
      return;
    }
    const selectedPrompt = JSON.stringify(optionsList);
    const availableOptions = JSON.stringify(
      processedData.map((item) => [item.One, item.Two])
    );
    // console.log(availableOptions);
    // console.log(selectedPrompt);
    // console.log("Prompt:", prompt);
    try {
      const response = await fetch("api/openAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedPrompt, availableOptions }), // This sends the prompt to the server
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Recieved data:", data);
        setGeneratedText(data.result);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      <h1>Use this AI embeded Quiz to chose a Lab!</h1>
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
      <div style={{ textAlign: "center" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};
export default Page;
