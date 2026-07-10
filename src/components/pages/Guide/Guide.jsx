import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Spacer } from "../../../App.styles";
import {
  Wrap,
  TopBar,
  Title,
  TitlePoint,
  BackButton,
  StepsRow,
  StepCard,
  StepBadge,
  StepIcon,
  StepTitle,
  StepDesc,
  StepTag,
  Arrow,
  MileageSection,
  MileageTitle,
  MileageTable,
  MileageHeadCell,
  MileageCell,
  MileageNote,
} from "./Guide.styles";

const steps = [
  {
    no: 1,
    icon: "🚗",
    title: "공유 전기차 이용",
    desc: "공유 전기차를 이용한 후\n목적지에서 반납합니다.",
  },
  {
    no: 2,
    icon: "📝",
    title: "이용 내역 인증",
    desc: "이용한 차량번호와\n대여·반납 시간을 입력합니다.",
    required: true,
    tag: "로그인 필요",
  },
  {
    no: 3,
    icon: "✅",
    title: "이용 확인",
    desc: "입력한 정보를 확인하여\n실제 이용 내역을 인증합니다.",
  },
  {
    no: 4,
    icon: "🎁",
    title: "마일리지 적립",
    desc: "인증된 주행거리 기준으로\n1km당 1P가 자동 적립됩니다.",
  },
];

const mileageRows = [
  { desc: "전기차 1km이용시", point: "1P" },
  { desc: "랭킹 1등", point: "2000P" },
  { desc: "랭킹 2~5등", point: "1000P" },
  { desc: "랭킹 6~10등", point: "500P" },
  { desc: "랭킹 11~100등", point: "100P" },
];

const Guide = () => {
  const navi = useNavigate();

  return (
    <Spacer>
      <Wrap>
        <TopBar>
          <Title>
            <TitlePoint>공유전기차</TitlePoint> 이용방법
          </Title>
          <BackButton type="button" onClick={() => navi("/")}>
            돌아가기
          </BackButton>
        </TopBar>

        <StepsRow>
          {steps.map((step, i) => (
            <Fragment key={step.no}>
              <StepCard>
                <StepBadge>{step.no}</StepBadge>
                <StepIcon>{step.icon}</StepIcon>
                <StepTitle>{step.title}</StepTitle>
                {step.tag && (
                  <StepTag data-required={!!step.required}>{step.tag}</StepTag>
                )}
                <StepDesc>
                  {step.desc.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </StepDesc>
              </StepCard>
              {i < steps.length - 1 && <Arrow>➜</Arrow>}
            </Fragment>
          ))}
        </StepsRow>

        <MileageSection>
          <MileageTitle>마일리지 적립 안내</MileageTitle>
          <MileageTable>
            <thead>
              <tr>
                <MileageHeadCell>적립 조건</MileageHeadCell>
                <MileageHeadCell>적립 마일리지</MileageHeadCell>
              </tr>
            </thead>
            <tbody>
              {mileageRows.map((row) => (
                <tr key={row.desc}>
                  <MileageCell>{row.desc}</MileageCell>
                  <MileageCell>{row.point}</MileageCell>
                </tr>
              ))}
            </tbody>
          </MileageTable>
          <MileageNote>
            마일리지는 로그인 후 충전을 이용해야 적립됩니다.
          </MileageNote>
        </MileageSection>
      </Wrap>
    </Spacer>
  );
};

export default Guide;
