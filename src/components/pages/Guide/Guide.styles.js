import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Wrap = styled.section`
  padding: 40px 88px 60px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const TitlePoint = styled.span`
  color: ${Theme.color.point};
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${Theme.color.border};
  border-radius: 999px;
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const StepsRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 48px;
`;

export const StepCard = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 16px 24px;
  background: ${Theme.color.headerBg};
  border-radius: ${Theme.radius.lg};
  box-shadow: ${Theme.shadow.sm};
  text-align: center;
`;

export const StepBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${Theme.color.point};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const StepIcon = styled.div`
  font-size: 32px;
`;

export const StepTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const StepDesc = styled.p`
  font-size: 13px;
  color: ${Theme.color.sub};
  line-height: 1.5;
`;

export const StepTag = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;

  &[data-required="true"] {
    background: ${Theme.color.point};
    color: #fff;
  }

  &[data-required="false"] {
    background: ${Theme.color.bgSoft};
    color: ${Theme.color.sub};
    border: 1px solid ${Theme.color.border};
  }
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Theme.color.point};
  font-size: 20px;
`;

export const MileageSection = styled.div`
  padding: 32px;
  background: ${Theme.color.headerBg};
  border-radius: ${Theme.radius.lg};
  box-shadow: ${Theme.shadow.sm};
  max-width: 640px;
`;

export const MileageTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${Theme.color.text};
  text-align: center;
`;

export const MileageTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const MileageHeadCell = styled.th`
  padding: 12px;
  background: ${Theme.color.point};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const MileageCell = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 14px;
  color: ${Theme.color.text};
  border-bottom: 1px solid ${Theme.color.border};

  tr:nth-child(odd) & {
    background: ${Theme.color.bgSoft};
  }
`;

export const MileageNote = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: ${Theme.color.sub};
  text-align: center;
`;
