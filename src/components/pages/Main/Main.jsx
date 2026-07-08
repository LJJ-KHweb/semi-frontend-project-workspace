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
import {
  VerifyBtn,
  BtnWrap,
  Overlay,
  VerifyModal,
  CloseButton,
  ModalTitle,
  CarList,
  CarItem,
  ConfirmButton,
  StepButtonRow,
  BackButton,
  TimeFormRow,
  TimeLabel,
  TimeInput,
  DatePickerGlobalStyle,
} from "./Verify.styles";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

format(new Date(), "yyyy-MM-dd HH:mm"); // Date 띄워줄때 형식 변경 yyyy-MM-dd HH:mm 이렇게 뜸

registerLocale("ko", ko);

const carNos = [
  { carNo: "52가 3108" },
  { carNo: "32가 7257" },
  { carNo: "47가 5706" },
  { carNo: "26가 5771" },
  { carNo: "23가 1266" },
  { carNo: "29가 7257" },
  { carNo: "31가 2012" },
  { carNo: "71가 0715" },
  { carNo: "77가 7777" },
  { carNo: "17가 2311" },
];

const Main = () => {
  const [raspData, setRaspData] = useState([]);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false); // 모달 표시 확인
  const [selectedCarNo, setSelectedCarNo] = useState(null);

  const [step, setStep] = useState("car");
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTimeTime] = useState(null);

  const handleConfirmVerify = () => {
    if (finishTime <= startTime) {
      alert("반납 시간은 빌린 시간보다 이후여야 합니다.");
      return;
    }

    console.log(selectedCarNo, startTime, finishTime);
    setIsVerifyOpen(false);
  };

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
      <DatePickerGlobalStyle />
      <Wrap>
        <TitleWrap>
          <Title>
            <TitlePoint>공유전기차타고</TitlePoint>
            <br />
            탄소배출 줄이자
          </Title>
          <BtnWrap>
            <VerifyBtn
              onClick={() => {
                // 모달 열 때마다 이전 선택/입력 초기화
                setSelectedCarNo(null);
                setStartTime(null);
                setFinishTimeTime(null);
                setStep("car");
                setIsVerifyOpen(true);
              }}
            >
              전기차 이용 인증
            </VerifyBtn>
          </BtnWrap>
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

      {isVerifyOpen && (
        <Overlay>
          <VerifyModal>
            <CloseButton onClick={() => setIsVerifyOpen(false)}>×</CloseButton>
            <ModalTitle>전기차 이용 인증</ModalTitle>

            {step === "car" && (
              <>
                <CarList>
                  {carNos.map((c) => (
                    <CarItem
                      key={c.carNo}
                      data-selected={selectedCarNo === c.carNo}
                      onClick={() => setSelectedCarNo(c.carNo)}
                    >
                      {c.carNo}
                    </CarItem>
                  ))}
                </CarList>
                <StepButtonRow>
                  <ConfirmButton
                    disabled={!selectedCarNo}
                    onClick={() => setStep("time")}
                  >
                    다음
                  </ConfirmButton>
                </StepButtonRow>
              </>
            )}

            {step === "time" && (
              <>
                <TimeFormRow>
                  <TimeLabel>빌린 시간</TimeLabel>
                  <DatePicker
                    selected={startTime} // 선택된 날짜, 없으면 null
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect // 시간 선택 input도 있는데 그거는 유저한테 너무 가혹함
                    timeIntervals={15} // 시간 보여주는 간격 ( ex) 1 이면 1분씩)
                    dateFormat="yyyy-MM-dd HH:mm" // 선택 했을때 보여주는 포맷
                    placeholderText={format(new Date(), "yyyy-MM-dd HH:mm")}
                    customInput={<TimeInput />}
                    locale="ko" // 한국어 패치 ㅋㅋ
                    timeCaption="시간" // 시간 선택 위에 뜨는 캡션
                  />
                </TimeFormRow>
                <TimeFormRow>
                  <TimeLabel>반납 시간</TimeLabel>
                  <DatePicker
                    selected={finishTime}
                    onChange={(date) => setFinishTimeTime(date)}
                    minDate={startTime} // 타임머신 불가
                    filterTime={(time) => !startTime || time >= startTime} // 같은 날짜여도 빌린 시간 이전은 목록에서 제외
                    disabled={!startTime}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    placeholderText={format(new Date(), "yyyy-MM-dd HH:mm")}
                    customInput={<TimeInput />}
                    locale="ko"
                    timeCaption="시간"
                  />
                </TimeFormRow>
                <StepButtonRow>
                  <BackButton onClick={() => setStep("car")}>이전</BackButton>
                  <ConfirmButton
                    disabled={!startTime || !finishTime}
                    onClick={handleConfirmVerify}
                  >
                    인증하기
                  </ConfirmButton>
                </StepButtonRow>
              </>
            )}
          </VerifyModal>
        </Overlay>
      )}
    </Spacer>
  );
};

export default Main;
