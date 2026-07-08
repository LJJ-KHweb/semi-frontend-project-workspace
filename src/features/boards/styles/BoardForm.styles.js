import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Wrap = styled.section`
  padding: 40px 88px;
`;

export const Card = styled.form`
  border-top: 2px solid ${Theme.color.point};
  border-bottom: 1px solid ${Theme.color.border};
  padding: 32px 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  font-size: 15px;
  color: ${Theme.color.text};

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  min-height: 260px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.inputBg};
  font-size: 15px;
  line-height: 1.7;
  color: ${Theme.color.text};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointHover};
  }

  &:active {
    background: ${Theme.color.pointDark};
  }
`;

export const FileLabel = styled.label`
  align-self: flex-start;
  padding: 10px 20px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const PreviewWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PreviewItem = styled.div`
  position: relative;
`;

export const PreviewImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: ${Theme.radius.sm};
  border: 1px solid ${Theme.color.border};
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: ${Theme.color.danger};
  color: #fff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  font-weight: 500;
  color: ${Theme.color.text};

  cursor: pointer;
  user-select: none;

  input {
    appearance: none;
    width: 18px;
    height: 18px;

    border: 2px solid ${Theme.color.border};
    border-radius: 50%;

    position: relative;
    cursor: pointer;

    transition: all 0.2s ease;

    &:checked {
      border-color: ${Theme.color.point};
    }

    &:checked::after {
      content: "";
      position: absolute;

      width: 8px;
      height: 8px;

      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      border-radius: 50%;
      background: ${Theme.color.point};
    }

    &:hover {
      border-color: ${Theme.color.point};
    }
  }

  &:hover {
    color: ${Theme.color.point};
  }
`;
