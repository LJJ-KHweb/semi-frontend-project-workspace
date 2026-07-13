import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {
  ExitButton,
  OverlayAddress,
  OverlayBtnGroup,
  OverlayButton,
  OverlayCard,
  OverlayHeader,
  OverlayTitle,
} from "../styles/MapOverlay.styles";
import {
  ChargerInfo,
  ChargerInfoRow,
  RegionBadge,
} from "../styles/Station.styles";
import { useNavigate } from "react-router-dom";

const USER_MARKER_IMAGE_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#2563EB" stroke="#fff" stroke-width="3"/></svg>',
  );

// 사용자가 지도를 클릭해서 직접 찍은 위치를 표시하는 핀 모양 마커
const PIN_MARKER_IMAGE_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36"><path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.3 21.7 0 14 0z" fill="#DC2626" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="5" fill="#fff"/></svg>',
  );

const MapApi = ({
  positions,
  center,
  myLocation,
  level = 3,
  focus,
  interactive = true,
  onMapClick,
  onMarkerClick,
  pinned = false,
}) => {
  // MapApi는 앱의 메인 트리(Router 컨텍스트) 안에 있어서 useNavigate 사용 가능.
  // MapOverlay는 별도의 createRoot로 렌더링되는 독립된 트리라 Router 컨텍스트가
  // 없으므로, 여기서 만든 navi 함수를 그대로 props로 내려서 써야 한다.
  const navi = useNavigate();
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const rootsRef = useRef([]);
  const centerMarkerRef = useRef(null);
  const mapRef = useRef(null);

  // onMapClick은 매 렌더마다 새로 만들어지는 함수라 ref로 최신값만 참조하고,
  // 리스너 자체는 지도 생성 시 딱 한 번만 등록한다.
  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;

  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  // 지도는 컨테이너당 최초 1번만 생성한다.
  // (center/positions가 바뀔 때마다 new kakao.maps.Map()을 다시 만들면
  //  같은 컨테이너 위에 지도가 계속 새로 그려지면서 이전 마커/핀이 정리 안 되고
  //  남아있는 문제가 있었음 → 지도는 재사용하고 마커만 갈아끼우는 방식으로 변경)
  useEffect(() => {
    if (!window.kakao?.maps || !containerRef.current) return;

    // 카카오맵은 click이 아니라 mousedown/mouseup 단계에서 자체적으로 클릭을
    // 감지해버려서, click 이벤트에서 stopPropagation을 걸어도 이미 늦음
    // (실측 확인함: stopPropagation, kakao.maps.event.preventMap 둘 다 안 먹혔음).
    // 오버레이 카드 안쪽 클릭이면 지도 컨테이너까지 못 올라가게 버블 단계에서
    // 끊는다. 단, 캡처 단계에서 끊으면 오버레이 안의 버튼(닫기/상세보기) 쪽으로
    // 이벤트가 아예 도달을 못해서 버튼 클릭도 같이 막혀버림 -> 버블 단계에서,
    // 그리고 카카오가 컨테이너에 리스너를 붙이기 전(new kakao.maps.Map 호출 전)에
    // 먼저 등록해서 카카오보다 먼저 실행되게 한다(같은 노드/같은 단계에서는
    // 등록 순서대로 실행됨).
    const blockOverlayClicks = (e) => {
      if (e.target.closest("[data-map-overlay]")) {
        e.stopPropagation();
      }
    };
    containerRef.current.addEventListener("mousedown", blockOverlayClicks);
    containerRef.current.addEventListener("mouseup", blockOverlayClicks);

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    mapRef.current = map;

    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      onMapClickRef.current?.({
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      });
    });

    // 오버레이 카드를 누르고 있는 동안 손이 아주 살짝만 움직여도 카카오맵이
    // 그걸 "지도 드래그"로 인식해서 화면이 같이 끌려다니는 문제가 있었음.
    // mousedown 자체를 막아도 카카오맵의 드래그 판정은 (mousedown 수신 여부와
    // 무관하게) "현재 마우스가 눌린 채로 움직였는지"만 보는 것으로 보여서,
    // 오버레이 위에서 누르는 동안은 지도 draggable 자체를 꺼버리고 손을 떼면
    // 되돌린다.
    const handleOverlayMouseDown = (e) => {
      if (!e.target.closest("[data-map-overlay]")) return;
      map.setDraggable(false);
      // 캡처 단계로 등록: blockOverlayClicks가 mouseup에서 stopPropagation을
      // 걸어버리면(오버레이 안에서 뗄 때) 버블 단계 리스너는 document까지
      // 못 올라와서 복구가 안 됨 -> 캡처 단계는 그보다 먼저 실행되므로 항상 복구됨.
      const restoreDraggable = () => {
        map.setDraggable(true);
        document.removeEventListener("mouseup", restoreDraggable, true);
      };
      document.addEventListener("mouseup", restoreDraggable, true);
    };
    containerRef.current.addEventListener("mousedown", handleOverlayMouseDown);

    // 컨테이너 크기가 초기화 이후에 바뀌면(예: 비동기로 받아온 데이터가 채워지며
    // flex 레이아웃이 재계산되는 경우) 카카오맵이 스스로 다시 그리지 않아서
    // 지도가 빈 화면으로 보이는 문제가 있음 -> 크기 변화를 감지해 relayout() 호출.
    // 이때 중심을 이 effect가 마운트될 때의 center prop(고정된 값, stale closure)으로
    // 되돌리면, focus 복원이나 마커 클릭으로 이미 다른 곳으로 옮겨둔 중심이
    // ResizeObserver의 최초 콜백(observe 직후 자동 1회 발생)에 의해 도로 원래
    // 위치로 튕겨나가는 문제가 있었음 -> 항상 "그 시점의 실제 지도 중심"을
    // 다시 적용해서 현재 보고 있던 위치를 그대로 유지한다.
    const resizeObserver = new ResizeObserver(() => {
      const currentCenter = map.getCenter();
      map.relayout();
      map.setCenter(currentCenter);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      containerRef.current?.removeEventListener(
        "mousedown",
        blockOverlayClicks,
      );
      containerRef.current?.removeEventListener("mouseup", blockOverlayClicks);
      containerRef.current?.removeEventListener(
        "mousedown",
        handleOverlayMouseDown,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // center/level이 바뀌면 지도를 재생성하지 않고 이동만 시킨다.
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(center.lat, center.lng),
    );
    mapRef.current.setLevel(level);
  }, [center.lat, center.lng, level]);

  // 스테이션 마커 + 중심(내 위치/선택 위치) 마커를 그린다.
  // 매번 이전 마커를 전부 지운 뒤 새로 그려서, 이전 위치에서 찍힌 핀/마커가
  // 남아있지 않도록 한다.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    centerMarkerRef.current?.setMap(null);

    const stationEntries = positions.map(
      ({
        stationNo,
        name,
        region,
        address,
        chargers,
        unableChargers,
        lat,
        lng,
      }) => {
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
          onMarkerClickRef.current?.({ lat, lng });
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
                unableChargers={unableChargers}
                navi={navi}
                onClose={() => overlay.setMap(null)}
              />,
            );
          }
        });

        return { marker, rootRef, overlay };
      },
    );

    // pinned일 땐 사용자가 직접 찍은/검색한 위치(center)에 핀을,
    // 아닐 땐 실제 내 위치(myLocation)에 파란 점을 그린다.
    // (myLocation이 아직 없으면 center로 대체)
    const myLoc = myLocation ?? center;
    const centerMarker = pinned
      ? new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(center.lat, center.lng),
          name: "선택한 위치",
          image: new window.kakao.maps.MarkerImage(
            PIN_MARKER_IMAGE_SRC,
            new window.kakao.maps.Size(28, 36),
            { offset: new window.kakao.maps.Point(14, 36) },
          ),
        })
      : new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(myLoc.lat, myLoc.lng),
          name: "내 위치",
          image: new window.kakao.maps.MarkerImage(
            USER_MARKER_IMAGE_SRC,
            new window.kakao.maps.Size(24, 24),
          ),
        });
    centerMarkerRef.current = centerMarker;

    markersRef.current = stationEntries.map(({ marker }) => marker);
    rootsRef.current = stationEntries.map(({ rootRef, overlay }) => ({
      rootRef,
      overlay,
    }));

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      centerMarkerRef.current?.setMap(null);
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
  }, [
    positions,
    center.lat,
    center.lng,
    myLocation?.lat,
    myLocation?.lng,
    pinned,
    interactive,
  ]);

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
  unableChargers,
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
      navi(`/chargeStations/${stationNo}`, {
        state: { returnSearch: window.location.search },
      });
    }
  };

  return (
    <OverlayCard data-map-overlay onClick={(e) => e.stopPropagation()}>
      <OverlayHeader>
        <OverlayTitle>{name}</OverlayTitle>
        <RegionBadge>{region}</RegionBadge>
      </OverlayHeader>
      <OverlayAddress>{address}</OverlayAddress>
      <ChargerInfoRow>
        <ChargerInfo data-type="available">
          이용가능 {chargers}대
        </ChargerInfo>
        <ChargerInfo data-type="unable" data-has={unableChargers > 0}>
          고장 {unableChargers}대
        </ChargerInfo>
      </ChargerInfoRow>
      <OverlayBtnGroup>
        <ExitButton onClick={onClose}>닫기</ExitButton>
        <OverlayButton onClick={toDetail}>상세보기</OverlayButton>
      </OverlayBtnGroup>
    </OverlayCard>
  );
};

export default MapApi;
