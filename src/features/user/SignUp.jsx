import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const onSubmit = () => {
    axios
      .post("http://192.168.51.4/api/users", {
        userId: userId,
        userPwd: userPwd,
        email: email,
        userName: userName,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      ID
      <input type="text" onChange={(e) => setUserId(e.target.value)} />
      PASSWORD
      <input type="text" onChange={(e) => setUserPwd(e.target.value)} />
      EAMIL
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      이름
      <input type="text" onChange={(e) => setUserName(e.target.value)} />
      <button onClick={onSubmit}>회원가입</button>
    </>
  );
};
export default SignUp;
