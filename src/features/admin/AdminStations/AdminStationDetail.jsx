import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import {
  FormWrap,
  FormLayout,
  FieldSection,
  MapSection,
  FormRow,
  Label,
  Input,
  TextArea,
  AddressRow,
  SearchBtn,
  SplitRow,
  DangerText,
  MapContainer,
  StatusToggleGroup,
  StatusToggleBtn,
  ButtonGroup,
  BottomRow,
  CenterOverlay,
  SubmitBtn,
  BackButton,
  TabGroup,
  TabButton,
  TabContent,
  ChargerStatusToggleGroup,
  ChargerStatusToggleBtn,
  AddBtn,
} from "./StationForm.styles";
import {
  StationTable,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableCell,
  EmptyMsg,
  Pagination,
  PageButton,
  NextButton,
} from "./AdminStations.styles";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const PAGE_GROUP_SIZE = 5;

// geocoder 결과(result[0])에서 주소 문자열과 지역(시/도)을 뽑아낸다
const parseGeocodeResult = (item) => {
  const { road_address, address } = item;
  return {
    address: road_address ? road_address.address_name : address.address_name,
    region: address.region_1depth_name,
  };
};

const AdminStationDetail = () => {
  const { stationNo } = useParams();
  const navi = useNavigate();

  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const mapRef = useRef(null);

  const [tab, setTab] = useState("info"); // "info" | "chargers"

  const [stationName, setStationName] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [chargerCount, setChargerCount] = useState("");
  const [stationDesc, setStationDesc] = useState("");
  const [status, setStatus] = useState("Y");
  const [position, setPosition] = useState(null);

  // TODO: 충전기 목록/수정 API 연동
  const [chargers, setChargers] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({
    size: 10,
    boardCounts: 0,
  });

  // 상세 정보를 불러와서 폼 state에 채워넣는다
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/admin/chargeStations/${stationNo}`);
        const s = res.data.data;
        setStationName(s.stationName ?? "");
        setRegion(s.region ?? "");
        setAddress(s.address ?? "");
        setChargerCount(s.chargerCount != null ? String(s.chargerCount) : "");
        setStationDesc(s.stationDesc ?? "");
        setStatus(s.status ?? "Y");
        if (s.lat && s.lng) setPosition({ lat: s.lat, lng: s.lng });
      } catch (e) {
        console.log("상세 정보를 불러오지 못했습니다.", e);
      }
    };

    fetchData();
  }, [stationNo]);

  // 지도는 최초 1번만 생성한다
  useEffect(() => {
    if (!window.kakao?.maps || !mapContainerRef.current) return;

    const map = new window.kakao.maps.Map(mapContainerRef.current, {
      center: new window.kakao.maps.LatLng(
        DEFAULT_CENTER.lat,
        DEFAULT_CENTER.lng,
      ),
      level: 5,
    });

    mapRef.current = map;
    geocoderRef.current = new window.kakao.maps.services.Geocoder();

    // 지도를 클릭한 위치를 폼 state(position)에 저장
    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });

      geocoderRef.current?.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK) return;

          const { address, region } = parseGeocodeResult(result[0]);
          setAddress(address);
          setRegion(region);
        },
      );
    });

    return () => {
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const res = await api.get(`/admin/chargers/${stationNo}`, {
          params: {
            page: page + 1,
            size: pages.size,
          },
        });
        setChargers(res.data.data.chargers);
        setPages(res.data.data.pageInfo);
      } catch (e) {
        console.log("충전기 목록을 불러오지 못했습니다.", e);
      }
    };

    fetchChargers();
  }, [stationNo, page]);

  // 충전기 상태 토글 - 로컬 state만 바꿔두고, 실제 저장은 onSubmit(수정하기)에서
  // chargers 배열을 순회하며 /admin/charger/{chargerNo} 로 한 번에 반영한다
  const handleChargerStatusChange = (chargerNo, nextStatus) => {
    setChargers((prev) =>
      prev.map((c) =>
        c.chargerNo === chargerNo ? { ...c, status: nextStatus } : c,
      ),
    );
  };

  // position이 바뀔 때마다(지도 클릭, 주소 검색, 최초 데이터 로드) 마커와
  // 지도 중심을 그 위치로 맞춘다
  useEffect(() => {
    if (!mapRef.current || !position) return;

    const latlng = new window.kakao.maps.LatLng(position.lat, position.lng);

    if (markerRef.current) {
      markerRef.current.setPosition(latlng);
    } else {
      markerRef.current = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: latlng,
      });
    }

    mapRef.current.setCenter(latlng);
  }, [position]);

  const geocodeAddress = (addr) =>
    new Promise((resolve) => {
      if (!geocoderRef.current) {
        resolve(null);
        return;
      }
      geocoderRef.current.addressSearch(addr, (result, status) => {
        if (status !== window.kakao.maps.services.Status.OK || !result[0]) {
          resolve(null);
          return;
        }
        resolve({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
          ...parseGeocodeResult(result[0]),
        });
      });
    });

  const handleAddressSearch = async () => {
    if (!address.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    const result = await geocodeAddress(address);
    if (!result) {
      alert("주소를 찾을 수 없습니다.");
      return;
    }

    setPosition({ lat: result.lat, lng: result.lng });
    setAddress(result.address);
    setRegion(result.region);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddressSearch();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    if (chargerCount === "" || Number(chargerCount) < 0) {
      alert("충전기 수를 0대 이상 입력해주세요.");
      return;
    }

    const result = await geocodeAddress(address);
    if (!result) {
      alert(
        "올바른 주소를 입력해주세요. (지도 검색으로 확인되지 않는 주소입니다)",
      );
      return;
    }

    setPosition({ lat: result.lat, lng: result.lng });
    setAddress(result.address);
    setRegion(result.region);

    try {
      await api.patch(`/admin/chargeStations/${stationNo}`, {
        stationName,
        region: result.region,
        address: result.address,
        chargerCount: Number(chargerCount),
        stationDesc,
        status,
        lat: result.lat,
        lng: result.lng,
      });
      // Promise.all 을 해서 충전기 수정이 다 끝날때 까지 대기하고
      // 수정중에 하나라도 실패하면 에러 뜨게 함
      await Promise.all(
        chargers.map((c) =>
          api.patch(`/admin/chargers/${c.chargerNo}`, {
            status: c.status,
            stationNo,
          }),
        ),
      );
      alert("충전소 정보가 수정되었습니다.");
      navi("/admin/stations");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCreateCharger = async () => {
    try {
      await api.post(`/admin/chargers?stationNo=${stationNo}`);

      const res = await api.get(`/admin/chargers/${stationNo}`, {
        params: { page: page + 1, size: pages.size },
      });
      setChargers(res.data.data.chargers);
      setPages(res.data.data.pageInfo);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <FormWrap onSubmit={onSubmit}>
      <TabGroup>
        <TabButton
          type="button"
          data-active={tab === "info"}
          onClick={() => setTab("info")}
        >
          충전소 정보
        </TabButton>
        <TabButton
          type="button"
          data-active={tab === "chargers"}
          onClick={() => setTab("chargers")}
        >
          충전기 관리
        </TabButton>
      </TabGroup>

      <TabContent>
        <FormLayout style={{ display: tab === "info" ? "flex" : "none" }}>
          <FieldSection>
            <FormRow>
              <Label>충전소명</Label>
              <Input
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="서울시청 충전소"
              />
            </FormRow>

            <FormRow>
              <Label>상태</Label>
              <StatusToggleGroup>
                <StatusToggleBtn
                  type="button"
                  data-status="Y"
                  data-active={status === "Y"}
                  onClick={() => setStatus("Y")}
                >
                  정상 운영
                </StatusToggleBtn>
                <StatusToggleBtn
                  type="button"
                  data-status="N"
                  data-active={status === "N"}
                  onClick={() => setStatus("N")}
                >
                  운영 중지
                </StatusToggleBtn>
              </StatusToggleGroup>
            </FormRow>

            <SplitRow>
              <FormRow>
                <Label>지역</Label>
                <Input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="서울"
                  disabled
                />
              </FormRow>
              <FormRow>
                <Label>충전기 수</Label>
                <Input
                  type="number"
                  min="0"
                  max="99"
                  placeholder="0"
                  value={chargerCount}
                  onChange={(e) => setChargerCount(e.target.value)}
                  disabled
                />
              </FormRow>
            </SplitRow>

            <FormRow>
              <Label>주소</Label>
              <AddressRow>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={handleEnter}
                  placeholder="서울특별시 중구 세종대로 110"
                />
                <SearchBtn type="button" onClick={handleAddressSearch}>
                  검색
                </SearchBtn>
              </AddressRow>
            </FormRow>

            <FormRow>
              <Label>충전소 설명</Label>
              <TextArea
                value={stationDesc}
                onChange={(e) => setStationDesc(e.target.value)}
                placeholder="서울시청입니다."
              />
            </FormRow>
          </FieldSection>

          <MapSection>
            <Label>지도</Label>
            <MapContainer ref={mapContainerRef} />
          </MapSection>
        </FormLayout>

        {tab === "chargers" && (
          <div>
            {chargers.length === 0 ? (
              <EmptyMsg>등록된 충전기가 없습니다.</EmptyMsg>
            ) : (
              <StationTable>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>충전기 번호</TableHeaderCell>
                    <TableHeaderCell>상태</TableHeaderCell>
                    <TableHeaderCell>
                      <AddBtn type="button" onClick={handleCreateCharger}>
                        충전기 추가하기
                      </AddBtn>
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  {chargers.map((c) => (
                    <TableRow key={c.chargerNo}>
                      <TableCell>{c.chargerNo}</TableCell>
                      <TableCell>
                        <ChargerStatusToggleGroup>
                          <ChargerStatusToggleBtn
                            type="button"
                            data-status="Y"
                            data-active={c.status === "Y"}
                            onClick={() =>
                              handleChargerStatusChange(c.chargerNo, "Y")
                            }
                          >
                            정상
                          </ChargerStatusToggleBtn>
                          <ChargerStatusToggleBtn
                            type="button"
                            data-status="N"
                            data-active={c.status === "N"}
                            onClick={() =>
                              handleChargerStatusChange(c.chargerNo, "N")
                            }
                          >
                            고장
                          </ChargerStatusToggleBtn>
                        </ChargerStatusToggleGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </StationTable>
            )}
          </div>
        )}
      </TabContent>

      <BottomRow>
        <ButtonGroup>
          <SubmitBtn type="submit">수정하기</SubmitBtn>
          <BackButton type="button" onClick={() => navi("/admin/stations")}>
            뒤로가기
          </BackButton>
        </ButtonGroup>

        {tab === "chargers" && chargers.length > 0 && (
          <CenterOverlay>
            <Pagination>
              {currentGroup > 0 && (
                <PageButton
                  type="button"
                  onClick={() => setPage(groupStart - 1)}
                  data-active={true}
                >
                  ··
                </PageButton>
              )}
              {page > 0 && (
                <NextButton type="button" onClick={() => setPage(page - 1)}>
                  이전
                </NextButton>
              )}
              {Array.from({
                length: groupEnd - groupStart,
              }).map((_, i) => {
                const p = groupStart + i;
                return (
                  <PageButton
                    key={p}
                    type="button"
                    data-active={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p + 1}
                  </PageButton>
                );
              })}
              {page < totalPages - 1 && (
                <NextButton type="button" onClick={() => setPage(page + 1)}>
                  다음
                </NextButton>
              )}
              {groupStart + PAGE_GROUP_SIZE < totalPages && (
                <PageButton
                  type="button"
                  onClick={() => setPage(groupStart + PAGE_GROUP_SIZE)}
                  data-active={true}
                >
                  ··
                </PageButton>
              )}
            </Pagination>
          </CenterOverlay>
        )}
      </BottomRow>
    </FormWrap>
  );
};

export default AdminStationDetail;
