import { useEffect, useState } from "react";
import api from "../../../api/axios";

const Admin = () => {
  const [adminPage, setAdminPage] = useState([]);

  useEffect(() => {
    api.get("/admin/adminPage").then((result) => {
      console.log(result);
    });

    return (
      <>
        <p> 관리자 페이지 </p>
      </>
    );
  });
};

export default Admin;
