import { useEffect, useRef } from "react";

const USER_MARKER_IMAGE_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#2563EB" stroke="#fff" stroke-width="3"/></svg>',
  );

const MapApi = ({ positions, center, level = 3, focus }) => {
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao?.maps || !containerRef.current) return;

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    mapRef.current = map;

    const stationMarkers = positions.map(
      ({ title, lat, lng }) =>
        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(lat, lng),
          title,
        }),
    );

    const userMarker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(center.lat, center.lng),
      title: "내 위치",
      image: new window.kakao.maps.MarkerImage(
        USER_MARKER_IMAGE_SRC,
        new window.kakao.maps.Size(24, 24),
      ),
    });

    markersRef.current = [...stationMarkers, userMarker];

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
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

export default MapApi;
