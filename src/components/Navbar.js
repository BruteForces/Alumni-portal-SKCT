import React, { useState, useEffect } from 'react'
import { ReactComponent as SKIicon } from "../assets/SKI.svg";
import { ReactComponent as SKCTicon } from "../assets/SKCT.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Navbar.module.css";
import { Link } from 'react-router-dom';
import { useWindowScrollPositions } from './useWindowScrollPositions';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const Navbar = () => {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [menuActive, setMenuActive] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  if (useWindowScrollPositions().scrollY > 40 && !isScrolled) {
    setIsScrolled(true);
  }
  if (useWindowScrollPositions().scrollY < 40 && isScrolled) {
    setIsScrolled(false);
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className={`${styles.navbar} ${!menuActive && styles.background_blur} ${isScrolled && styles.scrolled}`}>
      {windowDimensions.width > 790 &&
        <div className={`${styles.navLink}`} >
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
        </div>
      }

      {windowDimensions.width > 790 ?
        <div className={styles["navbar-brand"]}>
          <div className={styles["navbar-logo"]}>
            <img src={require("../assets/Logo1.png")} alt="SKI logo" />

          </div>
          <div className={styles["titleText"]}>
            <h1>SRI KRISHNA COLLEGE OF TECHNOLOGY</h1>
            <h3>AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE</h3>
          </div>
          <div className={styles["navbar-logo"]}>
            <img src={require("../assets/Logo2.png")} alt="SKCT logo" />
          </div>
        </div> :
        <div className={styles["navbar-brand"]}>

          {windowDimensions.width > 350 &&
            <div className={styles["navbar-logo"]}>
              <img src={require("../assets/Logo2.png")} alt="SKCT logo" />
              <hr />
            </div>
          }
          <div className={styles["titleText"]}>
            <p>SKCT</p>
          </div>
        </div>
      }
      {windowDimensions.width > 790 ?
        <div className={`${styles.navLink} ${styles.right}`}>
          <Link to="/alumini-forum">Alumini Forum</Link>
          <Link to="/office-bearers">Office Bearers</Link>
        </div> :
        <div className={`${styles.dropdown} }`}>
          {!menuActive &&
            <MenuIcon className={styles["dropdown-btn"]} onClick={() => { setMenuActive(true) }} />
          }
          {menuActive &&
            <div className={`${styles.dropdownContainer} ${menuActive && styles.background_blur}`} >
              <CloseIcon className={styles["dropdown-close"]} onClick={() => { setMenuActive(false) }} />
              <div className={`${styles.navLink}`} >
                <Link onClick={() => setMenuActive(false)} to="/">Home</Link>
                <Link onClick={() => setMenuActive(false)} to="/gallery">Gallery</Link>
                <Link onClick={() => setMenuActive(false)} to="/events">Events</Link>
                <Link onClick={() => setMenuActive(false)} to="/alumini-forum">Alumini Forum</Link>
                <Link onClick={() => setMenuActive(false)} to="/office-bearers">Office Bearers</Link>
              </div>
            </div>
          }
        </div>
      }

    </div >
  )
}

export default Navbar;