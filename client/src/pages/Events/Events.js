import React, { useEffect, useState } from "react";
import EventCard from "components/EventComponents/EventCard";
import AddEventCard from "components/EventComponents/AddEventCard";
import styles from "./Events.module.css";
import useGetEvents from "hooks/useGetEvents";
import Loader from "components/UI/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext } from "context/auth/authContext";

const Events = () => {
  document.title="Alumni Portal | Event";
  const [isCardActive, setIsCardActive] = useState(false);
  const { isLoading, events, error, setTrigger } = useGetEvents();
  const { user } = useAuthContext();

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <div
      className={styles["event_page"]}
      onClick={() => isCardActive && setIsCardActive(false)}
    >
      <div className={styles["event_body"]}>
        <div className={styles["event_page_content"]}>
          <div className={styles["header"]}>
            <h2>
              <span>U</span>PCOMING <span>E</span>VENTS
            </h2>
            {user?.token && (
              <div
                className={styles.add_event_button}
                onClick={() => setIsCardActive(!isCardActive)}
              >
                <p>Add Event</p>
                <div
                  className={`${styles.add_event_icon} ${
                    isCardActive && styles.active
                  }`}
                >
                  <AiOutlinePlus />
                </div>
              </div>
            )}
            {isCardActive && <AddEventCard onNewItemAdd={setTrigger} />}
          </div>
          <div className={styles["events"]}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles["child"]}>
                {events.map((event, index) => (
                  <EventCard
                    isAdmin={user?.isAdmin}
                    isActive={index === 0 ? true : false}
                    isCardActive={isCardActive}
                    event={event}
                    trigger={setTrigger}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
