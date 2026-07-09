import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
  MapContainer,
  SubmitBtn,
} from "./StationForm.styles";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

const StationForm = () => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  const geocoderRef = useRef(null);
  const mapRef = useRef(null);

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

    mapRef.current = map;
    geocoderRef.current = new window.kakao.maps.services.Geocoder();

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

      geocoderRef.current?.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK) return;

          const { road_address, address } = result[0];
          setAddress(
            road_address ? road_address.address_name : address.address_name,
          );
        },
      );
    });

    return () => {
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);

  const handleAddressSearch = () => {
    if (!address.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }
    if (!geocoderRef.current) return;

    geocoderRef.current.addressSearch(address, (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        alert("주소를 찾을 수 없습니다.");
        return;
      }

      const latlng = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      if (markerRef.current) {
        markerRef.current.setPosition(latlng);
      } else {
        markerRef.current = new window.kakao.maps.Marker({
          map: mapRef.current,
          position: latlng,
        });
      }

      mapRef.current.setCenter(latlng);
      setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddressSearch();
    }
  };

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
      <FormLayout>
        <FieldSection>
          <FormRow>
            <Label>충전소명</Label>
            <Input
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              placeholder="충전소명을 입력해주세요."
            />
          </FormRow>
          <FormRow>
            <Label>지역</Label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="지역을 입력해주세요. 예) 서울"
            />
          </FormRow>
          <FormRow>
            <Label>충전기 수</Label>
            <Input
              type="number"
              min="0"
              max="99"
              value={chargerCount}
              onChange={(e) => setChargerCount(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>주소</Label>
            <AddressRow>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleEnter}
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
            />
          </FormRow>
        </FieldSection>

        <MapSection>
          <Label>지도</Label>
          <MapContainer ref={mapContainerRef} />
        </MapSection>
      </FormLayout>

      <SubmitBtn type="submit">등록</SubmitBtn>
    </FormWrap>
  );
};

export default StationForm;
