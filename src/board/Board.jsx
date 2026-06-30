import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Board = () => {
  const [pageNo, setPageNo] = useState(0);
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    axios.get(`http://192.168.51.4/api/boards?page=${pageNo}`).then((res) => {
      console.log(res.data.data);
      setBoards(res.data.data.boards);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
        </tr>
      </thead>

      <tbody>
        {boards.map((board) => (
          <tr key={board.boardNo}>
            <td>{board.boardNo}</td>
            <td>{board.boardTitle}</td>
            <td>{board.writer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
