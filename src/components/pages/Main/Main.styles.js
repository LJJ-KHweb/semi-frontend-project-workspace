import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  height: 100%;
  padding: 0 88px;
`;

export const TitleWrap = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: left;
  margin-left: 50px;
  margin-bottom: 300px;
  font-size: 50px;
  font-weight: 700;
  color: ${theme.color.text};
`;

export const TitlePoint = styled.span`
  color: ${theme.color.point};
`;

export const ChartCard = styled.div`
  width: 480px;
  background: ${theme.color.headerBg};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  padding: 24px;
`;

export const ChartTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.color.point};
`;
