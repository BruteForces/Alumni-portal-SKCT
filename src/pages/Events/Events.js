import React, { useEffect, useRef, useState } from "react";
import EventCard from "components/EventComponents/EventCard";
import styles from "./Events.module.css";

const Events = () => {
  const [isActive, setIsActive] = useState(false);
  const eventsRef = useRef(null);

  useEffect(() => {
    const scrollWidth = eventsRef.current.scrollWidth;
    const interval = setInterval(() => {
      if (eventsRef.current.scrollLeft !== scrollWidth) {
        eventsRef.current.scrollTo(eventsRef.current.scrollLeft + 1, 0);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles["event_page"]}>
      <div className={styles["event_body"]}>
        <div className={styles["event_page_content"]}>
          <div className={styles["title"]}>
            <p>
              <span>U</span>PCOMING <span>E</span>VENTS
            </p>
          </div>
          <div ref={eventsRef} className={styles["events"]}>
            {[...Array(10).keys()].map((event, idx) => (
              <EventCard
                id={event}
                active={idx === 0}
                // scrollSnap={idx % 3 === 0}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Events;
