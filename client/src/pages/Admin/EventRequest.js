import AdminSidebar from "components/AdminComponents/AdminSidebar";
import EventRequestPanel from "components/AdminComponents/EventRequestPanel";
import React, { useEffect }from "react";
import Styles from "./Admin.module.css";

const EventRequest = () => {
  useEffect(() => {
    document.title="Alumni Portal | Event Request"
  });
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <EventRequestPanel />
      </main>
    </div>
  );
};

export default EventRequest;
