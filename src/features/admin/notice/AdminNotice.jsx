// src/features/admin/notice/AdminNotice.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";
import {
  Wrap,
  Header,
  Title,
  Table,
  HeadRow,
  Row,
  Cell,
  Pagination,
  PageButton,
  NextButton,
} from "../../boards/styles/Board.styles";

const PAGE_GROUP_SIZE = 5;

const AdminNotice = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, noticeCounts: 0 });
  const [notices, setNotices] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    api
      .get(`/admin/notices?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        console.log(result.data.data);

        setNotices(result.data.data.notices);
        setPages(result.data.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
        alert("관리자 공지사항 목록 조회 실패");
      });
  }, [page]);

  const totalPages = Math.ceil(pages.noticeCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <Spacer>
      <Wrap>
        <Header>
          <Title>공지사항 관리</Title>
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

          {notices.map((notice) => (
            <Row
              key={notice.noticeNo}
              onClick={() => navi(`/admin/notices/${notice.noticeNo}`)}
            >
              <Cell>{notice.noticeNo}</Cell>
              <Cell>{notice.userName}</Cell>
              <Cell>{notice.noticeTitle}</Cell>
              <Cell>{notice.createDate}</Cell>
              <Cell>{notice.views}</Cell>
              <Cell>{notice.status === "Y" ? "정상" : "삭제됨"}</Cell>
            </Row>
          ))}
        </Table>

        <Pagination>
          {currentGroup > 0 && (
            <PageButton onClick={() => setPage(groupStart - 1)} data-active>
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
              data-active
            >
              ··
            </PageButton>
          )}
        </Pagination>
      </Wrap>
    </Spacer>
  );
};

export default AdminNotice;
