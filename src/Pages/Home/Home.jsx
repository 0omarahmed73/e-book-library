import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import FirstPart from "./FirstPart/FirstPart";
import { BooksContext } from "../../Contexts/BookContext";
import NextPart from "./NextPart/NextPart";
import Sections from "./Sections/Sections";
import { Button, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useWindowScroll } from "@uidotdev/usehooks";
import Loading from "../../Components/Loading/Loading";

function Home() {
  const dimensions = useWindowSize();
  const scroll = useWindowScroll();

  const { topBooks, fetchTopBooks, error } = useContext(BooksContext);
  const [loading, setLoading] = useState(false);
  console.log(error, loading);

  const [comments, setComments] = useState([
    {
      img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
      name: "Omar Ahmed",
    },
    {
      img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
      name: "Mohamed Ashraf",
    },
    {
      img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
      name: "Amr Mohamed",
    },
  ]);
  useEffect(() => {
    fetchTopBooks({ setLoading });
  }, []);
  console.log(comments)
  return (
    <div>
      {loading && !error ? (
        <Loading />
      ) : error ? (
        <div className={`errorContainer`}>
          <h1>{error}</h1>
          <Button
            variant="danger"
            onClick={() => fetchTopBooks({ setLoading })}
          >
            Try Again
          </Button>
        </div>
      ) : (
        !loading &&
        !error && (
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
          >
            <FirstPart books={topBooks} />
            <NextPart books={topBooks} />
            <Sections
              title="What our customer says"
              h2="Testimonials"
              p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Row
                className={`${styles.trendBookContainer} ${
                  (dimensions.width <= 800 && scroll[0].y >= 1800) ||
                  (dimensions.width > 800 && scroll[0].y >= 1000)
                    ? styles.visible
                    : ""
                }`}
              >
                {comments.map((item) => (
                  <Col
                    key={crypto.randomUUID()}
                    lg={5}
                    className={styles.comment}
                  >
                    <div className={styles.img}>
                      <img src={item.img} alt="Customer" />
                    </div>
                    <p>{item.comment}</p>
                    <h2>{item.name}</h2>
                  </Col>
                ))}
              </Row>
              <Button
                disabled={comments.length >= 4}
                className="btn-main"
                onClick={() =>
                  setComments([
                    ...comments,
                    
                      {
                        img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
                        comment:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
                        name: "Yousef Ahmed",
                      },
                      {
                        img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
                        comment:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
                        name: "Yehia Ahmed",
                      },
                      {
                        img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
                        comment:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
                        name: "Omar Ahmed",
                      },
                      {
                        img: "https://images.squarespace-cdn.com/content/v1/640a435dc1ab841ca153fb90/1686847303601-YKDW4DBZT0QVSNOIT5KW/unnamed+%282%29.jpg",
                        comment:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus asperiores totam illo aliquid! Officiis qui itaque fugiat nobis veritatis at voluptas. Illo voluptatem perferendis beatae sunt cumque tempore distinctio blanditiis.",
                        name: "Omar Ahmed",
                      },
                    ],
                  )
                }
              >
                Show More
              </Button>
            </Sections>
          </motion.div>
        )
      )}
    </div>
  );
}

export default Home;
