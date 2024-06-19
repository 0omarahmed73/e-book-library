import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import BookCard from "../../../Components/BookCard/BookCard";
import styles from "./NextPart.module.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { useWindowScroll } from "@uidotdev/usehooks";
import Sections from "../Sections/Sections";
import { Link } from "react-router-dom";
function NextPart({ books }) {
  const dimensions = useWindowSize();
  const scroll = useWindowScroll();

  return (
    <Sections
      title="Top Trending"
      h2="Best Books"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <Row
        className={`${styles.trendBookContainer} gap-3 w-100 ${
          (dimensions.width <= 800 && scroll[0].y >= 500.042724609375) ||
          (dimensions.width >= 800 && scroll[0].y >= 600.042724609375)
            ? styles.visible
            : ""
        }`}
      >
        <BookCard book={books[4]} stars={3} />
        <BookCard book={books[5]} stars={5} />
        <BookCard book={books[6]} stars={1} />
      </Row>

      <Link style={{all : 'unset !important'}} to="/categories">
        <Button className="btn-main">View All Books</Button>
      </Link>
    </Sections>
  );
}

export default NextPart;
