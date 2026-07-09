import styled from "styled-components";

export const AdminContainer = styled.main`
  min-height: calc(100vh - 120px);
  padding: 48px;
  background: ${({ theme }) => theme.color.bg};
  font-family: ${({ theme }) => theme.font};
`;

export const TitleBox = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  color: ${({ theme }) => theme.color.text};
`;

export const SubTitle = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 15px;
`;

/* ===================== 전체 2 x 2 대시보드 ===================== */

export const MainDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
`;

/* ===================== 관리자 카드 2 x 2 ===================== */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const Card = styled.div`
  padding: 28px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const CardTitle = styled.h3`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
`;

export const CardNumber = styled.p`
  margin: 0;
  font-size: 36px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.pointDark};
`;

export const CardUnit = styled.span`
  margin-left: 4px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.sub};
`;

/* ===================== 공통 카드/제목 ===================== */

export const SectionTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 22px;
  color: ${({ theme }) => theme.color.text};
`;

export const ChartCard = styled.section`
  padding: 28px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

/* ===================== 랭킹 ===================== */

export const RankingSection = styled.section`
  padding: 28px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const RankingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.bgSoft};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const RankBadge = styled.div`
  width: 42px;
  height: 42px;
  margin-right: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.point};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 18px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.p`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

export const ProductSubText = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};
`;

export const PurchaseCount = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.pointDark};
`;

/* ===================== Recharts 박스 ===================== */

export const LargeChartBox = styled.div`
  width: 100%;
  height: 360px;
`;

export const SmallChartBox = styled.div`
  width: 100%;
  height: 360px;
`;
