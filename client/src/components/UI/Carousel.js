import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import Testimonial from "components/HomeComponents/Testimonial";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Carousel = ({ data }) => {
  const [scrollPause, setScrollPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  let scrollInterval = null;
  const leftButtonHandler = () => {

  };

  const rightButtonHandler = () => {
  };

  const mouseEnterHandler = () => {
    setScrollPause(true);
  };
  const mouseLeaveHandler = () => {
    setScrollPause(false);
  };

  useEffect(() => {
    if (!scrollPause) {
      scrollInterval = setTimeout(() => {
        setActiveIndex((activeIndex + 1) % data.length);
      }, 5000);
      return () => clearTimeout(scrollInterval);
    }
  });

  return (
    <div className={styles["carousel"]}>
      <div className={styles["inner"]}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {data.map((item, index) => {
          return (
            <div className={styles.carousel_item} style={{ width: '100%' }} onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}>
              <Testimonial
                key={index}
                id={index}
                quotes={item.quotes}
                name={item.name}
                imgSrc={item.imgSrc}
              />
            </div>
          )
        }
        )}
      </div>
    </div >

  );
};

export default Carousel;