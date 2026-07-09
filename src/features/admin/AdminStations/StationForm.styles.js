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

export const FormLayout = styled.div`
  display: flex;
  gap: 24px;
`;

export const FieldSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 3;
`;

export const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 7;
  height: 100%;
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
  min-height: 250px;
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

export const AddressRow = styled.div`
  display: flex;
  gap: 8px;

  & > input {
    flex: 1;
    min-width: 0;
  }
`;

export const SearchBtn = styled.button`
  flex-shrink: 0;
  padding: 0 16px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: #fff;
  color: ${Theme.color.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${Theme.color.point};
    color: ${Theme.color.point};
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
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
