import styled from "styled-components";

import { theme } from "./styles/theme";

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

  color: ${theme.color.danger};
`;
