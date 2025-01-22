import React from "react";
import styles from "../../css/componantUser/SpinnerFull.module.css";
export default function SpinnerFull() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
