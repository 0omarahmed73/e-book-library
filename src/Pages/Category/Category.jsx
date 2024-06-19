import { useParams } from "react-router-dom";
import styles from "./Category.module.css";
import { Button, Row } from "react-bootstrap";
import BookItem from "../../Components/BookItem/BookItem";
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../Contexts/BookContext";
import Loading from "../../Components/Loading/Loading";

function Category() {
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const { categoriesBook, error, fetchCategoriesBooks } =
    useContext(BooksContext);

  useEffect(() => {
    fetchCategoriesBooks({ category, setLoading });
  }, []);
  return loading ? (
    <Loading />
  ) : error ? (
    <div className={`errorContainer`}>
      <h1>{error}</h1>
    </div>
  ) : (
    <div className={styles.category}>
      <h1>{category}</h1>
      <Row className={styles.allItems}>
        {categoriesBook.map((item, index) => (
          <BookItem item={item} key={index} />
        ))}
      </Row>
    </div>
  );
}

export default Category;
