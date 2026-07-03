import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FormWrap,
  FormRow,
  Label,
  Input,
  TextArea,
  MapHint,
  MapContainer,
  SubmitBtn,
} from "./StationForm.styles";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

const StationForm = () => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  const [stationName, setStationName] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [chargerCount, setChargerCount] = useState("");
  const [stationDesc, setStationDesc] = useState("");
  const [position, setPosition] = useState(null); // 지도에서 클릭해서 찍은 { lat, lng }

  useEffect(() => {
    if (!window.kakao?.maps || !mapContainerRef.current) return;

    const map = new window.kakao.maps.Map(mapContainerRef.current, {
      center: new window.kakao.maps.LatLng(
        DEFAULT_CENTER.lat,
        DEFAULT_CENTER.lng,
      ),
      level: 5,
    });

    // 지도를 클릭한 위치에 마커를 찍고, 그 좌표를 폼 state(position)에 저장
    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;

      if (markerRef.current) {
        markerRef.current.setPosition(latlng);
      } else {
        markerRef.current = new window.kakao.maps.Marker({
          map,
          position: latlng,
        });
      }

      setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
    });

    return () => {
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      alert("지도를 클릭해서 충전소 위치를 지정해주세요.");
      return;
    }

    try {
      // RequestBody로 전체 필드를 한 번에 전송 (백엔드에서 VO 하나로 받음)
      await axios.post("http://localhost/api/chargeStations", {
        stationName,
        region,
        address,
        chargerCount: Number(chargerCount),
        stationDesc,
        lat: position.lat,
        lng: position.lng,
      });
      alert("충전소가 등록되었습니다.");
    } catch (err) {
      console.log("충전소 등록 실패", err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <FormWrap onSubmit={onSubmit}>
      <FormRow>
        <Label>충전소명</Label>
        <Input
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Label>지역</Label>
        <Input value={region} onChange={(e) => setRegion(e.target.value)} />
      </FormRow>
      <FormRow>
        <Label>주소</Label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormRow>
      <FormRow>
        <Label>충전기 수</Label>
        <Input
          type="number"
          value={chargerCount}
          onChange={(e) => setChargerCount(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Label>충전소 설명</Label>
        <TextArea
          value={stationDesc}
          onChange={(e) => setStationDesc(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <Label>위치</Label>
        <MapHint>
          지도를 클릭해서 충전소 위치를 지정하세요.
          {position &&
            ` (${position.lat.toFixed(6)}, ${position.lng.toFixed(6)})`}
        </MapHint>
        <MapContainer ref={mapContainerRef} />
      </FormRow>

      <SubmitBtn type="submit">등록</SubmitBtn>
    </FormWrap>
  );
};

export default StationForm;
