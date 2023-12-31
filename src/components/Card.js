import styles from "../components/Card.module.css";

const Card = ({ options, selectedOption, onSelect }) => {
  return (
    // <h1>hla</h1>
    <div style={{ textAlign: "center" }}>
      {Object.keys(options).map((key) => (
        <button
          key={options[key]}
          className={`${styles.card} ${
            selectedOption === options[key] ? styles.selected : ""
          } ${styles.cardButton}`}
          // className={styles.card}
          onClick={() => onSelect(options[key])}
        >
          {options[key]}
        </button>
      ))}
    </div>
  );
};

export default Card;
