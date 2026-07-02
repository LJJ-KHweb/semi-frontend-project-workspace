import axios from "axios";
import { useState } from "react";
const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const onSubmit = () => {
    axios
      .post("http://192.168.51.4/api/auth/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <>
      ID
      <input
        type="text"
        onChange={(e) => {
          //console.log(e.target.value);
          setUserId(e.target.value);
        }}
      />
      PASSWORD
      <input
        type="text"
        onChange={(e) => {
          //console.log(e.target.value);
          setUserPwd(e.target.value);
        }}
      />
      <button onClick={onSubmit}>로그인</button>
    </>
  );
};

export default Login;
