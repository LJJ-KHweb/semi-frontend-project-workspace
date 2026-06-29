import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 64px;
  padding: 0 24px;
  background: ${theme.color.footerBg};
  border-top: 1px solid ${theme.color.border};
`;

export const FooterLogo = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.color.footerText};
  cursor: pointer;
`;

export const FooterText = styled.p`
  font-size: 13px;
  color: ${theme.color.footerText};
`;
