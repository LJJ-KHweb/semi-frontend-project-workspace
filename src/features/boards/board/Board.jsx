import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
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
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const PAGE_GROUP_SIZE = 5;

const Board = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [boards, setBoards] = useState([]);
  const [notices, setNotices] = useState([]);
  const navi = useNavigate();

  const { isLogin } = useAuth();

  useEffect(() => {
    api.get(`/boards?page=${page + 1}&size=${pages.size}`).then((result) => {
      console.log(result);
      setBoards(result.data.data.boards);
      setNotices(result.data.data.notices);
      setPages(result.data.data.pageInfo);
    });
  }, [page]);
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>게시판</Title>

          {isLogin && (
            <WriteButton onClick={() => navi("/boards/form")}>
              게시글 작성하기
            </WriteButton>
          )}
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

          {notices.map((n) => (
            <Row
              key={n.noticeNo}
              onClick={() => navi(`/notices/detail/${n.noticeNo}`)}
            >
              <Cell>{n.noticeNo}</Cell>
              <Cell>
                <TypeBadge data-notice={true}>공지</TypeBadge>
              </Cell>
              <Cell>{n.noticeTitle}</Cell>
              <Cell>{n.userName}</Cell>
              <Cell>{n.createDate}</Cell>
              <Cell>{n.views}</Cell>
            </Row>
          ))}

          {boards.map((list) => (
            <Row
              key={list.boardNo}
              onClick={() => navi(`/boards/detail/${list.boardNo}`)}
            >
              <Cell>{list.boardNo}</Cell>
              <Cell>
                <TypeBadge data-notice={false}>일반</TypeBadge>
              </Cell>
              <Cell>{list.boardTitle}</Cell>
              <Cell>{list.userName}</Cell>
              <Cell>{list.createDate}</Cell>
              <Cell>{list.views}</Cell>
            </Row>
          ))}
        </Table>

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
      </Wrap>
    </Spacer>
  );
};
export default Board;
