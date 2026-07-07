import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Spacer } from "../../../App.styles";
import { Theme } from "../../../styles/Theme";
import {
  ChartCard,
  ChartTitle,
  Wrap,
  TitleWrap,
  Title,
  TitlePoint,
} from "./Main.styles";
import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [raspData, setRaspData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.51.26/api/rasp");
        setRaspData(res.data.data);
      } catch (e) {
        console.log("조회 실패", e.response);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Spacer>
      <Wrap>
        <TitleWrap>
          <Title>
            <TitlePoint>공유전기차타고</TitlePoint>
            <br />
            탄소배출 줄이자
          </Title>
        </TitleWrap>
        <ChartCard>
          <ChartTitle>이번주 통계</ChartTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={raspData}>
              <CartesianGrid vertical={false} stroke={Theme.color.border} />
              <XAxis
                dataKey="dayDate"
                axisLine={false}
                tickLine={false}
                padding={{ left: 30, right: 30 }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="distanceSum"
                name="km"
                stroke="#EC4899"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="carbonReduction"
                name="kg"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Wrap>
    </Spacer>
  );
};

export default Main;
