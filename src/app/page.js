import Link from "next/link";

export default function Page() {
  // console.log(process.env.AIRTABLE_BASE_ID);

  return (
    <body>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/quiz">QUIZ</Link>
    </body>
  );
}
