import styled from "styled-components";
import { Theme } from "../../../../styles/Theme";

export const Table = styled.div`
  border-top: 2px solid ${Theme.color.point};
  border-bottom: 1px solid ${Theme.color.border};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 160px;
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

  &:nth-child(2) {
    text-align: left;
  }
`;
