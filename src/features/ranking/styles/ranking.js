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
  width: 360px;
  margin: 0 auto 36px;

  padding: 24px 28px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(135deg, #f8fbff 0%, #eef6ff 100%);

  border: 1px solid ${Theme.color.border};
  border-radius: 18px;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
`;

export const MyRankTitle = styled.div`
  font-size: 15px;
  font-weight: 600;

  color: ${Theme.color.sub};
`;

export const MyRankValue = styled.div`
  font-size: 34px;
  font-weight: 700;

  color: ${Theme.color.point};

  span {
    margin-left: 4px;

    font-size: 18px;
    font-weight: 600;

    color: ${Theme.color.sub};
  }
`;

export const Table = styled.div`
  background: white;

  border: 1px solid ${Theme.color.border};
  border-radius: 16px;

  overflow: hidden;
`;

export const HeaderRow = styled.div`
  display: grid;

  grid-template-columns:
    110px /* 순위 */
    160px /* 회원 */
    220px /* 아이디 */
    220px /* 주행거리 */
    220px; /* 탄소절감량 */

  align-items: center;

  padding: 18px 20px;

  background: #fafafa;

  font-weight: 700;

  border-bottom: 1px solid ${Theme.color.border};
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns:
    110px
    160px
    220px
    220px
    220px;

  align-items: center;

  padding: 18px 20px;

  border-top: 1px solid ${Theme.color.border};

  transition: 0.2s;

  &:hover {
    background: #fafcff;
  }
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: ${Theme.color.text};
`;

export const RankBadge = styled.div`
  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  font-size: 15px;
  font-weight: 700;

  color: white;

  background: ${({ rank }) => {
    if (rank === 1) return "#f59e0b";
    if (rank === 2) return "#94a3b8";
    if (rank === 3) return "#b45309";
    return Theme.color.point;
  }};
`;
export const MyRankRow = styled(Row)`
  margin-bottom: 20px;

  background: linear-gradient(90deg, #eef7ff 0%, #f8fbff 100%);

  border: 2px solid ${Theme.color.point};
  border-radius: 14px;

  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.12);

  font-weight: 600;

  &:hover {
    background: linear-gradient(90deg, #eef7ff 0%, #f8fbff 100%);
  }
`;
