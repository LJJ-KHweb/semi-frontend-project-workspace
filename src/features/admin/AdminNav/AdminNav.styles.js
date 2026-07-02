import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const sidebar = "220px";

export const SideBar = styled.aside`
  width: ${sidebar};
  height: 100vh;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  flex-shrink: 0;
`;

export const Logo = styled.span`
  font-size: 22px;
  font-weight: 800;
  color: ${Theme.color.point};
`;

export const AdminBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${Theme.color.point};
  background: rgba(14, 165, 233, 0.15);
  padding: 2px 7px;
  border-radius: ${Theme.radius.sm};
  letter-spacing: 0.04em;
`;

export const NavList = styled.ul`
  flex: 1;
  list-style: none;
  padding: 12px 0;
  margin: 0;
  overflow-y: auto;
`;

export const NavItem = styled.li``;

export const NavBtn = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 24px;
  background: ${({ $active }) =>
    $active ? "rgba(14, 165, 233, 0.15)" : "transparent"};
  color: ${({ $active }) =>
    $active ? Theme.color.point : "rgba(255, 255, 255, 0.7)"};
  border: none;
  border-left: 3px solid
    ${({ $active }) => ($active ? Theme.color.point : "transparent")};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: rgba(14, 165, 233, 0.1);
    color: #fff;
  }
`;

export const BackBtn = styled.button`
  margin: 12px 16px 24px;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${Theme.radius.sm};
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.85);
  }
`;
