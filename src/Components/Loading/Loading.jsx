import styles from "./Loading.module.css";

function Loading({...props}) {
  return (
    <div className={styles.loading} {...props}>
      <div className="loader"></div>
    </div>
  )
}

export default Loading