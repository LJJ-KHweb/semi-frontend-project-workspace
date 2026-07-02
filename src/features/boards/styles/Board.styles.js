import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Wrap = styled.section`
  padding: 40px 88px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const WriteButton = styled.button`
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

export const Table = styled.div`
  border-top: 2px solid ${Theme.color.point};
  border-bottom: 1px solid ${Theme.color.border};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 90px 1fr 120px 120px 80px;
  align-items: center;
  padding: 14px 12px;
  border-bottom: 1px solid ${Theme.color.border};
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }

  &:active {
    background: ${Theme.color.border};
  }
`;

export const HeadRow = styled(Row)`
  background: ${Theme.color.bgSoft};
  font-weight: 600;
  color: ${Theme.color.sub};
  cursor: default;

  &:hover,
  &:active {
    background: ${Theme.color.bgSoft};
  }
`;

export const Cell = styled.span`
  text-align: center;
  color: ${Theme.color.text};

  &:nth-child(3) {
    text-align: left;
  }
`;

export const TypeBadge = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border-radius: ${Theme.radius.sm};
  font-size: 12px;
  font-weight: 600;

  &[data-notice="true"] {
    background: ${Theme.color.point};
    color: #fff;
  }

  &[data-notice="false"] {
    background: ${Theme.color.bgSoft};
    color: ${Theme.color.sub};
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

export const PageButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }

  &[data-active="true"] {
    background: ${Theme.color.point};
    border-color: ${Theme.color.point};
    color: #fff;
  }
`;

export const NextButton = styled.button`
  width: 48px;
  height: 32px;
  border: none;
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
