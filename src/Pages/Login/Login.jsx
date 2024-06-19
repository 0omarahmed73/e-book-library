import { Col } from "react-bootstrap";
import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import GoogleButton from "react-google-button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BooksContext } from "../../Contexts/BookContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginWithEmailAndPassword({ setLoading, ...values });
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    }),
  });
  const { loginWithGoogle, loginWithEmailAndPassword } =
    useContext(BooksContext);

  console.log(formik.touched);
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
      className={styles.login}
    >
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <Button
          onClick={loginWithGoogle}
          className={styles.login__googleButton}
        >
          <Col xs={1}>
            <FaGoogle />
          </Col>
          <Col xs={10}>
            <p>Sign in with Google</p>
          </Col>
        </Button>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            placeholder="Enter email"
            className={
              formik.errors.email && formik.touched.email ? "text-error" : ""
            }
          />
          <Form.Text className="text-danger">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""}{" "}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Password"
            className={
              formik.errors.password && formik.touched.password ? "text-error" : ""
            }
          />
          <Form.Text className="text-danger">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""}
          </Form.Text>
        </Form.Group>
        <Button
          disabled={loading || !formik.isValid || !formik.dirty}
          className="btn-main"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        <p className="m-0 p-0 mt-2">
          Don't have an account? <Link to="/sign-up">Register</Link>
        </p>
      </Form>
    </motion.div>
  );
}

export default Login;
