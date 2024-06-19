import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../../assets/logo-yh4yOaug.png";
import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Classic } from "@theme-toggles/react";
import { FaCircle, FaMoon, FaSun } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { BooksContext } from "../../Contexts/BookContext";
function NavBar() {
  const { userLogged , logout } = useContext(BooksContext);

  const [themeLocal, saveTheme] = useLocalStorage("theme", "light");
  const handleThemeToggle = () => {
    saveTheme((d) => (d === "light" ? "dark" : "light"));
  };
  const navigate = useNavigate();
  return (
    <Navbar
      className="py-3"
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant={themeLocal}
    >
      <Container className="px-4">
        <NavLink
          to="/"
          className={`${styles.navbarBrand} d-flex flex-row justify-content-center align-items-center gap-2`}
        >
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <h1>E-Book</h1>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto justify-content-center align-items-center ">
            <div
              onClick={handleThemeToggle}
              className={`${styles.iconBorder} me-2 ${
                themeLocal === "light"
                  ? styles.iconBorder_light
                  : styles.iconBorder_dark
              }`}
            >
              <div className={styles.allIcons}>
                <FaSun
                  color="white"
                  className={`${styles.toggleTheem}`}
                  size={12}
                />
                <FaMoon
                  color="white"
                  className={`${styles.toggleTheem}`}
                  size={12}
                />
              </div>
              <div
                className={`${styles.iconsBG} ${
                  themeLocal === "light"
                    ? styles.iconsBG_light
                    : styles.iconsBG_dark
                }`}
              />
            </div>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
            <NavLink to="/categories" className="nav-link">
              Categories
            </NavLink>
            {userLogged ? (
              <NavDropdown
                title={userLogged}
                className={styles.dropDown}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={() => navigate('/cart')} >Cart</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/favorite')}>
                  Favorites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
