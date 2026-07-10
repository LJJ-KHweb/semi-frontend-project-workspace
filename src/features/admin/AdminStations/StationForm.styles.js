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
  height: 100hv;
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

  &:disabled {
    background: ${Theme.color.bgDark};
    color: ${Theme.color.sub};
    cursor: not-allowed;
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

export const SplitRow = styled.div`
  display: flex;
  gap: 16px;

  & > div {
    flex: 1;
  }
`;

export const DangerText = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: ${Theme.color.danger};
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

export const StatusToggleGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatusToggleBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: #fff;
  color: ${Theme.color.sub};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${Theme.color.point};
  }

  &[data-active="true"][data-status="Y"] {
    background: ${Theme.color.successSoft};
    border-color: ${Theme.color.success};
    color: ${Theme.color.success};
  }

  &[data-active="true"][data-status="N"] {
    background: ${Theme.color.dangerSoft};
    border-color: ${Theme.color.danger};
    color: ${Theme.color.danger};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const BottomRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CenterOverlay = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TabContent = styled.div`
  min-height: 600px;
`;

export const ChargerStatusToggleGroup = styled(StatusToggleGroup)`
  gap: 6px;
`;

export const ChargerStatusToggleBtn = styled(StatusToggleBtn)`
  flex: none;
  padding: 6px 14px;
  font-size: 12px;
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid ${Theme.color.border};
  margin-bottom: 8px;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: ${Theme.color.sub};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: -1px;

  &:hover {
    color: ${Theme.color.text};
  }

  &[data-active="true"] {
    color: ${Theme.color.point};
    border-bottom-color: ${Theme.color.point};
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  padding: 10px 24px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: #fff;
  color: ${Theme.color.text};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${Theme.color.point};
    color: ${Theme.color.point};
  }
`;

export const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 10px 24px;
  border: 1px solid transparent;
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

export const AddBtn = styled.button`
  flex: 1;
  padding: 5px 5px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: #fff;
  color: ${Theme.color.sub};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointSoft};
    border-color: ${Theme.color.point};
    color: ${Theme.color.point};
  }
`;
