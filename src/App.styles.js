import styled from "styled-components";
import { Theme } from "./styles/Theme";

export const Spacer = styled.div`
  flex: 1;
`;

export const ErrSpace = styled(Spacer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrMsg = styled.h1`
  font-size: 50px;
  font-weight: 700;
  color: ${Theme.color.danger};
`;
