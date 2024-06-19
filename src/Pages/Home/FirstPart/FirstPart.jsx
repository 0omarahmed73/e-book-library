import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./FirstPart.module.css";

function FirstPart({ books }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  // Initialize with default state or empty values to avoid initial rendering errors
  const [firstThreeBooks, setFirstThreeBooks] = useState([
    {
      author: "Author",
      title: "Title",
      description: "Description",
      image: "https://via.placeholder.com/150", // Placeholder image URL
      selected: true,
    },
    {
      author: "Author",
      title: "Title",
      description: "Description",
      image: "https://via.placeholder.com/150",
      selected: false,
    },
    {
      author: "Author",
      title: "Title",
      description: "Description",
      image: "https://via.placeholder.com/150",
      selected: false,
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(firstThreeBooks[0]);

  // Update state when `books` prop changes (when data is fetched)
  useEffect(() => {
    if (books && books.length > 0) {
      setFirstThreeBooks([books[0], books[1], books[2]]);
      setSelectedBook(books[0]);
    }
  }, [books]);

  return (
    <div className={styles.container}>
      <Container className={styles.innerContainer}>
        <Row className="justify-content-between gap-5 w-100">
          <Col>
            <h1>{selectedBook.title}</h1>
            <div className="w-100">
              <p className={`${styles.author} text-end`}>
                by {selectedBook.author}
              </p>
            </div>
            <p
              ref={ref}
              className={`${styles.yourElement} ${
                isIntersecting ? styles.visible : ""
              }`}
            >
              {selectedBook.description}
            </p>
          </Col>
          <Col className="d-flex flex-column gap-3 justify-content-center align-items-center">
            <Row>
              <div className={styles.imgContainer}>
                <img src={selectedBook.image} alt="" />
              </div>
            </Row>
            <Row>
              <div className={styles.imgsList}>
                {firstThreeBooks.map((book, index) => (
                  <div
                    key={index}
                    className={styles.imgsList}
                    onClick={() => {
                      setSelectedBook(book);
                      // Update selected state immutably
                      const updatedBooks = firstThreeBooks.map((b, i) => ({
                        ...b,
                        selected: i === index,
                      }));
                      setFirstThreeBooks(updatedBooks);
                    }}
                  >
                    <div className={styles.imgContainer1}>
                      <img
                        src={book.image}
                        alt=""
                        style={{ opacity: book.selected ? 1 : 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FirstPart;
