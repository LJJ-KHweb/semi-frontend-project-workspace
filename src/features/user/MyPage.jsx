import {
  Main,
  TitleSection,
  PageTitle,
  Content,
  LeftSection,
  RightSection,
  UserForm,
  InputGroup,
  Label,
  Input,
  ButtonGroup,
  ChartSection,
  ChartTitle,
  ChartArea,
  MileageSection,
  MileageHeader,
  MileageTitle,
  TotalMileage,
  MileageList,
  MileageItem,
  MileageDate,
  MileageContent,
  MileagePoint,
  MileageMinus,
} from "./styles/MyPageStyle";

import {
  AuthCard,
  AuthSubTitle,
  AuthTitle,
  FieldGroup,
  FieldLabel,
  InputBox,
  InsertForm,
  SubmitButton,
  UpdateButton,
  BackButton,
} from "./styles/Auth.styles";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ChartCard } from "../../components/pages/Main/Main.styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Theme } from "../../styles/Theme";
import {
  NextButton,
  PageButton,
  Pagination,
} from "../boards/styles/Board.styles";
import { useAuth } from "../../context/AuthContext";
import { data } from "react-router-dom";

const PAGE_GROUP_SIZE = 3;

const MyPage = () => {
  const { user } = useAuth();
  const [raspData, setRaspData] = useState([]);
  const [mileageHistory, setMileageHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 3, boardCounts: 0 });
  const [mileageSum, setMileageSum] = useState(0);
  const [userName, setUserName] = useState(0);
  const [email, setEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");

  useEffect(() => {
    api.get("/rasp/mypage").then((result) => {
      setRaspData(result.data.data);
    });

    api
      .get(`/users/mypage?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        setMileageHistory(result.data.data.mileages);
        setPages(result.data.data.pageInfo);
        setMileageSum(result.data.data.mileageSum);
      })
      .catch((e) => console.log(e));
  }, [page]);

  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  const onSubmit = () => {
    api
      .patch("/users/mypage", {
        data: {
          userPwd: userPwd,
          email: email,
        },
      })
      .then((result) => console.log(result))
      .catch((e) => console.log(result));
  };
  return (
    <Main>
      <TitleSection>
        <PageTitle>마이페이지</PageTitle>
      </TitleSection>

      <Content>
        <AuthCard>
          <AuthTitle>회원 정보 수정</AuthTitle>
          <AuthSubTitle>정보를 입력해 계정을 만들어주세요</AuthSubTitle>
          <InsertForm>
            <FieldGroup>
              <FieldLabel>ID</FieldLabel>
              <InputBox value={user.userId} readOnly />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>EMAIL</FieldLabel>
              <InputBox
                type="email"
                placeholder="이메일을 입력하세요"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>이름</FieldLabel>
              <InputBox value={user.userName} readOnly />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>비밀번호</FieldLabel>
              <InputBox
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setUserPwd(e.target.value)}
              />
            </FieldGroup>
            <UpdateButton onClick={onSubmit}>수정</UpdateButton>
            <BackButton>돌아가기</BackButton>
          </InsertForm>
        </AuthCard>
        <RightSection>
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
          <MileageSection>
            <MileageHeader>
              <MileageTitle>마일리지 내역</MileageTitle>

              <TotalMileage>총 {mileageSum} 마일리지</TotalMileage>
            </MileageHeader>
            <MileageList>
              {mileageHistory != null ? (
                mileageHistory.map((mileage, index) => (
                  <MileageItem key={index}>
                    <MileageDate>{mileage.createDate}</MileageDate>
                    <MileageContent>{mileage.productName}</MileageContent>
                    <MileagePoint>{mileage.change}</MileagePoint>
                  </MileageItem>
                ))
              ) : (
                <MileageItem>아직 마일리지 내역이 없습니다.</MileageItem>
              )}
            </MileageList>
            <Pagination>
              {currentGroup > 0 && (
                <PageButton
                  onClick={() => setPage(groupStart - 1)}
                  data-active={true}
                >
                  ··
                </PageButton>
              )}
              {page > 0 && (
                <NextButton onClick={() => setPage(page - 1)}>이전</NextButton>
              )}
              {Array.from({ length: groupEnd - groupStart }).map((_, i) => {
                const p = groupStart + i;
                return (
                  <PageButton
                    key={p}
                    data-active={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p + 1}
                  </PageButton>
                );
              })}
              {page < totalPages - 1 && (
                <NextButton onClick={() => setPage(page + 1)}>다음</NextButton>
              )}
              {groupStart + PAGE_GROUP_SIZE < totalPages && (
                <PageButton
                  onClick={() => setPage(groupStart + PAGE_GROUP_SIZE)}
                  data-active={true}
                >
                  ··
                </PageButton>
              )}
            </Pagination>
          </MileageSection>
        </RightSection>
      </Content>
    </Main>
  );
};

export default MyPage;
