import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./DefaultLayout.module.css";
import NavBar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { BooksContext } from "../Contexts/BookContext";
import useLocalStorage from "use-local-storage";
import Loading from "../Components/Loading/Loading";
import image from "../assets/logo-yh4yOaug.png";
function DefaultLayout() {
  const [themeLocal, saveTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", themeLocal);
  }, [themeLocal]);

  const moonLanding = new Date();
  const { userLogged } = useContext(BooksContext);
  return userLogged === null ? (
    <div className={styles.splash}>
      <div className={styles.imgLogo}>
        <img src={image} alt="" />
      </div>
      <h1>My best friend is a book</h1>
    </div>
  ) : (
    <div className={`${styles.containerDefault}`}>
      <NavBar />
      <motion.div
        className={styles.container}
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
      >
        <Outlet />
      </motion.div>
      <footer className={styles.footer}>
        <p style={{ all: "unset", textAlign: "center" }}>
          © {moonLanding.getFullYear()} All Copyrights Reserved For Omar Ahmed
        </p>
      </footer>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default DefaultLayout;
