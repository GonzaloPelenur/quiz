import Link from "next/link";
import "../app/style/style.css";
export default function Page() {
  // console.log(process.env.AIRTABLE_BASE_ID);

  return (
    <body className="container">
      {/* <div className="test"> */}
      <h1 className="title">Welcome to the Learning Lab placement Quiz!</h1>
      <p className="paragraph">
        Remember how in Harry Potter, the Sorting Hat would place students into
        each of the four houses? Well, this binary quiz uses AI to place you
        into one of the five Learning Lab houses!
      </p>

      {/* <div className="button"> */}
      <Link className="button" href="/quiz">
        QUIZ
      </Link>
      {/* </div> */}
      {/* </div> */}
    </body>
  );
}
