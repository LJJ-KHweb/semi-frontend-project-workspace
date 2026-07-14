import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
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
  WriteButton,
} from "../styles/Board.styles";
import { Spacer } from "../../../App.styles";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const PAGE_GROUP_SIZE = 5;

const Notice = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [notices, setNotices] = useState([]);
  const navi = useNavigate();

  const { user } = useAuth();

  const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "[ROLE_ADMIN]";

  useEffect(() => {
    api.get(`/notices?page=${page + 1}&size=${pages.size}`).then((result) => {
      console.log(result);
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
          <Title>공지사항</Title>

          {isAdmin && (
            <WriteButton onClick={() => navi("/notices/form")}>
              공지사항 작성하기
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
              <Cell>{n.noticeWriter}</Cell>
              <Cell>{n.createDate}</Cell>
              <Cell>{n.views}</Cell>
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

export default Notice;
