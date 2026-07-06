import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {
  ExitButton,
  OverlayBtnGroup,
  OverlayButton,
  OverlayCard,
} from "../styles/MapOverlay.styles";
import { StationContnet } from "../styles/Station.styles";
import { useNavigate } from "react-router-dom";

const USER_MARKER_IMAGE_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#2563EB" stroke="#fff" stroke-width="3"/></svg>',
  );

const MapApi = ({ positions, center, level = 3, focus, interactive = true }) => {
  // MapApi는 앱의 메인 트리(Router 컨텍스트) 안에 있어서 useNavigate 사용 가능.
  // MapOverlay는 별도의 createRoot로 렌더링되는 독립된 트리라 Router 컨텍스트가
  // 없으므로, 여기서 만든 navi 함수를 그대로 props로 내려서 써야 한다.
  const navi = useNavigate();
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const rootsRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao?.maps || !containerRef.current) return;

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    mapRef.current = map;

    const stationEntries = positions.map(
      ({ stationNo, name, region, address, chargers, lat, lng }) => {
        const position = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({ map, position, name });

        // interactive가 false면(예: 상세 페이지에서 스테이션 하나만 보여줄 때)
        // 오버레이/클릭 이벤트를 아예 안 붙이고 마커만 표시한다.
        if (!interactive) {
          return { marker, rootRef: { current: null }, overlay: null };
        }

        // 카카오 CustomOverlay는 content에 리액트가 만든 DOM 노드를 직접 넘기면
        // 내용이 비어서 렌더링되지 않음(확인됨). 대신 빈 껍데기 문자열을 넘겨서
        // 카카오가 실제 DOM에 삽입하게 한 뒤, 그 노드를 id로 찾아 리액트를 마운트한다.
        // id는 index처럼 재사용되는 값이 아니라 crypto.randomUUID()로 매번 새로
        // 생성한다. overlay.setMap(null)이 DOM을 완전히 지우지 않고 숨기기만 해서,
        // index를 재사용하면 옛 오버레이의 id와 충돌해 "이미 createRoot된 컨테이너"
        // 에러가 났기 때문 (id를 겹치지 않게 만들면 그 충돌 자체가 발생하지 않음).
        const containerId = `${crypto.randomUUID()}`;
        const overlay = new window.kakao.maps.CustomOverlay({
          content: `<div id="${containerId}" />`,
          position,
        });

        const rootRef = { current: null };
        window.kakao.maps.event.addListener(marker, "click", () => {
          overlay.setMap(map);
          if (!rootRef.current) {
            const container = document.getElementById(containerId);
            rootRef.current = createRoot(container);
            rootRef.current.render(
              <MapOverlay
                stationNo={stationNo}
                name={name}
                region={region}
                address={address}
                chargers={chargers}
                navi={navi}
                onClose={() => overlay.setMap(null)}
              />,
            );
          }
        });

        return { marker, rootRef, overlay };
      },
    );

    const userMarker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(center.lat, center.lng),
      name: "내 위치",
      image: new window.kakao.maps.MarkerImage(
        USER_MARKER_IMAGE_SRC,
        new window.kakao.maps.Size(24, 24),
      ),
    });

    markersRef.current = [
      ...stationEntries.map(({ marker }) => marker),
      userMarker,
    ];
    rootsRef.current = stationEntries.map(({ rootRef, overlay }) => ({
      rootRef,
      overlay,
    }));

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      // queueMicrotask는 브라우저에서 기본으로 제공하는 함수
      // 넘겨준 실행 중인 코드가 다 끝난 직후, 아주 짧은 시간 뒤에 실행되도록 예약하는 함수 라고함..
      // positions/center가 마운트 직후 연달아 바뀌면(geolocation → 스테이션 fetch 순서)
      // 이 effect가 빠르게 재실행되면서, 직전 root의 렌더링(커밋)이 끝나기도 전에
      // unmount() 호출되어 경고가 발생함.
      // queueMicrotask로 감싸 현재 렌더링 사이클이 끝난 직후로 미뤄서 회피.
      queueMicrotask(() => {
        rootsRef.current.forEach(({ rootRef, overlay }) => {
          overlay?.setMap(null); // 열려있던 오버레이를 지도에서 확실히 제거 (id 재사용 시 충돌 방지)
          rootRef.current?.unmount(); // 클릭 전이라 아직 마운트 안 된 경우 대비
        });
      });
    };
  }, [positions, center, level]);

  // Station.jsx에서 카드 클릭 시 setFocus({ lat, lng })가 호출됨
  // focus가 바뀌면 이 useEffect가 실행되어 지도 중심을 해당 좌표로 이동
  // focus가 null이면 (초기값) 아무것도 하지 않음
  useEffect(() => {
    if (!mapRef.current || !focus) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(focus.lat, focus.lng),
    );
  }, [focus]); // focus가 바뀔 때마다 실행

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

const MapOverlay = ({
  stationNo,
  name,
  region,
  address,
  chargers,
  navi,
  onClose,
}) => {
  const toDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost/api/chargeStations/${stationNo}`,
      );
      // console.log(res.data);
    } catch (e) {
      console.log("상세 정보를 불러오지 못했습니다.", e);
    } finally {
      navi(`/chargeStations/${stationNo}`);
    }
  };

  return (
    <OverlayCard>
      <StationContnet data-type="title">{name}</StationContnet>
      <StationContnet data-type="point">지역 : {region}</StationContnet>
      <StationContnet>주소 : {address}</StationContnet>
      <StationContnet data-type="charger">
        충전기 {chargers}대 이용가능
      </StationContnet>
      <OverlayBtnGroup>
        <ExitButton onClick={onClose}>닫기</ExitButton>
        <OverlayButton onClick={toDetail}>상세보기</OverlayButton>
      </OverlayBtnGroup>
    </OverlayCard>
  );
};

export default MapApi;
