import { useState } from "react";
import {
  Wrap,
  Header,
  Title,
  WriteButton,
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
    type: "nomal",
    title: "user01이 글을 씀2222",
    writer: "user01",
    date: "2026-06-15",
    views: 41,
  },
  {
    no: 7,
    type: "nomal",
    title: "user01이 글을 씀",
    writer: "user01",
    date: "2026-06-14",
    views: 67,
  },
  {
    no: 6,
    type: "nomal",
    title: "삼겹살 먹고 싶다",
    writer: "두리",
    date: "2026-06-13",
    views: 33,
  },
  {
    no: 5,
    type: "nomal",
    title: "뭉치 돼지임ㅋ",
    writer: "아토",
    date: "2026-06-12",
    views: 58,
  },
  {
    no: 4,
    type: "nomal",
    title: "나는 뭉치",
    writer: "mungchi",
    date: "2026-06-11",
    views: 22,
  },
  {
    no: 3,
    type: "nomal",
    title: "나는 아토",
    writer: "ato",
    date: "2026-06-10",
    views: 14,
  },
  {
    no: 2,
    type: "nomal",
    title: "나는 두리",
    writer: "doori",
    date: "2026-06-09",
    views: 76,
  },
  {
    no: 1,
    type: "nomal",
    title: "내가 첫번째 글이다",
    writer: "user01",
    date: "2026-06-08",
    views: 5,
  },
];

const pages = 5;

const Board = () => {
  const [page, setPage] = useState(0);

  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>게시판</Title>
          <WriteButton>게시글 작성하기</WriteButton>
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
                <TypeBadge data-notice={list.type === "notice"}>
                  {list.type === "notice" ? "공지" : "일반"}
                </TypeBadge>
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

export default Board;
