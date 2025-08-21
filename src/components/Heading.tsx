import styles from "../bubble.module.css";

const Heading = () => {
  return (
    <div>
      <BubbleText />
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center  text-9xl font-bold text-pink-300">
      {"Candy Crush".split("").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Heading;