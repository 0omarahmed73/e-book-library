import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./Search.module.css";
import { useDebounce } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../Contexts/BookContext";
import Loading from "../../Components/Loading/Loading";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import BookItem from "../../Components/BookItem/BookItem";

function Search() {
  const { searchItems, error, setError, fetchSearchItems, setSearchItems } =
    useContext(BooksContext);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchItems({ query, setLoading });
    }
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    setSearchItems([]);
    setError(null);
  }, []);

  console.log(loading);
  console.log(searchItems);
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        bounce: 1,
        velocity: 0.5,
        stiffness: 260,
        damping: 30,
      }}
    >
      <Container className={styles.search}>
        <Form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            onChange={handleInputChange}
            className={styles.inputSearch}
            type="text"
            placeholder="Search for books"
          />
        </Form>

        {loading && !error ? (
          <Loading style={{ marginTop: "-50px" }} />
        ) : error ? (
          <div className={`errorContainer`}>
            <h1>{error}</h1>
            <Button
              variant="danger"
              onClick={() => fetchSearchItems({ setLoading, query })}
            >
              Try Again
            </Button>
          </div>
        ) : (
          !loading &&
          !error &&
          searchItems.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                bounce: 1,
                delay: 0.2,
                velocity: 0.5,
                stiffness: 260,
                damping: 30,
              }}
              className={styles.searchResult}
            >
              <h1>Search Result</h1>
              <Row className={styles.searchItems}>
                {searchItems.map((item) => (
                  <BookItem key={item.id} item={item} />
                ))}
              </Row>
            </motion.div>
          )
        )}
      </Container>
    </motion.div>
  );
}

export default Search;
