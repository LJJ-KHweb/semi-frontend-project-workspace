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

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

export const SectionTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 22px;
  color: ${({ theme }) => theme.color.text};
`;

/* ===================== 랭킹 ===================== */

export const RankingSection = styled.section`
  margin-top: 36px;
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

/* ===================== 차트 ===================== */

export const ChartSection = styled.section`
  margin-top: 36px;
  padding: 28px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const ChartBox = styled.div`
  height: 320px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
`;

export const ChartItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BarWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Bar = styled.div`
  width: 48px;
  height: ${({ height }) => height}px;
  max-height: 220px;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.color.pointDark},
    ${({ theme }) => theme.color.pointHover}
  );
  border-radius: ${({ theme }) => theme.radius.md}
    ${({ theme }) => theme.radius.md} 0 0;
  transition: 0.3s;
`;

export const ChartCount = styled.p`
  margin: 12px 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

export const ChartSubCount = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.success};
`;

export const ChartDay = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.sub};
`;

export const DashboardGrid = styled.div`
  margin-top: 36px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 24px;
  align-items: start;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ChartCard = styled.section`
  padding: 28px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const SmallChartBox = styled.div`
  width: 100%;
  height: 240px;
`;

export const LargeChartBox = styled.div`
  width: 100%;
  height: 420px;
`;
