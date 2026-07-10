import { Theme } from "../../../styles/Theme";
import styled from "styled-components";

export const MapCard = styled.div`
  width: 75%;
  height: 80%;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  overflow: hidden;
`;

export const Title = styled.h3`
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const StationListCard = styled.div`
  width: 32%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  background: ${Theme.color.headerBg};
  box-shadow: ${Theme.shadow.sm};
  overflow: hidden;
`;

export const StationWarp = styled.div`
  height: 100%;
  display: flex;
`;

export const Wrap = styled.div`
  margin: auto;
  width: 90%;
  height: 100%;
  margin-top: 50px;
`;

export const StationListBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 20px;
`;

export const StationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  background: ${Theme.color.headerBg};
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${Theme.color.point};
    box-shadow: ${Theme.shadow.sm};
  }

  &:active {
    background: ${Theme.color.bgSoft};
  }
`;

export const StationCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StationName = styled.h4`
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

export const RegionBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 9px;
  border-radius: 999px;
  background: ${Theme.color.pointSoft};
  color: ${Theme.color.point};
  font-size: 11px;
  font-weight: 600;
`;

export const StationAddress = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${Theme.color.sub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChargerInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 600;
`;

export const CardDetailBtn = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  padding: 4px 12px;
  border: 1px solid ${Theme.color.border};
  border-radius: 999px;
  background: ${Theme.color.bg};
  color: ${Theme.color.sub};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${Theme.color.point};
    color: ${Theme.color.point};
  }
`;

export const ChargerInfo = styled.span`
  color: ${Theme.color.sub};

  &[data-type="available"] {
    color: ${Theme.color.success};
  }

  &[data-type="unable"][data-has="true"] {
    color: ${Theme.color.danger};
  }
`;

export const AddressSearchRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 20px 0;
`;

export const AddressInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px 12px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.inputBg};
  font-size: 13px;
  color: ${Theme.color.text};

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const AddressSearchBtn = styled.button`
  flex-shrink: 0;
  padding: 0 16px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${Theme.color.point};
    color: ${Theme.color.point};
  }
`;

export const DistanceGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid ${Theme.color.border};
`;

export const DistanceButton = styled.button`
  flex: 1;
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

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid ${Theme.color.border};
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

export const ErrorMsg = styled.p`
  margin: auto;
  text-align: center;
  padding: 24px;
  color: ${Theme.color.sub};
`;

