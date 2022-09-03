import React from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import RejectTable from "components/AdminComponents/RejectTable";

const RejectDetails = () => {
  document.title="Alumni Portal | Rejected Alumni";
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <RejectTable />
      </main>
    </div>
  );
};

export default RejectDetails;
