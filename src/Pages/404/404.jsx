import styles from "./404.module.css";
function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Page Not Found!</p>
    </div>
  )
}

export default NotFound