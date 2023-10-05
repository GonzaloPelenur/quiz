import {Button} from "@nextui-org/react";

export function Form(props) {
    // console.log(props);
    return(
        <div>
            <ul>
        {props.data.map((item, index) => (
          <li key={index}>
            <strong>One:</strong> {item.One} <strong>Two:</strong> {item.Two}
          </li>
        ))}
      </ul>
      <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      Button
    </Button>
        </div>
    );
}