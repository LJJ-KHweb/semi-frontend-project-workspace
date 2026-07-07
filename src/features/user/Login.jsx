import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const { login } = useAuth();
  const navi = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/api/auth/login", {
        userId,
        userPwd,
      })
      .then((result) => {
        // AuthContext.login이 기대하는 필드(accessToken, refreshToken, userId,
        // userName, role)가 res.data.data 안에 있다고 가정. 다른 조회 API들도
        // res.data.data로 감싸서 응답하는 컨벤션이라 동일하게 맞춤 - 실제 로그인
        // 응답 구조가 다르면 이 부분만 조정하면 됨.
        console.log(result);
        login(result.data.data);
        navi("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>로그인</AuthTitle>
        <AuthSubTitle>아이디와 비밀번호를 입력해주세요</AuthSubTitle>
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
          <SubmitButton type="submit">로그인</SubmitButton>
        </InsertForm>
      </AuthCard>
    </AuthWrapper>
  );
};

export default Login;
