import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Gallery.module.css";
const Gallery = () => {
  document.title="Alumni Portal | Gallery";
  const navigate = useNavigate();

  const [itemSwitch, setItemSwitch] = useState({
    itemActive: 0,
    itemLeft: -1,
    itemRight: 1,
  });

  const handleClick = (id) => {
    if (itemSwitch.itemActive === 0 && id === 0) {
      navigate("all-photos");
    } else if (itemSwitch.itemActive === -1 && id === -1) {
      navigate("alumni-meet");
    } else if (itemSwitch.itemActive === 1 && id === 1) {
      navigate("seminar-sessions");
    } else {
      setItemSwitch({
        itemActive: id,
        itemLeft: id === -1 ? 1 : id - 1,
        itemRight: id === 1 ? -1 : id + 1,
      });
    }
  };
  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <h1>Gallery</h1>
      </div>
      <div className={styles.gallery_items_container}>
        <div
          className={`${styles.gallery_item} ${(itemSwitch.itemLeft == -1 && styles.item_left) ||
            (itemSwitch.itemRight == -1 && styles.item_right) ||
            (itemSwitch.itemActive === -1 && styles.item_active)
            }`}
          onClick={() => handleClick(-1)}
        >
          <div className={styles.container}>
            <img src="/images/alumni-cover.jpg" alt="gallery" />
            <h2>
              ALUMNI <span>MEET</span>
            </h2>
          </div>
        </div>

        <div
          className={`${styles.gallery_item} ${(itemSwitch.itemLeft == 0 && styles.item_left) ||
            (itemSwitch.itemRight == 0 && styles.item_right) ||
            (itemSwitch.itemActive === 0 && styles.item_active)
            }`}
          onClick={() => handleClick(0)}
        >
          <div className={styles.container}>
            <img src="/images/all-photos.jpg" alt="gallery" />
            <h2>
              <span>ALL</span> PHOTOS
            </h2>
          </div>
        </div>

        <div
          className={`${styles.gallery_item} ${(itemSwitch.itemLeft == 1 && styles.item_left) ||
            (itemSwitch.itemRight == 1 && styles.item_right) ||
            (itemSwitch.itemActive === 1 && styles.item_active)
            }`}
          onClick={() => handleClick(1)}
        >
          <div className={styles.container}>
            <img src="/images/seminar-cover.jpg" alt="gallery" />
            <h2>
              <span>SEMINAR</span> SESSIONS
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
