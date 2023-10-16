"use client";

import React from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import "../style/style.css";

const Page = () => {
  const [processedData, setProcessedData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [generatedText, setGeneratedText] = useState([
    `Based on the student's choices, I would categorize them into the codeLab. Here's why: The student's preference for Yoga and Sneakers suggests a preference for a relaxed and casual environment. Choosing Techno over Jazz indicates a preference for modern and cutting-edge technology. Selecting Board Games over Video Games suggests a preference for problem-solving and strategizing. The preference for Comic Books and Documentary shows an interest in storytelling and knowledge. The love for Ice Cream and City Trips suggests a fun and adventurous personality. Choosing Sketching over Coding Puzzles indicates a strong creative and artistic inclination. The preference for Energy Drink suggests a high energy level and enthusiasm. The student's selection of an Analog Watch and Vintage over Smartwatch and Futuristic indicates a preference for classic and traditional styles. Choosing Acoustic over Electronic suggests a preference for more traditional and organic sounds. The love for the Library and Handwritten Letters shows a fondness for literature and a desire for a more personalized approach. The preference for a Campfire over a Lounge Bar suggests a preference for a cozy and intimate setting. The student's choice of a Notebook over a Tablet indicates a preference for more traditional and tactile methods. Selecting a Concert over a Podcast suggests a preference for live experiences and a love for music.`,
  ]);
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
    <body className="container">
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
      <div class="typewriter monospace">
        <p>{generatedText}</p>
      </div>
    </body>
  );
};

export default Page;
