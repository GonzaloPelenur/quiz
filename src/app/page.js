import Link from "next/link";
import style from "../app/style/style.css";
export default function Page() {
  // console.log(process.env.AIRTABLE_BASE_ID);

  return (
    <body>
      <div className="test">
        <h1 className="text-3xl font-bold underline">
          Welcome to the Learning Lab placement Quiz!
        </h1>
        <h1 className="text-3l font-bold underline">
          Remember how in Harry Potter, the Sorting Hat would place students
          into each of the four houses? Well, this binary quiz uses AI to place
          you into one of the five Learning Lab houses!
        </h1>
        <Link href="/quiz">QUIZ</Link>
      </div>
    </body>
  );
}
