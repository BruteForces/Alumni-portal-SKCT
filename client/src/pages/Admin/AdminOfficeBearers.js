import AdminSidebar from "components/AdminComponents/AdminSidebar";
import OfficeBearerTable from "components/AdminComponents/OfficeBearerTable";
import React from "react";
import Styles from "./Admin.module.css";

const AdminOfficeBearers = () => {
  document.title="Alumni Portal | OB Details";
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <OfficeBearerTable />
      </main>
    </div>
  );
};

export default AdminOfficeBearers;
