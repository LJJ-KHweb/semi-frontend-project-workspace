import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";
import MapApi from "../MapApi/MapApi";
import {
  FormWrap,
  FormLayout,
  FieldSection,
  MapSection,
  FormRow,
  Label,
  Input,
  TextArea,
  SplitRow,
  MapContainer,
  StatusToggleGroup,
  StatusToggleBtn,
  ButtonGroup,
  BottomRow,
  BackButton,
} from "../../admin/AdminStations/StationForm.styles";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

// 조회 전용 페이지라 관리자 폼과 다르게 지도 비중을 더 크게 잡는다
const ReadOnlyFieldSection = styled(FieldSection)`
  flex: 2;
`;

const WideMapSection = styled(MapSection)`
  flex: 8;
`;

const CenteredWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StationDetail = () => {
  const navi = useNavigate();
  const { stationNo } = useParams();
  const [station, setStation] = useState(null);
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/chargeStations/${stationNo}`);
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
      <CenteredWrap>
        <FormWrap as="div">
          <FormLayout>
            <ReadOnlyFieldSection>
              <FormRow>
                <Label>충전소명</Label>
                <Input
                  value={station?.stationName ?? ""}
                  disabled
                  readOnly
                />
              </FormRow>

              <FormRow>
                <Label>상태</Label>
                <StatusToggleGroup>
                  <StatusToggleBtn
                    type="button"
                    data-status={station?.status}
                    data-active={true}
                    disabled
                  >
                    {station?.status === "Y" ? "정상 운영" : "운영 중지"}
                  </StatusToggleBtn>
                </StatusToggleGroup>
              </FormRow>

              <SplitRow>
                <FormRow>
                  <Label>지역</Label>
                  <Input value={station?.region ?? ""} disabled readOnly />
                </FormRow>
                <FormRow>
                  <Label>이용가능 충전기</Label>
                  <Input
                    value={station?.chargerCount ?? 0}
                    disabled
                    readOnly
                  />
                </FormRow>
                <FormRow>
                  <Label>고장 충전기</Label>
                  <Input
                    value={station?.unableChargerCount ?? 0}
                    disabled
                    readOnly
                  />
                </FormRow>
              </SplitRow>

              <FormRow>
                <Label>주소</Label>
                <Input value={station?.address ?? ""} disabled readOnly />
              </FormRow>

              <FormRow>
                <Label>충전소 설명</Label>
                <TextArea
                  value={station?.stationDesc ?? ""}
                  disabled
                  readOnly
                />
              </FormRow>
            </ReadOnlyFieldSection>

            <WideMapSection>
              <Label>지도</Label>
              <MapContainer>
                <MapApi
                  center={DEFAULT_CENTER}
                  focus={focus}
                  positions={positions}
                  interactive={false}
                />
              </MapContainer>
            </WideMapSection>
          </FormLayout>

          <BottomRow>
            <ButtonGroup>
              <BackButton
                type="button"
                onClick={() => navi("/chargeStations")}
              >
                충전소 목록
              </BackButton>
            </ButtonGroup>
          </BottomRow>
        </FormWrap>
      </CenteredWrap>
    </Spacer>
  );
};

export default StationDetail;
