import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const FormWrap = styled.form`
  display: flex;
  margin: auto;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 80%;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.color.sub};
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.inputBg};
  font-size: 14px;
  color: ${Theme.color.text};

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 12px;
  min-height: 100px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.inputBg};
  font-size: 14px;
  color: ${Theme.color.text};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const MapHint = styled.p`
  font-size: 13px;
  color: ${Theme.color.sub};
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 320px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
`;

export const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 10px 24px;
  border: none;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointHover};
  }
`;
