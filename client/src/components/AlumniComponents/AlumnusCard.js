import ProfileModal from "components/ForumComponents/ProfileModal";
import Divider from "components/UI/Divider";
import React, { useState } from "react";
import Styles from "./AlumnusCard.module.css";

const AlumnusCard = ({ alumnus }) => {
  document.title="Alumni Portal | Alumni";
  const [isProfileModalOpen, setIsProfileModalOpen] = useState();

  const handleClose = () => {
    setIsProfileModalOpen(false);
  };
  return (
    <div className={Styles.profile_card}>
      {isProfileModalOpen && (
        <ProfileModal userId={alumnus.user._id} handleClose={handleClose} />
      )}

      <img
        onClick={() => {
          setIsProfileModalOpen(true);
        }}
        alt={"profile"}
        className={Styles.user_profile}
        src={`/api/v1/users/user-avatar/${alumnus.user._id}`}
      />
      <div className={Styles.user_info_container}>
        <h3>
          {alumnus.user.name}{" "}
          <span>
            {alumnus.user.department}{" "}
            {new Date(alumnus.user.yearOfPassing).getFullYear()}
          </span>
        </h3>
        <Divider />
        <p>
          {alumnus.designation} at {alumnus.organization}
        </p>
        <p>{alumnus.user.city}</p>
      </div>
      <button className={Styles.message_button}>Message</button>
    </div>
  );
};

export default AlumnusCard;
