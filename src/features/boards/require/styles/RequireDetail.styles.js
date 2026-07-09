import styled from "styled-components";
import { Theme } from "../../../../styles/Theme";

export const AnswerCard = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.bgSoft};
`;

export const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const AnswerWriter = styled.span`
  color: ${Theme.color.point};
`;

export const AnswerContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.7;
  color: ${Theme.color.text};
`;
