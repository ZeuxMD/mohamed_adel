import styles from "./ShadowButton.module.css";

function ShadowButton({ handleClick, children }) {
  return (
    <button onClick={handleClick} className={styles.button}>
      {children}
    </button>
  );
}

export default ShadowButton;
