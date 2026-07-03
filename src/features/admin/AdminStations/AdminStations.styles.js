import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const AdminStationsWrap = styled.div`
  padding: 24px;
`;

export const StationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${Theme.color.headerBg};
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background: ${Theme.color.bgSoft};
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.color.sub};
  border-bottom: 1px solid ${Theme.color.border};
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${Theme.color.border};
  }

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${Theme.color.text};
`;

export const EmptyMsg = styled.p`
  padding: 40px;
  text-align: center;
  color: ${Theme.color.sub};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
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

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border-radius: ${Theme.radius.sm};
  font-size: 12px;
  font-weight: 600;

  &[data-status="Y"] {
    background: ${Theme.color.successSoft};
    color: ${Theme.color.success};
  }

  &[data-status="N"] {
    background: ${Theme.color.dangerSoft};
    color: ${Theme.color.danger};
  }
`;
