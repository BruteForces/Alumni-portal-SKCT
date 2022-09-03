import React from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import PostRequestTable from "components/AdminComponents/PostRequestTable";

const PostRequest = () => {
  document.title="Alumni Portal | Post Request";
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <PostRequestTable />
      </main>
    </div>
  );
};

export default PostRequest;
