import { useEffect, useState } from "react";
import axios from "axios";
import {
  AdminStationsWrap,
  EmptyMsg,
  NextButton,
  PageButton,
  Pagination,
  StationTable,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  StatusBadge,
} from "./AdminStations.styles";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios";

const PAGE_GROUP_SIZE = 5;

const AdminStations = () => {
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(0);
  // 뒷단에서 어드민은 size 늘려줘야함
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 어드민 뒷단 끝내고 수정 해야함
        const res = await api.get("http://localhost/api/admin/chargeStations", {
          params: {
            page: page + 1,
            size: pages.size,
          },
        });
        // console.log(res.data.data.stations);
        setStations(res.data.data.stations);
        setPages(res.data.data.pageInfo);
      } catch (e) {
        setError("충전소 정보를 불러오지 못했습니다.");
      }
    };

    fetchData();
  }, [page]);

  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <AdminStationsWrap>
      {error && <EmptyMsg>{error}</EmptyMsg>}
      {!error && stations.length === 0 && (
        <EmptyMsg>등록된 충전소가 없습니다.</EmptyMsg>
      )}
      {!error && stations.length > 0 && (
        <>
          <StationTable>
            <TableHead>
              <TableRow>
                <TableHeaderCell>번호</TableHeaderCell>
                <TableHeaderCell>충전소명</TableHeaderCell>
                <TableHeaderCell>지역</TableHeaderCell>
                <TableHeaderCell>주소</TableHeaderCell>
                {/*추후에 상태 누르면 정렬 되게*/}
                <TableHeaderCell>상태</TableHeaderCell>
                <TableHeaderCell>충전기 수</TableHeaderCell>
                <TableHeaderCell>고장난 충전기 수</TableHeaderCell>
                <TableHeaderCell>등록일</TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {stations.map((s) => (
                <TableRow key={s.stationNo}>
                  <TableCell>{s.stationNo}</TableCell>
                  <TableCell>{s.stationName}</TableCell>
                  <TableCell>{s.region}</TableCell>
                  <TableCell>{s.address}</TableCell>
                  <TableCell>
                    {s.status === "Y" ? (
                      <StatusBadge data-status="Y">정상 운영</StatusBadge>
                    ) : (
                      <StatusBadge data-status="N">운영 중지</StatusBadge>
                    )}
                  </TableCell>
                  <TableCell>{s.chargerCount}</TableCell>
                  <TableCell>{s.unableChargerCount}</TableCell>
                  <TableCell>{s.createDate}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </StationTable>
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
        </>
      )}
    </AdminStationsWrap>
  );
};

export default AdminStations;
