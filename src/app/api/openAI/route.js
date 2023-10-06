import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const data = await request.json();
  //   console.log(`got a request: ${JSON.stringify(data, null, 4)}`);
  const prompt = `Here is some context for the upcoming requests: The Learning Lab (LL) is a place where students called LLUF or LLUFs for plural work in different labs. This is the lab description that the students get: “Labs are where we LEARN! where we build our skills and develop new ways of communicating our ideas in the wide array of forms at the LL! Our hope is that Labs will allow you to better connect with the work and mission of the Learning Lab by building teams and fostering an even more fun and close community here. Each lab is supported by a returning Media and Design Fellow and an LL Staff.” These are the available Labs: “avLab (audio visual lab) led by Elitza + Casey. codeLab (next.js, slack apps, web development, app design) led by Anna + Christine. graphicsLab (graphic design, posters, presentation visuals) led by Emily + Jordan. realityLab (3D modeling and game design) led by Sophie + Chris. eventLab (live event design, studio infrastructure, backstage crew) led by Siriana + Marlon.” Users will be given binary choices to chose from the following list: ${data.availableOptions}. The users will choose one element from each list as their preference. Use the chosen options, and based on the stereotypes that you can form from each lab, categorize the student into one of the five labs. Student response:${data.selectedPrompt}. Return a response containing the your chosen lab and a short description on why you decided to categorize the student into that specific lab. Remember to use the stereotypes that you construct on the people from each lab.`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content: prompt,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  //   console.log("Open AI response:", response);
  //   console.log("Open AI data:", response.choices[0].message);
  return NextResponse.json({
    result: response.choices[0].message.content,
  });
}
