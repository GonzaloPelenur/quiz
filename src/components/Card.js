import styles from "../components/Card.module.css";
import { Button } from "@nextui-org/react";

const Card = ({ options, selectedOption, onSelect }) => {
  return (
    // <h1>hla</h1>
    <div style={{ textAlign: "center" }}>
      {Object.keys(options).map((key) => (
        <button
          key={options[key]}
          className={`${styles.Card} ${
            selectedOption === options[key] ? styles.selected : ""
          } ${styles.cardButton}`}
          onClick={() => onSelect(options[key])}
        >
          {options[key]}
        </button>
      ))}
    </div>
  );
};

export default Card;
