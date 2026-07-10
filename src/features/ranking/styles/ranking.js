import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Main = styled.main`
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 35px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${Theme.color.text};
`;

export const SubTitle = styled.p`
  margin-top: 10px;
  color: ${Theme.color.sub};
`;

export const MyRankCard = styled.div`
  width: 260px;
  margin: 0 auto 35px;

  padding: 22px;

  border-radius: 16px;

  background: #f8fbff;

  border: 1px solid ${Theme.color.border};

  text-align: center;
`;

export const MyRankTitle = styled.div`
  font-size: 14px;
  color: ${Theme.color.sub};
`;

export const MyRankValue = styled.div`
  margin-top: 10px;

  font-size: 34px;
  font-weight: 700;

  color: ${Theme.color.point};
`;

export const Table = styled.div`
  border: 1px solid ${Theme.color.border};

  border-radius: 16px;

  overflow: hidden;

  background: white;
`;

export const HeaderRow = styled.div`
  display: grid;

  grid-template-columns:
    120px
    1fr
    220px
    220px;

  padding: 18px;

  background: #fafafa;

  font-weight: 700;
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns:
    120px
    1fr
    220px
    220px;

  padding: 18px;

  border-top: 1px solid ${Theme.color.border};

  align-items: center;

  &:hover {
    background: #fafcff;
  }
`;

export const Cell = styled.div`
  display: flex;

  justify-content: center;
`;

export const RankBadge = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;

  color: white;

  background: ${({ rank }) => {
    if (rank === 1) return "#f59e0b";
    if (rank === 2) return "#94a3b8";
    if (rank === 3) return "#b45309";
    return Theme.color.point;
  }};
`;
