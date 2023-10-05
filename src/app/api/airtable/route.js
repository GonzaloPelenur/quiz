import { NextResponse } from "next/server";
import Airtable from "airtable";

const fetchAirtableData = async () => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  const records = await base("Questions").select({ view: "MAIN" }).all();
  // console.log(JSON.stringify(records, null, 4))
  const fields = records
    .filter((item) => Object.keys(item.fields).length !== 0) // exclude items where fields is empty
    .map((item) => item.fields);
  // console.log(fields)

  return {
    airtableData: JSON.parse(JSON.stringify(fields)),
  };
};

export async function GET(request) {
  try {
    const airtableData = await fetchAirtableData(); // Simplified call
    return NextResponse.json({ result: airtableData });
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return NextResponse.error(new Error("Failed to fetch Airtable data"));
  }
}

// export async function POST(request) {
//   try {
//     const { responses } = await request.json(); // Extract user responses

//     const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
//       process.env.AIRTABLE_BASE_ID
//     );
//     for (const response of responses) {
//       // Modify this logic based on how you want to save data in Airtable
//       await base("One").update([
//         {
//           id: response.questionId,
//           fields: {
//             UserResponse: response.option,
//           },
//         },
//       ]);
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error sending data to Airtable:", error);
//     return NextResponse.error(new Error("Failed to send data to Airtable"));
//   }
// }
