import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  AdminContainer,
  TitleBox,
  Title,
  SubTitle,
  MainDashboard,
  CardGrid,
  Card,
  CardTitle,
  CardNumber,
  CardUnit,
  RankingSection,
  SectionTitle,
  RankingList,
  RankingItem,
  RankBadge,
  ProductInfo,
  ProductName,
  ProductSubText,
  PurchaseCount,
  ChartCard,
  SmallChartBox,
  LargeChartBox,
} from "./Admin.styles";

const Admin = () => {
  const [adminPage, setAdminPage] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [raspStats, setRaspStats] = useState([]);
  const [purchaseCharts, setPurchaseCharts] = useState([]);

  const getAdminPage = async () => {
    try {
      const result = await api.get("/admin/adminPage");
      setAdminPage(result.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getRanking = async () => {
    try {
      const result = await api.get("/admin/ranking");
      setRanking(result.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getRaspStats = async () => {
    try {
      const result = await api.get("/rasp");
      setRaspStats(result.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getPurchaseCharts = async () => {
    try {
      const result = await api.get("/admin/charts");
      setPurchaseCharts(result.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAdminPage();
    getRanking();
    getRaspStats();
    getPurchaseCharts();
  }, []);

  if (!adminPage) {
    return (
      <AdminContainer>
        <Title>관리자 페이지</Title>
        <p>데이터를 불러오는 중입니다...</p>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <TitleBox>
        <Title>관리자 페이지</Title>
        <SubTitle>사이트의 회원 및 운영 현황을 확인할 수 있습니다.</SubTitle>
      </TitleBox>

      <MainDashboard>
        <CardGrid>
          <Card>
            <CardTitle>전체 회원 수</CardTitle>
            <CardNumber>
              {adminPage.sumUsers}
              <CardUnit>명</CardUnit>
            </CardNumber>
          </Card>

          <Card>
            <CardTitle>전체 문의 수</CardTitle>
            <CardNumber>
              {adminPage.sumRequires}
              <CardUnit>건</CardUnit>
            </CardNumber>
          </Card>

          <Card>
            <CardTitle>답변 완료 문의</CardTitle>
            <CardNumber>
              {adminPage.finishRequires}
              <CardUnit>건</CardUnit>
            </CardNumber>
          </Card>

          <Card>
            <CardTitle>미답변 문의</CardTitle>
            <CardNumber>
              {adminPage.notFinishRequires}
              <CardUnit>건</CardUnit>
            </CardNumber>
          </Card>
        </CardGrid>

        <RankingSection>
          <SectionTitle>상품 구매 랭킹</SectionTitle>

          <RankingList>
            {ranking.map((item, index) => (
              <RankingItem key={index}>
                <RankBadge>{index + 1}</RankBadge>

                <ProductInfo>
                  <ProductName>{item.productName}</ProductName>
                  <ProductSubText>구매 횟수</ProductSubText>
                </ProductInfo>

                <PurchaseCount>{item.purchaseCount}회</PurchaseCount>
              </RankingItem>
            ))}
          </RankingList>
        </RankingSection>

        <ChartCard>
          <SectionTitle>라즈베리 주행 / 탄소 절감 선 그래프</SectionTitle>

          <LargeChartBox>
            <ResponsiveContainer>
              <LineChart data={raspStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dayDate" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="distanceSum"
                  name="주행거리"
                  stroke="#DC2626"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#DC2626" }}
                  activeDot={{ r: 7 }}
                />

                <Line
                  type="monotone"
                  dataKey="carbonReduction"
                  name="탄소 절감량"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#16A34A" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </LargeChartBox>
        </ChartCard>

        <ChartCard>
          <SectionTitle>요일별 구매 횟수</SectionTitle>

          <SmallChartBox>
            <ResponsiveContainer>
              <BarChart data={purchaseCharts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="purchaseCount" name="구매 횟수" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </SmallChartBox>
        </ChartCard>
      </MainDashboard>
    </AdminContainer>
  );
};

export default Admin;
