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
} from "./AdminStations.styles";

const PAGE_GROUP_SIZE = 5;

const AdminStations = () => {
  const [coords, setCoords] = useState({ lat: 37.5665, lng: 126.978 });
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(0);
  // 뒷단에서 어드민은 size 늘려줘야함
  const [pages, setPages] = useState({ size: 3, boardCounts: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log("위치 조회 실패", err),
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 어드민 뒷단 끝내고 수정 해야함
        const res = await axios.get("http://localhost/api/chargeStations", {
          params: {
            page: page + 1,
            lat: coords.lat,
            lng: coords.lng,
            dist: 100000,
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
  }, [page, coords]);

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
                <TableHeaderCell>충전기 수</TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {stations.map((s) => (
                <TableRow key={s.stationNo}>
                  <TableCell>{s.stationNo}</TableCell>
                  <TableCell>{s.stationName}</TableCell>
                  <TableCell>{s.region}</TableCell>
                  <TableCell>{s.address}</TableCell>
                  <TableCell>{s.chargerCount}</TableCell>
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
