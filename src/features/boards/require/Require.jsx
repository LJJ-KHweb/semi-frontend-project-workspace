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
      setRequires(result.data.data.requires);
      setPages(result.data.data.pageInfo);
    });
  }, [page]);

  const totalPages = Math.max(
    1,
    Math.ceil((pages.boardCounts ?? 0) / pages.size),
  );
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>문의사항</Title>

          <WriteButton onClick={() => navi("/requires/write")}>
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
              onClick={() => navi(`/requires/${require.requireNo}`)}
            >
              <Cell flex={1}>{require.requireNo}</Cell>
              <Cell flex={6}>{require.requireTitle}</Cell>
              <Cell flex={2}>{require.createDate}</Cell>
            </Row>
          ))}
        </Table>

        {totalPages > 1 && (
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
        )}
      </Wrap>
    </Spacer>
  );
};

export default Require;
