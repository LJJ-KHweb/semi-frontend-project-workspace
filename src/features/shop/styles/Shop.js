import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Main = styled.main`
  max-width: 1200px;
  min-height: calc(100vh - 180px);
  margin: 40px auto;
  padding: 30px;
`;

export const TitleSection = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 40px;
  padding-bottom: 18px;

  border-bottom: 2px solid ${Theme.color.border};
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${Theme.color.text};
  margin-bottom: 10px;
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubTitle = styled.p`
  font-size: 15px;
  color: ${Theme.color.sub};

  text-align: center;
`;

export const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Card = styled.div`
  width: 220px;
  height: 320px;

  background: #fff;
  border: 1px solid ${Theme.color.border};
  border-radius: 18px;

  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ImageBox = styled.div`
  width: 200px;
  height: 200px;

  border: 1px solid ${Theme.color.border};
  border-radius: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  background: #fafafa;

  margin-bottom: 18px;
`;

export const ProductImage = styled.img`
  width: 200px;
  height: 200px;

  object-fit: contain;

  transition: 0.2s;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductName = styled.div`
  width: 100%;

  text-align: center;

  font-size: 15px;
  font-weight: 600;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid ${Theme.color.border};
`;

export const Stock = styled.div`
  font-size: 13px;
  color: ${Theme.color.sub};

  margin-bottom: 18px;
`;

export const Mileage = styled.div`
  margin-top: auto;

  font-size: 17px;
  font-weight: bold;

  color: ${Theme.color.point};
`;

export const PaginationSection = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 45px;
`;
export const MileageBox = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  min-width: 180px;
  padding: 16px 22px;

  background: #f8fbff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const MileageLabel = styled.span`
  font-size: 13px;
  color: ${Theme.color.sub};
`;
export const MileageValue = styled.span`
  margin-top: 6px;

  font-size: 26px;
  font-weight: 700;

  color: ${Theme.color.point};
`;
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 430px;

  background: white;

  border-radius: 18px;

  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const ModalImage = styled.img`
  width: 180px;
  height: 180px;

  object-fit: contain;

  margin-bottom: 20px;
`;

export const ModalProductName = styled.h3`
  margin-bottom: 24px;

  font-size: 22px;
  font-weight: 700;

  color: ${Theme.color.text};
`;

export const ModalInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 0;

  font-size: 15px;

  border-bottom: 1px solid ${Theme.color.border};

  span:last-child {
    font-weight: 600;
  }
`;

export const RemainingMileage = styled.div`
  width: 100%;

  margin-top: 20px;

  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;

  background: #eef8f1;

  color: ${Theme.color.success};

  font-weight: 700;
`;

export const ModalButtonGroup = styled.div`
  width: 100%;

  display: flex;
  gap: 12px;

  margin-top: 30px;
`;

export const CancelButton = styled.button`
  flex: 1;

  height: 46px;

  border: 1px solid ${Theme.color.border};
  border-radius: 10px;

  background: white;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ExchangeButton = styled.button`
  flex: 1;

  height: 46px;

  border: none;
  border-radius: 10px;

  background: ${Theme.color.point};
  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }
`;
