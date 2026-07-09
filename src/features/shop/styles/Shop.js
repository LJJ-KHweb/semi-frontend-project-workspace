import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Main = styled.main`
  max-width: 1200px;
  min-height: calc(100vh - 180px);
  margin: 40px auto;
  padding: 30px;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 45px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${Theme.color.text};
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 15px;
  color: ${Theme.color.sub};
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
