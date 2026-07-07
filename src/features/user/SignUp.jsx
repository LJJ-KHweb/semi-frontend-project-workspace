import axios from "axios";
import { useState } from "react";
import {
  AuthWrapper,
  AuthCard,
  AuthTitle,
  AuthSubTitle,
  InsertForm,
  FieldGroup,
  FieldLabel,
  InputBox,
  SubmitButton,
} from "./styles/Auth.styles";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
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
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>회원가입</AuthTitle>
        <AuthSubTitle>정보를 입력해 계정을 만들어주세요</AuthSubTitle>
        <InsertForm onSubmit={onSubmit}>
          <FieldGroup>
            <FieldLabel>ID</FieldLabel>
            <InputBox
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={(e) => setUserId(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>PASSWORD</FieldLabel>
            <InputBox
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setUserPwd(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>EMAIL</FieldLabel>
            <InputBox
              type="email"
              placeholder="이메일을 입력하세요"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>이름</FieldLabel>
            <InputBox
              type="text"
              placeholder="이름을 입력하세요"
              onChange={(e) => setUserName(e.target.value)}
            />
          </FieldGroup>
          <SubmitButton type="submit">회원가입</SubmitButton>
        </InsertForm>
      </AuthCard>
    </AuthWrapper>
  );
};
export default SignUp;
