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
    icon: "👤",
    title: "회원가입",
    desc: "비회원도 충전소 조회는\n바로 이용할 수 있어요",
    required: false,
    tag: "선택",
  },
  {
    no: 2,
    icon: "🗺️",
    title: "충전소 찾기",
    desc: "지도에서 가까운 충전소를\n찾아보세요",
  },
  {
    no: 3,
    icon: "⚡",
    title: "충전하기",
    desc: "충전소에서 바로 충전을\n시작하세요",
  },
  {
    no: 4,
    icon: "🏆",
    title: "마일리지 적립",
    desc: "전기차를 이용해서 적립받고\n마일리지로 상품을 구매해보세요",
    required: true,
    tag: "로그인 필요",
  },
];

const mileageRows = [
  { desc: "차량 이용", point: "100P" },
  { desc: "랭커 상금", point: "10000 ~ 50000P" },
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
          <BackButton type="button" onClick={() => navi(-1)}>
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
