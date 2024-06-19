import { Col, Row } from "react-bootstrap";
import styles from "./Categories.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Categories() {
  const navigate = useNavigate();
  const categories = [
    "Electronics",
    "Mobiles",
    "Laptops",
    "Tablets",
    "Cameras",
    "Televisions",
    "Headphones",
    "Games",
    "Islam",
    "History",
    "Psychology",
    "Poetry",
    "Science",
    "Mathematics",
    "Programming",
  ];
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
           className={styles.categories}>
      <h1>Categories</h1>
      <Row className={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <Col
            onClick={() => navigate(`/categories/${category}`)}
            key={index}
            className={styles.category}
            md={5}
            lg={3}
            sm={5}
          >
            {category}
          </Col>
        ))}
      </Row>
    </motion.div>
  );
}

export default Categories;
