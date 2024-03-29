import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useWindowScrollPositions } from "hooks/useWindowScrollPositions";
import {
  IoIosNotificationsOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "context/auth/authContext";
import { getAlumni } from "context/alumni/actions";
import { useAlumniDispatchContext } from "context/alumni/alumniContext";
import NotificationPanel from "components/NotificationComponents/NotificationPanel";
import ProfileModal from "components/ForumComponents/ProfileModal";
import useFetchNotification from "hooks/useFetchNotification";
import { AiOutlineMenu } from "react-icons/ai";
import { useMessageContext } from "context/messageContext/messageContext";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Navbar = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [isMessagesActive, setIsMessagesActive] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { messageStatus, closeMessageModal, openMessageModal } =
    useMessageContext();
  const { user } = useAuthContext();
  const {
    isLoading: isNotificationsLoading,
    error: isErrorOnNotification,
    notifications,
  } = useFetchNotification();

  const [showProfile, setShowProfile] = useState(false);

  const alumniDispatch = useAlumniDispatchContext();

  if (useWindowScrollPositions().scrollY > 30 && !isScrolled) {
    setIsScrolled(true);
  }

  if (useWindowScrollPositions().scrollY < 30 && isScrolled) {
    setIsScrolled(false);
  }

  useEffect(() => {
    const fetchAlumni = async () => {
      if (user?.alumni) await getAlumni(alumniDispatch, { user: user?._id });
    };

    fetchAlumni();
  }, [user, alumniDispatch]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowNotificationBadge(notifications?.length === 0 ? false : true);
  }, [notifications]);

  return (
    <>
      {showProfile && (
        <ProfileModal
          userId={user?._id}
          handleClose={() => {
            setShowProfile((prev) => !prev);
          }}
        />
      )}

      <div className={styles.container}>
        <div
          className={`${styles.navbar} ${styles.background_blur} ${
            isScrolled && styles.scrolled
          }`}
        >
          {windowDimensions.width > 790 && (
            <div className={`${styles.navLink}`}>
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/events">Events</Link>
              {user?.token && <Link to="/alumni">Alumni</Link>}
            </div>
          )}
          {windowDimensions.width > 790 ? (
            <div className={styles["navbar-brand"]}>
              <div className={styles["navbar-logo"]}>
                <img src={require("assets/Logo1.png")} alt="SKI logo" />
              </div>
              <div className={styles["titleText"]}>
                <h1>SRI KRISHNA COLLEGE OF TECHNOLOGY</h1>
                <h3>
                  AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE
                </h3>
              </div>
              <div className={styles["navbar-logo"]}>
                <img src={require("assets/Logo2.png")} alt="SKCT logo" />
              </div>
            </div>
          ) : (
            <div className={styles["navbar-brand"]}>
              {windowDimensions.width > 350 && (
                <div className={styles["navbar-logo"]}>
                  <img src={require("assets/Logo2.png")} alt="SKCT logo" />
                  <hr />
                </div>
              )}
              <div className={styles["titleText"]}>
                <p>SKCT</p>
              </div>
            </div>
          )}
          {windowDimensions.width > 790 && (
            <div className={`${styles.navLink} ${styles.right}`}>
              {!user && <Link to="login">Login</Link>}
              {user?.isAdmin && <Link to="/admin">Admin</Link>}
              {user?.token && (
                <Link
                  to={location.pathname}
                  onClick={() => {
                    setShowProfile((prev) => !prev);
                  }}
                >
                  Profile
                </Link>
              )}
              <Link to="/alumni-forum">Alumni Forum</Link>
              <Link to="/office-bearers">Office Bearers</Link>
            </div>
          )}
          {user && (
            <div className={`${styles.message_icon} ${styles.active}`}>
              <TiMessages
                fontSize={25}
                onClick={() =>
                  messageStatus === "open"
                    ? closeMessageModal()
                    : openMessageModal()
                }
              />
            </div>
          )}
          {user && (
            <div
              className={`${styles.notification_icon} ${
                showNotificationBadge && styles.active
              }`}
            >
              <IoMdNotificationsOutline
                fontSize={25}
                onClick={() => setIsNotificationActive((prev) => !prev)}
              />
            </div>
          )}
          {windowDimensions.width < 790 && (
            <div className={`${styles.dropdown} `}>
              {!menuActive && (
                <AiOutlineMenu
                  className={styles["dropdown-btn"]}
                  fontSize={20}
                  onClick={() => {
                    setMenuActive(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
        {isNotificationActive && <NotificationPanel onResolve={() => {}} />}
      </div>
      {menuActive && windowDimensions.width < 790 && (
        <Menu setMenuActive={setMenuActive} setShowProfile={setShowProfile} />
      )}

      <Outlet />
    </>
  );
};

export default Navbar;
