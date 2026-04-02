import styles from "./ShadowButton.module.css";

function ShadowButton({
  children,
  className = "",
  disabled = false,
  handleClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.button} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default ShadowButton;
