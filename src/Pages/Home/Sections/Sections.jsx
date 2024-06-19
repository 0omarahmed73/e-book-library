import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Sections.module.css";
function Sections({title , h2 , p , children}) {
  return (
    <div className={styles.nextSection}>
      <Container className="d-flex justify-content-center align-items-center pt-4 flex-column">
        <p className={styles.topTrend} style={{ all: "unset" }}>
          {title}
        </p>
        <h2>{h2}</h2>
        <p className={styles.desc}>
          {p}
        </p>
        {children}
      </Container>
    </div>
  );
}

export default Sections;
