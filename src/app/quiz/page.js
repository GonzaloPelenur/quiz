"use client";

import React from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import "../style/style.css";

const Page = () => {
  const [processedData, setProcessedData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [generatedText, setGeneratedText] = useState([`""`]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const handleCardSelect = (questionId, option) => {
    setSelectedOptions((prevOptions) => [
      ...prevOptions.filter((item) => item.questionId !== questionId),
      { questionId, option },
    ]);
  };

  const handleSubmit = async () => {
    const optionsList = selectedOptions.map((item) => item.option);
    if (optionsList.length !== processedData.length) {
      console.error("Empty or invalid prompt");
      return;
    }
    const selectedPrompt = JSON.stringify(optionsList);
    const availableOptions = JSON.stringify(
      processedData.map((item) => [item.One, item.Two])
    );
    try {
      const response = await fetch("api/openAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedPrompt, availableOptions }),
      });

      if (response.ok) {
        const data = await response.json();
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
        const response = await fetch("/api/airtable");
        if (response.ok) {
          const data = await response.json();
          setProcessedData(data.result.airtableData);
          setIsLoading(false); // Set isLoading to false when data is fetched
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    // Display loading indicator if isLoading is true
    return (
      <div className="loaderContainer">
        <p className="paragraph">Loading Quiz!</p>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">Choose your preferences!</h1>
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
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="paragraph">
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default Page;
