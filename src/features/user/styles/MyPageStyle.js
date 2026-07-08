import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const Main = styled.main`
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.lg};
`;

export const TitleSection = styled.div`
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  padding: 16px;
  margin-bottom: 30px;
`;

export const PageTitle = styled.h2`
  text-align: center;
  color: ${Theme.color.text};
`;

export const Content = styled.div`
  display: flex;
  gap: 30px;
`;

export const LeftSection = styled.section`
  width: 380px;
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  padding: 25px;

  display: flex;
  flex-direction: column;
`;

export const RightSection = styled.section`
  flex: 1;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const UserForm = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${Theme.color.sub};
`;

export const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${Theme.color.inputBorder};
  border-radius: ${Theme.radius.sm};

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 25px;

  display: flex;
  gap: 15px;
`;

export const ChartSection = styled.section`
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  padding: 20px;
`;

export const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

export const ChartArea = styled.div`
  height: 250px;
  border: 2px dashed ${Theme.color.border};
  border-radius: ${Theme.radius.md};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MileageSection = styled.section`
  border: 1px solid ${Theme.color.border};
  border-radius: ${Theme.radius.md};
  padding: 20px;
`;

export const MileageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MileageTitle = styled.h3``;

export const TotalMileage = styled.span`
  font-weight: bold;
`;

export const MileageList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MileageItem = styled.div`
  width: 580px;
  display: grid;
  grid-template-columns: 120px 1fr 80px;

  padding: 12px 0;

  border-bottom: 1px solid ${Theme.color.border};
`;

export const MileageDate = styled.div`
  width: 150px;
  margin-right: 20px;
  color: ${Theme.color.sub};
`;

export const MileageContent = styled.div`
  padding-left: 80px;
`;

export const MileagePoint = styled.div`
  text-align: right;
  font-weight: bold;
  color: ${Theme.color.success};
`;

export const MileageMinus = styled(MileagePoint)`
  color: ${Theme.color.danger};
`;

export const TextArea = styled.textarea`
  width: 500px;
  height: 300px;
`;
