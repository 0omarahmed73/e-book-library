import styles from "./Cart.module.css";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../Contexts/BookContext";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
function Cart() {
  const { cartItems, userLogged, removeItemsFromCart } =
    useContext(BooksContext);
  const [cartFiltered, setCartFiltered] = useState(() =>
    cartItems.filter((item) => item.user === userLogged)
  );
  const [show, setShow] = useState(false);
  const [selectedItem, setItem] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setCartFiltered(cartItems.filter((item) => item.user === userLogged));
  }, [cartItems, userLogged]);
  console.log(selectedItem);
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
      className={styles.cart}
    >
      <h1>Cart</h1>
      <Container>
        <Row className={styles.cartItems}>
          {cartFiltered.length > 0 ? (
            cartFiltered.map((item) => (
              <Col lg={3} key={item.id} className={styles.cartItem}>
                <div className={styles.cartImage}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>Author: {item.author}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0 p-0">Quantity: {item.quantity}</p>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setItem(item);
                        handleShow();
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <h2>No items in cart</h2>
          )}
        </Row>
      </Container>
      <Modal show={show} centered={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item from Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item from cart?</p>
          <div className="d-flex justify-content-end align-items-stretch gap-2">
            <Button
              variant="danger"
              onClick={() => {
                removeItemsFromCart({ item: selectedItem });
                handleClose();
              }}
            >
              Delete
            </Button>
            <Button className="btn-main" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </motion.div>
  );
}

export default Cart;
