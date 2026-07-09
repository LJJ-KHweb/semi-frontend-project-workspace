import styled, { createGlobalStyle } from "styled-components";
import { Theme } from "../../../styles/Theme";

export const VerifyBtn = styled.button`
  padding: 14px 36px;

  border-radius: 999px;
  border: none;
  background: ${Theme.color.point};
  box-shadow: ${Theme.shadow.sm};

  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;

  &:hover {
    background: ${Theme.color.pointHover};
    transform: translateY(-2px);
  }

  &:active {
    background: ${Theme.color.pointDark};
    transform: translateY(0);
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  margin-left: 60px;
`;

export const BtnLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${Theme.color.sub};
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const VerifyModal = styled.div`
  position: relative;
  background: ${Theme.color.headerBg};
  border-radius: ${Theme.radius.md};
  box-shadow: ${Theme.shadow.md};
  padding: 32px;
  padding-top: 0;
  width: 45%;
  height: 60%;
  margin-bottom: 250px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${Theme.color.sub};
  font-size: 18px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
    color: ${Theme.color.text};
  }
`;

export const ModalTitle = styled.h3`
  color: ${Theme.color.text};
  font-size: 22px;
  font-weight: 500;
`;

export const CarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 75%;
  overflow-y: auto;
  margin: 16px 0;
  padding: 0;
  list-style: none;
`;

export const CarItem = styled.li`
  padding: 12px 16px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  color: ${Theme.color.text};
  font-size: 15px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${Theme.color.bgSoft};
  }

  &[data-selected="true"] {
    border-color: ${Theme.color.point};
    background: ${Theme.color.pointSoft};
    color: ${Theme.color.point};
    font-weight: 600;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointHover};
  }

  &:disabled {
    background: ${Theme.color.disabled};
    cursor: not-allowed;
  }
`;

export const StepButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const BackButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const TimeFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const TimeLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.color.sub};
`;

export const TimeInput = styled.input`
  width: 100%;
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
    background: ${Theme.color.bgSoft};
    color: ${Theme.color.disabled};
    cursor: not-allowed;
  }
`;

// react-datepicker는 실제 팝업 DOM을 그려주기 때문에, 전역 클래스 이름을
// createGlobalStyle로 오버라이드하면 달력 자체도 우리 테마에 맞게 커스텀 가능
export const DatePickerGlobalStyle = createGlobalStyle`
  .react-datepicker {
    font-family: ${Theme.font};
    border: 1px solid ${Theme.color.border};
    border-radius: ${Theme.radius.md};
    box-shadow: ${Theme.shadow.md};
    overflow: hidden;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    background: ${Theme.color.headerBg};
    border-bottom: 1px solid ${Theme.color.border};
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker__day-name {
    color: ${Theme.color.text};
  }

  .react-datepicker__day {
    color: ${Theme.color.text};
    border-radius: ${Theme.radius.sm};
  }

  .react-datepicker__day:hover {
    background: ${Theme.color.bgSoft};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${Theme.color.point};
    color: #fff;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--keyboard-selected:hover {
    background: ${Theme.color.pointHover};
  }

  .react-datepicker__day--disabled {
    color: ${Theme.color.disabled};
    cursor: not-allowed;
  }

  .react-datepicker__day--disabled:hover {
    background: none;
  }

  .react-datepicker__time-list-item--selected {
    background: ${Theme.color.point} !important;
  }
`;
