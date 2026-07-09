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

      setRequires(result.data.data);
    });
  }, [page]);
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  return <></>;
};

export default Require;
