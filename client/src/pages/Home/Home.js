import React, { useState } from "react";
import Testimonial from "components/HomeComponents/Testimonial";
import Carousel from "components/UI/Carousel";
import styles from "./Home.module.css";
import NewTestimonialCard from "components/HomeComponents/NewTestimonialCard";

const Home = () => {
  const [newTestimonialActive, setNewTestimonialActive] = useState(false);
  //testData:
  const testData = [
    {
      quotes: "“Hi, This is Ben i am working at Jakash corporation”",
      imgSrc: "https://via.placeholder.com/150",
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    {
      quotes: "“Choosing Sri Krishna College of Technology to pursue B.Tech IT was one of the best decisions in my life.”",
      imgSrc: "https://via.placeholder.com/200",
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    {
      quotes: "I am a test quote3",
      imgSrc: "https://via.placeholder.com/150",
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    {
      quotes: "I am a test quote4",
      imgSrc: "https://via.placeholder.com/150",
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    }

  ]

  return (
    <div className={`${styles.Body} `}>
      <div className={styles["Content-Container"]}>
        <div id={styles["Welcome"]}>
          <div className={`${styles.Container}`}>
            <h1>
              Welcome <span>Back</span>
            </h1>
            <p>
              I think the success of any school can be measured by the
              contribution the alumni make to our national life
            </p>
          </div>
        </div>

        <div id={styles["Testimonials"]}>
          <div className={`${styles.Container}`}>
            <Carousel data={testData} />
            <img src={require("assets/testimonial.png")} alt="testimonial-img" />
            <button className={`${styles.new_testimonial_btn} ${newTestimonialActive && styles.active}`} onClick={() => setNewTestimonialActive(!newTestimonialActive)}>
              New Testimonial <span>+</span>
            </button>

            <NewTestimonialCard active={newTestimonialActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;