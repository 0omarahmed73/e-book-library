import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import styles from "./BookItem.module.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { BooksContext } from "../../Contexts/BookContext";
function BookItem({ item }) {
  const {
    addToCart,
    userLogged,
    addFavoriteItem,
    favoriteItems,
    setupFavoritesListener,
  } = useContext(BooksContext);
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userLogged) {
      setupFavoritesListener();
    }
  }, [userLogged]);
  const handleSubmit = (e, item) => {
    e.preventDefault();
    addToCart({ item, quantity });
    handleClose();
  };
  return (
    <Col
      key={item.id}
      lg={3}
      className="searchItem"
      styles={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className={styles.img}>
        <img src={item.image} alt={item.title} />
      </div>
      <div>
        <h2>{item.title}</h2>
        <p>Author: {item.author}</p>
        <div className={styles.icons}>
          <div
            onClick={() => addFavoriteItem({ item })}
            className={`${styles.icon} ${
              !userLogged ||
              favoriteItems.find(
                (i) => i.id === item.id && i.user === userLogged
              )
                ? styles.disabled
                : ""
            }`}
          >
            <FaHeart />
          </div>
          <div
            onClick={handleShow}
            className={`${styles.icon} ${userLogged ? "" : styles.disabled}`}
          >
            <FaShoppingCart />
          </div>
        </div>
        <Modal show={show} centered={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.modalBody}>
              <div>
                <h2>{item.title}</h2>
                <p>Author: {item.author}</p>
                <div className="d-flex flex-column gap-2 flex-md-row">
                  <Form
                    onSubmit={(e) => handleSubmit(e, item)}
                    className={styles.form}
                  >
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!userLogged || quantity < 1}
              className="btn-main"
              onClick={() => {
                addToCart({ item, quantity });
                handleClose();
              }}
            >
              Add to Cart
            </Button>
            <Button className="btn-main" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>{" "}
    </Col>
  );
}

export default BookItem;
