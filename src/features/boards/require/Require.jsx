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

const Require = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [requires, setRequires] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    api.get(`/requires?page=${page + 1}&size=${pages.size}`).then((result) => {
      console.log(result.data.data);

      setRequires(result.data.data.requires);
      setPages(result.data.data.pageInfo);
    });
  }, [page]);
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  return (
    <Wrap>
      <Header>
        <Title>문의사항</Title>

        <WriteButton onClick={() => navi("/require/write")}>
          문의 작성
        </WriteButton>
      </Header>

      <Table>
        <HeadRow>
          <Cell flex={1}>번호</Cell>
          <Cell flex={6}>제목</Cell>
          <Cell flex={2}>작성일</Cell>
        </HeadRow>

        {requires.map((require) => (
          <Row
            key={require.requireNo}
            onClick={() => navi(`/require/${require.requireNo}`)}
          >
            <Cell flex={1}>{require.requireNo}</Cell>

            <Cell flex={6}>{require.requireTitle}</Cell>

            <Cell flex={2}>{require.createDate}</Cell>
          </Row>
        ))}
      </Table>

      <Spacer />

      <Pagination>
        {page > 0 && (
          <NextButton onClick={() => setPage(page - 1)}>이전</NextButton>
        )}

        {Array.from(
          { length: groupEnd - groupStart },
          (_, i) => groupStart + i,
        ).map((pageNumber) => (
          <PageButton
            key={pageNumber}
            active={page === pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber + 1}
          </PageButton>
        ))}

        {page < totalPages - 1 && (
          <NextButton onClick={() => setPage(page + 1)}>다음</NextButton>
        )}
      </Pagination>
    </Wrap>
  );
};

export default Require;
