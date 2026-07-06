import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const OverlayCard = styled.div`
  width: 300px;
  height: 190px;
  background: ${Theme.color.bg};
  border-radius: ${Theme.radius.sm};
  border: 1px solid ${Theme.color.border};
  display: flex;
  flex-direction: column;
`;

export const OverlayBtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: auto;
`;

export const OverlayButton = styled.button`
  width: 60px;
  height: 32px;
  border: none;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  color: ${Theme.color.headerBg};
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointHover};
  }

  &:active {
    background: ${Theme.color.pointDark};
  }
`;

export const ExitButton = styled.button`
  width: 60px;
  height: 32px;
  border: none;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: ${Theme.radius.sm};
  border: 1px solid ${Theme.color.point};
  background: transparent;
  color: ${Theme.color.point};

  &:hover {
    background: ${Theme.color.pointSoft};
  }

  &:active {
    background: ${Theme.color.border};
  }
`;
