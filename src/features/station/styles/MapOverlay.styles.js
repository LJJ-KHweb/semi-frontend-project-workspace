import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const OverlayCard = styled.div`
  width: 260px;
  padding: 16px;
  background: ${Theme.color.bg};
  border-radius: ${Theme.radius.md};
  border: 1px solid ${Theme.color.border};
  box-shadow: ${Theme.shadow.md};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const OverlayTitle = styled.h4`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${Theme.color.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OverlayAddress = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${Theme.color.sub};
`;

export const OverlayBtnGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const OverlayButton = styled.button`
  flex: 1;
  height: 34px;
  border: none;
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.point};
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.pointHover};
  }

  &:active {
    background: ${Theme.color.pointDark};
  }
`;

export const ExitButton = styled.button`
  flex: 1;
  height: 34px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;
