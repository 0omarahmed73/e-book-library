import React from "react";
import { Col } from "react-bootstrap";
import styles from "./BookCard.module.css";
import { IoStarSharp } from "react-icons/io5";

function BookCard({ book, stars }) {
  // Provide default values to prevent errors
  const {
    image = "default-image-url.jpg",
    title = "No Title Available",
    author = "Unknown Author",
  } = book || {};

  return (
    <Col lg={3} md={5} className={`${styles.bookCard}`}>
      <div className={styles.img}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.nextPart}>
        <div className={styles.stars}>
          {Array.from({ length: stars }).map((star, index) => (
            <IoStarSharp key={index} color="var(--secondary)" />
          ))}
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>{author}</p>
        </div>
      </div>
    </Col>
  );
}

export default BookCard;
