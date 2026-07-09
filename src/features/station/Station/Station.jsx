import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Spacer } from "../../../App.styles";
import {
  MapCard,
  StationListCard,
  Title,
  StationWarp,
  Wrap,
  StationCard,
  DistanceGroup,
  DistanceButton,
  Pagination,
  PageButton,
  NextButton,
  StationContnet,
  ErrorMsg,
} from "../styles/Station.styles";
import MapApi from "../MapApi/MapApi";
import api from "../../../api/axios";

const DISTANCES = [1, 5, 10, 20];
// 한 번에 보여질 페이지 버튼 개수
const PAGE_GROUP_SIZE = 3;

const Map = () => {
  const [distance, setDistance] = useState(DISTANCES[0]);
  const [page, setPage] = useState(0);
  const [stations, setStations] = useState([]);
  const [coords, setCoords] = useState({ lat: 37.5665, lng: 126.978 });
  const [pages, setPages] = useState({ size: 3, boardCounts: 0 });
  const [focus, setFocus] = useState(null);
  const [error, setError] = useState(null);
  const [pinned, setPinned] = useState(false); // 사용자가 지도를 클릭해서 위치를 직접 찍었는지

  useEffect(() => {
    // 브라우저에서 제공하는 API 사용자의 현재 위치를 1회성으로 조회하는 함수
    // 요청 실패시 useState에 적힌 기본 위도 경도로 이동
    // 1회성 조회라 자동 갱신은 못함
    // 이동갱신하려면 getCurrentPosition -> watchPosition 으로 변경해야함
    // 충전소 조회라 1회성으로 만 갱신함
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log("위치 조회 실패", err),
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/chargeStations", {
          params: {
            page: page + 1,
            lat: coords.lat,
            lng: coords.lng,
            dist: distance,
          },
        });
        setStations(res.data.data.stations);
        setPages(res.data.data.pageInfo);
        setError(null);
        // console.log(res.data.data.stations);
      } catch (e) {
        setError("충전소 정보를 불러오지 못했습니다.");
      }
    };

    fetchData();
  }, [distance, page, coords]);

  // 전체 페이지 수(소수점 올림 ex) 충전소 7개 / 3개씩 = 3페이지)
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  // 현재 페이지가 몇 번째 그룹인지(PAGE_GROUP_SIZE개씩 묶음, 0부터 시작 ex) 1~3페이지 -> 0그룹/ 4~6페이지 -> 1그룹)
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  // 현재 그룹의 첫 페이지 인덱스( ex) 1그룹 -> 3)
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  // 현재 그룹의 마지막 페이지 인덱스( ex) 0그룹 총 8페이지 -> min(0+3, 8) = 3/ 1그룹 총 8페이지 -> min(3+3, 8) = 6)
  // Math.min == 둘 중 더 작은 값을 반환하는 메서드( ex)10, 8 == 8)
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  // 지도를 클릭하면 그 위치를 조회 기준으로 삼아 다시 조회
  const handleMapClick = useCallback((clicked) => {
    setCoords(clicked);
    setPinned(true);
    setPage(0);
  }, []);

  const positions = useMemo(
    () =>
      stations.map((s) => ({
        stationNo: s.stationNo,
        name: s.stationName,
        region: s.region,
        address: s.address,
        chargers: s.chargerCount,
        lat: s.lat,
        lng: s.lng,
      })),
    [stations],
  );

  return (
    <Spacer>
      <Wrap>
        <Title>전기차 충전소 조회</Title>
        <StationWarp>
          <StationListCard>
            <DistanceGroup>
              {DISTANCES.map((d) => (
                <DistanceButton
                  key={d}
                  data-active={d === distance}
                  onClick={() => {
                    setDistance(d);
                    setPage(0);
                  }}
                >
                  {d}km
                </DistanceButton>
              ))}
            </DistanceGroup>

            {
              error && (
                <ErrorMsg>{error}</ErrorMsg>
              ) /* DB에 연결하지 못함, 뒷단 Error */
            }
            {!error &&
              stations.length === 0 && ( // DB에서 조회된 정보가 없음
                <ErrorMsg>조회된 충전소가 없습니다.</ErrorMsg>
              )}
            {!error &&
              stations.length > 0 && // staions에 값이 1개 이상 있을때(0보다 클때)
              stations.map((s) => (
                <StationCard
                  key={s.stationNo}
                  onClick={() => setFocus({ lat: s.lat, lng: s.lng })} // 여기에서 focus state에 클릭한 station의 lat, lng를 담음
                >
                  <StationContnet data-type="title">
                    {s.stationName}
                  </StationContnet>
                  <StationContnet data-type="point">
                    지역 : {s.region}
                  </StationContnet>
                  <StationContnet>주소 : {s.address}</StationContnet>
                  <StationContnet data-type="charger">
                    충전기 {s.chargerCount}대 이용가능
                  </StationContnet>
                </StationCard>
              ))}
            {/* 페이지 버튼 */}
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
              {/* Array.from({ length: n }) -> n개의 undefined로 채워진 배열 생성 (순회 횟수만 필요할 때 사용) */}
              {/* 데이터 배열을 순회할 땐 값(p.page 등)을 쓰지만, 여기선 값이 undefined라 인덱스 i만 사용 -> _ 로 표시 */}
              {/* ex) 0그룹 총 8페이지 -> length: 5-0 = 5개 버튼 / 1그룹 총 8페이지 -> length: 8-5 = 3개 버튼 */}
              {Array.from({ length: groupEnd - groupStart }).map((_, i) => {
                // groupStart에 i를 더해 현재 그룹의 실제 페이지 인덱스를 계산( ex) 1그룹: 5+0, 5+1, 5+2 ...)
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
            {/* 페이지 버튼 */}
          </StationListCard>
          <MapCard>
            <MapApi
              center={coords}
              focus={focus}
              positions={positions}
              onMapClick={handleMapClick}
              pinned={pinned}
            />
          </MapCard>
        </StationWarp>
      </Wrap>
    </Spacer>
  );
};

export default Map;
