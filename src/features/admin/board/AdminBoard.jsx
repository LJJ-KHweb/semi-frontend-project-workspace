import { useEffect, useState } from "react";
import { AdminCell } from "./styles/AdminBoard.styles";
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
} from "../../boards/styles/Board.styles";
import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const PAGE_GROUP_SIZE = 5;

const AdminBoard = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [boards, setBoards] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    api
      .get(`/admin/boards?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        setBoards(result.data.data.boards);
        setPages(result.data.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
        alert("관리자 게시글 목록 조회 실패");
      });
    console.log(boards);
  }, [page]);

  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>게시글 관리</Title>
        </Header>

        <Table>
          <HeadRow>
            <Cell>번호</Cell>
            <Cell>작성자</Cell>
            <Cell>제목</Cell>
            <Cell>작성일</Cell>
            <Cell>조회수</Cell>
            <Cell>상태</Cell>
          </HeadRow>

          {boards.map((board) => (
            <Row
              key={board.boardNo}
              onClick={() => navi(`/admin/boards/${board.boardNo}`)}
            >
              <Cell>{board.boardNo}</Cell>
              <Cell>{board.userId}</Cell>
              <Cell>{board.boardTitle}</Cell>
              <Cell>{board.createDate}</Cell>
              <Cell>{board.views}</Cell>
              <Cell>{board.status === "Y" ? "정상" : "삭제됨"}</Cell>
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

export default AdminBoard;
