import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Wrap = styled.section`
  padding: 40px 88px;
`;

export const Card = styled.div`
  border-top: 2px solid ${Theme.color.point};
  border-bottom: 1px solid ${Theme.color.border};
`;

export const Header = styled.div`
  padding: 24px 12px;
  border-bottom: 1px solid ${Theme.color.border};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${Theme.color.sub};
  font-size: 14px;
`;

export const MetaItem = styled.span`
  &:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px;
    margin-left: 16px;
    background: ${Theme.color.border};
    vertical-align: middle;
  }
`;

export const Content = styled.div`
  min-height: 260px;
  padding: 32px 12px;
  color: ${Theme.color.text};
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
  border-bottom: 1px solid ${Theme.color.border};
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ListButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.sm};
  background: ${Theme.color.headerBg};
  color: ${Theme.color.text};
  cursor: pointer;

  &:hover {
    background: ${Theme.color.bgSoft};
  }
`;

export const ActionButton = styled.button`
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

  &[data-danger="true"] {
    background: ${Theme.color.danger};

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const ImgWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 0;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: ${Theme.radius.sm};
  border: 1px solid ${Theme.color.border};
`;
