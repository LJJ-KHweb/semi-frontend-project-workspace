import styled from "styled-components";
import { Theme } from "../../styles/Theme";

export const AuthWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: ${Theme.radius.lg};
  box-shadow: ${Theme.shadow.md};
`;

export const AuthTitle = styled.h1`
  margin: 0 0 8px;
  font-family: ${Theme.font};
  font-size: 24px;
  font-weight: 700;
  color: ${Theme.color.text};
  text-align: center;
`;

export const AuthSubTitle = styled.p`
  margin: 0 0 28px;
  font-family: ${Theme.font};
  font-size: 14px;
  color: ${Theme.color.sub};
  text-align: center;
`;

export const InsertForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-family: ${Theme.font};
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.color.sub};
`;

export const InputBox = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.inputBg};
  font-family: ${Theme.font};
  font-size: 14px;
  color: ${Theme.color.text};
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${Theme.color.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const SubmitButton = styled.button`
  height: 46px;
  margin-top: 8px;
  border: none;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  font-family: ${Theme.font};
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${Theme.color.pointHover};
  }

  &:active {
    background: ${Theme.color.pointDark};
  }

  &:disabled {
    background: ${Theme.color.disabled};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  margin: -8px 0 0;
  font-family: ${Theme.font};
  font-size: 12px;
  color: ${Theme.color.danger};
`;

export const Divider = styled.div`
  margin: 24px 0;
  border-top: 1px solid ${Theme.color.border};
`;

export const SwitchText = styled.p`
  margin: 0;
  font-family: ${Theme.font};
  font-size: 13px;
  color: ${Theme.color.sub};
  text-align: center;

  a,
  span {
    margin-left: 4px;
    color: ${Theme.color.point};
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${Theme.color.pointHover};
    }
  }
`;
