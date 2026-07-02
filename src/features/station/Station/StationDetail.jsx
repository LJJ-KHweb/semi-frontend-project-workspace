import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spacer } from "../../../App.styles";
import MapApi from "../MapApi/MapApi";
import {
  DetailAddress,
  DetailCard,
  DetailContent,
  DetailContentWrap,
  DetailDesc,
  DetailField,
  DetailGap,
  DetailMap,
  DetailTitle,
  DetailWrap,
  StationContnet,
  Wrap,
  DetailTitleGap,
} from "../styles/Station.styles";

const StationDetail = () => {
  const { stationNo } = useParams();
  const [station, setStation] = useState(null);
  const [coords] = useState({ lat: 37.5665, lng: 126.978 });
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost/api/chargeStations/${stationNo}`,
        );
        setStation(res.data.data);
      } catch (e) {
        console.log("상세 정보를 불러오지 못했습니다.", e);
      }
    };

    fetchData();
  }, [stationNo]);

  useEffect(() => {
    if (station?.lat && station?.lng) {
      setFocus({ lat: station.lat, lng: station.lng });
    }
  }, [station]);

  const positions = useMemo(() => {
    if (!station?.lat || !station?.lng) return [];
    return [
      {
        stationNo: station.stationNo,
        name: station.stationName,
        region: station.region,
        address: station.address,
        chargers: station.chargerCount,
        lat: station.lat,
        lng: station.lng,
      },
    ];
  }, [station]);

  return (
    <Spacer>
      <Wrap>
        <DetailCard>
          <DetailTitle>{station?.stationName ?? "로딩 중"}</DetailTitle>
          <DetailWrap>
            <DetailContentWrap>
              <DetailTitleGap>
                <DetailContent>지역 : {station?.region}</DetailContent>
                <DetailContent data-type="charger">
                  충전기 {station?.chargerCount}대 이용가능
                </DetailContent>
              </DetailTitleGap>
              <DetailGap>
                <DetailField>
                  <DetailContent data-type="sm">주소</DetailContent>
                  <DetailAddress>{station?.address}</DetailAddress>
                </DetailField>
                <DetailField>
                  <DetailContent data-type="sm">충전소 설명</DetailContent>
                  <DetailDesc>{station?.stationDesc}</DetailDesc>
                </DetailField>
              </DetailGap>
            </DetailContentWrap>
            <DetailMap>
              <MapApi
                center={coords}
                focus={focus}
                positions={positions}
                interactive={false}
              />
            </DetailMap>
          </DetailWrap>
        </DetailCard>
      </Wrap>
    </Spacer>
  );
};

export default StationDetail;
