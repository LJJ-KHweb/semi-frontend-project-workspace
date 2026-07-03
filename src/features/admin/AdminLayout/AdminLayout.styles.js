import styled from "styled-components";
import { Theme } from "../../../styles/Theme";
import { sidebar } from "../AdminNav/AdminNav.styles";

export const AdminWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${Theme.color.bg};
`;

export const MainArea = styled.div`
  flex: 1;
  margin-left: ${sidebar};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBar = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: ${Theme.color.headerBg};
  border-bottom: 1px solid ${Theme.color.border};
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
`;

export const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const LogoutBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${Theme.radius.sm};
  border: 1px solid ${Theme.color.border};
  background: transparent;
  color: ${Theme.color.sub};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${Theme.color.danger};
    color: ${Theme.color.danger};
  }
`;
