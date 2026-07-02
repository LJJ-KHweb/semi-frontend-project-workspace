import styled from "styled-components";

import { theme } from "../../../styles/theme";

export const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;

  background: ${theme.color.headerBg};
  border-bottom: 1px solid ${theme.color.border};
`;

export const Logo = styled.h1`
  font-size: 30px;
  font-weight: 800;

  color: ${theme.color.point};
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
`;

export const NavLink = styled.p`
  font-size: 15px;

  color: ${theme.color.headerText};
  cursor: pointer;
  &:hover {
    color: ${theme.color.point};
  }
`;

export const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LoginBtn = styled.button`
  padding: 8px 16px;

  border-radius: ${theme.radius.sm};
  border: 1px solid ${theme.color.point};
  background: transparent;
  color: ${theme.color.point};

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${theme.color.pointSoft};
  }
`;

export const SignupBtn = styled.button`
  padding: 8px 16px;

  border-radius: ${theme.radius.sm};
  border: none;
  background: ${theme.color.point};

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${theme.color.pointHover};
  }

  &:active {
    background: ${theme.color.pointDark};
  }
`;
