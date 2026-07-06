import { useState } from "react";
import {
  Wrap,
  Header,
  Title,
  Table,
  HeadRow,
  Row,
  Cell,
  TypeBadge,
  Pagination,
  PageButton,
  NextButton,
} from "../styles/Board.styles";
import { Spacer } from "../../../App.styles";

const lists = [
  {
    no: 10,
    type: "notice",
    title: "게시판 이용 안내",
    writer: "관리자",
    date: "2026-06-20",
    views: 152,
  },
  {
    no: 9,
    type: "notice",
    title: "공지 공지",
    writer: "관리자",
    date: "2026-06-18",
    views: 98,
  },
  {
    no: 8,
    type: "notice",
    title: "여름철 차량 이용 시 주의사항",
    writer: "관리자",
    date: "2026-06-16",
    views: 87,
  },
  {
    no: 7,
    type: "notice",
    title: "개인정보 처리방침 개정 안내",
    writer: "관리자",
    date: "2026-06-12",
    views: 64,
  },
  {
    no: 6,
    type: "notice",
    title: "차에 강아지 태우면 밴입니다",
    writer: "관리자",
    date: "2026-06-08",
    views: 210,
  },
  {
    no: 5,
    type: "notice",
    title: "차에 고양이 태우면 밴입니다",
    writer: "관리자",
    date: "2026-06-04",
    views: 133,
  },
  {
    no: 4,
    type: "notice",
    title: "충전소 신규 오픈 안내",
    writer: "관리자",
    date: "2026-05-28",
    views: 176,
  },
  {
    no: 3,
    type: "notice",
    title: "마일리지 개편 안내",
    writer: "관리자",
    date: "2026-05-20",
    views: 245,
  },
  {
    no: 2,
    type: "notice",
    title: "업데이트 안내",
    writer: "관리자",
    date: "2026-05-14",
    views: 92,
  },
  {
    no: 1,
    type: "notice",
    title: "EVRE 서비스 오픈 안내",
    writer: "관리자",
    date: "2026-05-01",
    views: 320,
  },
];

const pages = 5;

const Notice = () => {
  const [page, setPage] = useState(0);

  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>공지사항</Title>
        </Header>

        <Table>
          <HeadRow>
            <Cell>번호</Cell>
            <Cell>유형</Cell>
            <Cell>제목</Cell>
            <Cell>작성자</Cell>
            <Cell>작성일</Cell>
            <Cell>조회수</Cell>
          </HeadRow>

          {lists.map((list) => (
            <Row key={list.no}>
              <Cell>{list.no}</Cell>
              <Cell>
                <TypeBadge data-notice={true}>공지</TypeBadge>
              </Cell>
              <Cell>{list.title}</Cell>
              <Cell>{list.writer}</Cell>
              <Cell>{list.date}</Cell>
              <Cell>{list.views}</Cell>
            </Row>
          ))}
        </Table>

        <Pagination>
          <NextButton>이전</NextButton>
          {Array.from({ length: pages }).map((_, p) => (
            <PageButton
              key={p}
              data-active={p === page}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </PageButton>
          ))}
          <NextButton>다음</NextButton>
        </Pagination>
      </Wrap>
    </Spacer>
  );
};

export default Notice;
