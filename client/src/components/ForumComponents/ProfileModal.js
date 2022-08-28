import React, { useCallback, useEffect, useState } from "react";
import ReactPortal from "components/Modal/ReactPortal";
import ForumCard from "components/ForumComponents/ForumCard";
import styles from "./ProfileModal.module.css";
import {
  useAuthContext,
  useAuthDispatchContext,
} from "context/auth/authContext";
import { Link } from "react-router-dom";
import { useAlumniContext } from "context/alumni/alumniContext";
import { logout } from "context/auth/actions";
import { BsPeople } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import useUserProfileData from "hooks/useUserProfileData";
import Loader from "components/UI/Loader";

const DUMMY_POST_DATA = [
  {
    id: 1,
    user: {
      name: "Ben Tennyson",
      profile_image: require("assets/ben.png"),
    },
    post: {
      images: ["https://picsum.photos/536/354"],
      caption: {
        title: "Tile - Testing Postcard",
        description:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: [
      {
        user: {
          name: "Ben Tennyson",
          profile_image: "https://picsum.photos/536/354",
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Ben",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ],
      },
      {
        user: {
          name: "Enrico",
          profile_image: require("assets/ben.png"),
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
        ],
      },
      {
        user: {
          name: "Enrico",
          profile_image: require("assets/ben.png"),
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
        ],
      },
    ],
  },
];

const PROFILE_IMAGES = [
  <img src={require("assets/Profile_images/2.png")} alt="cover_img" />,
  <img src={require("assets/Profile_images/3.png")} alt="cover_img" />,
  <img src={require("assets/Profile_images/1.png")} alt="cover_img" />,
  <img src={require("assets/Profile_images/4.png")} alt="cover_img" />,
  <img src={require("assets/Profile_images/5.png")} alt="cover_img" />,
];

function ProfileModal({ isOpen, handleClose, userId }) {
  const { user, isLoading, error } = useUserProfileData(userId);
  const { user: loggedInUser } = useAuthContext();
  const { alumni } = useAlumniContext();
  const [show, setShow] = useState({
    desc: true,
    post: false,
  });
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useAuthDispatchContext();

  const isUser = user ? user._id === loggedInUser._id : false;

  const [profileData, setProfileData] = useState({
    profile_image: "",
    name: "Jenifer Aswin",
    designation: "Software Developer",
    location: "Coimbatore, India",
    social: {
      slack: "https://join.slack.com/team_test/shared_inviteas",
      twitter: "https://twitter.com/team_test/shared_inviteas",
      gmail: "teamwork123_a@gmail.com",
      gitHub: "https://github.com/team_test/shared_inviteas",
      facebook: "Enter the Facebook link",
      linkedin: "Enter Linkedin Account Link",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque euismod, nisi vel consectetur euismod,nisi nisl aliquet nisl, eget euismod nisl nisl eget nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur euismod, nisi nisl aliquet nisl, eget euismod nisl nisl egenisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque euismod, nisi vel consectetur euismod,nisi nisl aliquet nisl, eget euismod nisl nisl egetnisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque euismod, nisi vel consectetur euismod,nisi nisl aliquet nisl, eget euismod nisl nisl egetnisi.",

    other: {
      company: "Company Name",
      organization: "Organisation Name",
      skills: "Skills / Domain",
      contact: "Contact Number",
      ugCollege: "Under Graduation College Name",
      ugCourse: "Under  Graduation Course Name",
      pgCollege: "Post Graduation College Name if any",
      pgCourse: "Post Graduation Course Name if any",
    },
  });

  const pick_image = useCallback(() => {
    const random_number = Math.floor(Math.random() * PROFILE_IMAGES.length);
    return PROFILE_IMAGES[random_number];
  }, []);

  const handleChange = (e, name) => {
    setProfileData({
      ...profileData,
      [name]: e.currentTarget.textContent,
    });
  };

  const handleShow = (name) => {
    if (name === "desc") {
      setShow({
        desc: true,
        post: false,
      });
    } else {
      setShow({
        desc: false,
        post: true,
      });
    }
  };

  const handleLogout = async () => {
    await logout(dispatch);
    handleClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (isLoading) return <Loader />;

  return (
    <ReactPortal wrapperId="profile_content_wrapper">
      <div className={styles.profile_overlay} onClick={handleClose}>
        <div
          className={styles.profile_container}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.profile_header}>{pick_image()}</div>
          <div className={styles.profile_body}>
            <div className={styles.profile_img}>
              <img
                src={`/api/v1/users/user-avatar/${userId}`}
                alt="profile_img"
              />
              {editProfile && (
                <label htmlFor="img-switch">
                  <img
                    src={require("assets/image-switch.png")}
                    alt="switch-icon"
                  />
                </label>
              )}
              <input name="image" id="img-switch" type="file" />
            </div>
            <div
              className={`${styles.profile_info} ${
                editProfile && styles.profile_info_edit
              }`}
            >
              <h2
                className={`${editProfile && styles.editActive}`}
                contentEditable={editProfile}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange(e, "name")}
              >
                {user?.name}
              </h2>
              <h3
                className={`${editProfile && styles.editActive}`}
                contentEditable={editProfile}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange(e, "designation")}
              >
                {printDesignation(user?.isAlumni, user?.isAdmin) ||
                  profileData.designation}
              </h3>
              <div
                className={`${styles.location} ${
                  editProfile && styles.editActive
                }`}
              >
                <img
                  src={require("assets/icons/location.png")}
                  alt="location icon"
                />
                <p
                  suppressContentEditableWarning={true}
                  contentEditable={editProfile}
                  onBlur={(e) => handleChange(e, "location")}
                >
                  {user?.city},{user?.country}
                </p>
              </div>
              {user?.isAlumni && (
                <>
                  <h4>Available on</h4>
                  {!editProfile ? (
                    <div className={styles.social}>
                      <img
                        src={require("assets/icons/social/slack.png")}
                        alt="slack icon"
                      />
                      <img
                        src={require("assets/icons/social/twitter.png")}
                        alt="twitter icon"
                      />
                      <img
                        src={require("assets/icons/social/gmail.png")}
                        alt="gmail icon"
                      />
                      <img
                        src={require("assets/icons/social/gitHub.png")}
                        alt="gitHub icon"
                      />
                      <img
                        src={require("assets/icons/social/facebook.png")}
                        alt="facebook icon"
                      />
                    </div>
                  ) : (
                    <div className={styles.editSocial_container}>
                      {Object.keys(profileData.social).map((key, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.editSocial} ${
                              editProfile && styles.editActive
                            }`}
                          >
                            <p
                              suppressContentEditableWarning={true}
                              contentEditable={editProfile}
                              onBlur={(e) => handleChange(e, `social.${key}`)}
                            >
                              {profileData.social[key]}
                            </p>
                            <img
                              src={require(`assets/icons/social/${key}.png`)}
                              alt="social icon"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
              {editProfile && (
                <div className={styles.otherDetails}>
                  {Object.keys(profileData.other).map((key, index) => {
                    return (
                      <p
                        key={index}
                        className={styles.editActive}
                        suppressContentEditableWarning={true}
                        contentEditable={editProfile}
                        onBlur={(e) => handleChange(e, `other.${key}`)}
                      >
                        {profileData.other[key]}
                      </p>
                    );
                  })}
                </div>
              )}
              {isUser && (
                <div className={styles.profile_controls_container}>
                  {!editProfile ? (
                    <div
                      className={styles.profile_controls}
                      onClick={() => setEditProfile(true)}
                    >
                      <img
                        src={require("assets/icons/edit.png")}
                        alt="edit icon"
                      />
                      <p>Edit Profile</p>
                    </div>
                  ) : (
                    <div
                      className={styles.profile_controls}
                      onClick={() => setEditProfile(false)}
                    >
                      <p>Done</p>
                    </div>
                  )}
                  {!user?.isAdmin && !alumni && user && (
                    <div className={styles.profile_controls}>
                      <BsPeople />

                      <p>
                        <Link onClick={handleClose} to="/register-alumni">
                          Apply as Alumni
                        </Link>
                      </p>
                    </div>
                  )}
                  <div
                    className={styles.profile_controls}
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline />
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.profile_description_container}>
              <div className={styles.description_topbar}>
                <p
                  className={`${show.desc && styles.selected}`}
                  onClick={() => handleShow("desc")}
                >
                  Self Description
                </p>
                <p
                  className={`${show.post && styles.selected}`}
                  onClick={() => handleShow("post")}
                >
                  Post
                </p>
              </div>
              {show.desc && (
                <div className={styles.description}>
                  <p
                    className={`${editProfile && styles.editActive}`}
                    suppressContentEditableWarning={true}
                    contentEditable={editProfile}
                    onBlur={(e) => handleChange(e, "description")}
                  >
                    {profileData.description}
                  </p>
                </div>
              )}
              {show.post && (
                <div className={styles.posts}>
                  {DUMMY_POST_DATA.map((post) => {
                    return (
                      <ForumCard
                        key={post.id}
                        data={post}
                        profileActive={true}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

function printDesignation(isAlumni, isAdmin) {
  if (isAlumni) return false;
  if (isAdmin) return "Admin of Alumni Portal";
  else return "Student at SKCT";
}

export default ProfileModal;
