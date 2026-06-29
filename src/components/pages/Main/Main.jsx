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
import { theme } from "../../../styles/theme";
import {
  ChartCard,
  ChartTitle,
  Wrap,
  TitleWrap,
  Title,
  TitlePoint,
} from "./Main.styles";

const data = [
  { day: "월", km: 60, co2Kg: 24 },
  { day: "화", km: 75, co2Kg: 30 },
  { day: "수", km: 68, co2Kg: 27 },
  { day: "목", km: 82, co2Kg: 33 },
  { day: "금", km: 90, co2Kg: 36 },
  { day: "토", km: 70, co2Kg: 28 },
  { day: "일", km: 55, co2Kg: 22 },
];

const Main = () => {
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
            <LineChart data={data}>
              <CartesianGrid vertical={false} stroke={theme.color.border} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="km"
                name="km"
                stroke="#EC4899"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="co2Kg"
                name="co2kg"
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
