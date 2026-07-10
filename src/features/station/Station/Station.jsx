import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spacer } from "../../../App.styles";
import {
  MapCard,
  StationListCard,
  Title,
  StationWarp,
  Wrap,
  StationListBody,
  StationCard,
  StationCardHeader,
  StationName,
  RegionBadge,
  StationAddress,
  ChargerInfoRow,
  ChargerInfo,
  CardDetailBtn,
  AddressSearchRow,
  AddressInput,
  AddressSearchBtn,
  DistanceGroup,
  DistanceButton,
  Pagination,
  PageButton,
  NextButton,
  ErrorMsg,
} from "../styles/Station.styles";
import MapApi from "../MapApi/MapApi";
import api from "../../../api/axios";

const DISTANCES = [1, 5, 10, 20];
// 한 번에 보여질 페이지 버튼 개수
const PAGE_GROUP_SIZE = 5;

const Map = () => {
  const navi = useNavigate();
  const [distance, setDistance] = useState(DISTANCES[0]);
  const [page, setPage] = useState(0);
  const [stations, setStations] = useState([]);
  const [coords, setCoords] = useState(null);
  const [myLocation, setMyLocation] = useState(null); // 실제 GPS(또는 기본) 위치 - 검색 기준(coords)과 별개로 "내 위치" 마커 표시용
  const [pages, setPages] = useState({ size: 4, boardCounts: 0 });
  const [focus, setFocus] = useState(null);
  const [error, setError] = useState(null);
  const [pinned, setPinned] = useState(false); // 사용자가 지도를 클릭해서 위치를 직접 찍었는지
  const [addressInput, setAddressInput] = useState("");
  const geocoderRef = useRef(null);

  useEffect(() => {
    // 브라우저에서 제공하는 API 사용자의 현재 위치를 1회성으로 조회하는 함수
    // 요청 실패시 useState에 적힌 기본 위도 경도로 이동
    // 1회성 조회라 자동 갱신은 못함
    // 이동갱신하려면 getCurrentPosition -> watchPosition 으로 변경해야함
    // 충전소 조회라 1회성으로 만 갱신함
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(loc);
        setMyLocation(loc);
      },
      (err) => {
        console.log("위치 조회 실패", err);
        const loc = { lat: 37.5665, lng: 126.978 }; // 조회 실패 시 기본 좌표(서울시청)로 대체
        setCoords(loc);
        setMyLocation(loc);
      },
    );
  }, []);

  useEffect(() => {
    if (!coords) return; // 아직 좌표를 확인하지 못했으면 요청하지 않음

    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await api.get("/chargeStations", {
          params: {
            size: pages.size,
            page: page + 1,
            lat: coords.lat,
            lng: coords.lng,
            dist: distance,
          },
        });
        if (ignore) return;
        setStations(res.data.data.stations);
        setPages((prev) => ({
          ...prev,
          boardCounts: res.data.data.pageInfo.boardCounts,
        }));
        setError(null);
      } catch (e) {
        if (ignore) return;
        setStations([]);
        // 반경 안에 충전소가 없는 경우 백엔드가 404를 내려주는데,
        // 이건 에러가 아니라 빈 결과이므로 에러 메시지를 띄우지 않는다
        if (e.response?.status === 404) {
          setError(null);
        } else {
          setError("충전소 정보를 불러오지 못했습니다.");
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
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

  // 입력한 주소를 좌표로 변환해서 그 위치를 조회 기준으로 삼는다
  // showAlert: 검색 버튼/Enter로 직접 실행했을 때만 실패 알림을 띄우고,
  //            입력 중 자동 검색(디바운스)일 때는 조용히 무시한다
  const searchAddress = useCallback((query, showAlert) => {
    if (!query.trim()) {
      if (showAlert) alert("주소를 입력해주세요.");
      return;
    }
    if (!window.kakao?.maps?.services) return;

    if (!geocoderRef.current) {
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
    }

    geocoderRef.current.addressSearch(query, (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        if (showAlert) alert("주소를 찾을 수 없습니다.");
        return;
      }

      setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
      setPinned(true);
      setPage(0);
    });
  }, []);

  const handleAddressSearch = () => searchAddress(addressInput, true);

  const handleAddressKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddressSearch();
    }
  };

  // 한 글자 입력할 때마다(디바운스 걸어서) 자동으로 주소를 좌표로 변환해 조회
  useEffect(() => {
    if (!addressInput.trim()) return;

    const timer = setTimeout(() => {
      searchAddress(addressInput, false);
    }, 400);

    return () => clearTimeout(timer);
  }, [addressInput, searchAddress]);

  const positions = useMemo(
    () =>
      stations.map((s) => ({
        stationNo: s.stationNo,
        name: s.stationName,
        region: s.region,
        address: s.address,
        chargers: s.chargerCount,
        unableChargers: s.unableChargerCount,
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
            <AddressSearchRow>
              <AddressInput
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                onKeyDown={handleAddressKeyDown}
                placeholder="서울특별시 중구 세종대로 110"
              />
              <AddressSearchBtn type="button" onClick={handleAddressSearch}>
                검색
              </AddressSearchBtn>
            </AddressSearchRow>
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

            <StationListBody>
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
                    <StationCardHeader>
                      <StationName>{s.stationName}</StationName>
                      <RegionBadge>{s.region}</RegionBadge>
                    </StationCardHeader>
                    <StationAddress>{s.address}</StationAddress>
                    <ChargerInfoRow>
                      <ChargerInfo data-type="available">
                        이용가능 {s.chargerCount}대
                      </ChargerInfo>
                      <ChargerInfo
                        data-type="unable"
                        data-has={s.unableChargerCount > 0}
                      >
                        고장 {s.unableChargerCount}대
                      </ChargerInfo>
                      <CardDetailBtn
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // 카드 자체의 onClick(포커스 이동)까지 같이 안 타게 막음
                          navi(`/chargeStations/${s.stationNo}`);
                        }}
                      >
                        상세보기
                      </CardDetailBtn>
                    </ChargerInfoRow>
                  </StationCard>
                ))}
            </StationListBody>
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
            {coords && (
              <MapApi
                center={coords}
                myLocation={myLocation}
                focus={focus}
                positions={positions}
                onMapClick={handleMapClick}
                onMarkerClick={(pos) => {
                  setFocus(pos);
                  setPinned(false); // 다른 충전소 핀에 포커스되면 내가 찍은 위치 핀은 지운다
                }}
                pinned={pinned}
              />
            )}
          </MapCard>
        </StationWarp>
      </Wrap>
    </Spacer>
  );
};

export default Map;
