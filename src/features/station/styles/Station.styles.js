import { Theme } from "../../../styles/Theme";
import styled from "styled-components";

export const MapCard = styled.div`
  width: 75%;
  height: 80%;
  border: 1px solid red;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const StationListCard = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  background: ${Theme.color.bg};
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

export const StationCard = styled.div`
  width: 80%;
  height: 23%;
  margin: 0 auto 12px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  box-shadow: ${Theme.shadow.sm};
  background: ${Theme.color.headerBg};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }

  &:active {
    background: ${Theme.color.bgDark};
  }
`;

export const StationContnet = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  margin-left: 10px;
  color: ${Theme.color.text};

  &[data-type="title"] {
    font-size: 16px;
    font-weight: 600;
    color: ${Theme.color.point};
    margin: auto;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  &[data-type="point"] {
    color: ${Theme.color.point};
  }

  &[data-type="charger"] {
    color: ${Theme.color.success};
    margin-top: 20px;
  }
`;

export const DistanceGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
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
  margin-top: auto;
  margin-bottom: 30px;
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
  text-align: center;
  padding: 24px;
  color: #64748b;
`;
