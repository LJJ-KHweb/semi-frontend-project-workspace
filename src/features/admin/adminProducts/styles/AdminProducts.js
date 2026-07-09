import styled from "styled-components";
import { Theme } from "../../../../styles/Theme";

export const Main = styled.main`
  padding: 32px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  width: 90px;
  height: 40px;

  border: none;
  border-radius: 10px;

  background: ${Theme.color.point};
  color: white;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Table = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 90px 120px 1fr 140px 120px 100px 220px;

  padding: 14px 20px;

  background: #f5f7fb;
  font-weight: 600;
  border-bottom: 1px solid ${Theme.color.border};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 90px 120px 1fr 140px 120px 100px 220px;

  align-items: center;

  padding: 18px 20px;

  border-bottom: 1px solid ${Theme.color.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;

  object-fit: cover;

  border-radius: 8px;
  border: 1px solid ${Theme.color.border};
`;

export const Cell = styled.div`
  font-size: 15px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const UpdateButton = styled.button`
  flex: 1;

  height: 38px;

  border: none;
  border-radius: 8px;

  background: #20c997;
  color: white;

  cursor: pointer;
`;

export const DeleteButton = styled.button`
  flex: 1;

  height: 38px;

  border: none;
  border-radius: 8px;

  background: #ff4d5a;
  color: white;

  cursor: pointer;
`;
// 추가
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
  width: 500px;

  background: #fff;
  border-radius: 18px;

  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: ${Theme.color.text};

  margin-bottom: 10px;
`;

export const PreviewImage = styled.img`
  width: 180px;
  height: 180px;

  object-fit: contain;

  align-self: center;

  border: 1px solid ${Theme.color.border};
  border-radius: 14px;

  background: #fafafa;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileButton = styled.label`
  width: 180px;
  height: 42px;

  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${Theme.color.border};
  border-radius: 10px;

  background: #fff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${Theme.color.sub};
`;

export const Input = styled.input`
  height: 46px;

  padding: 0 14px;

  border: 1px solid ${Theme.color.border};
  border-radius: 10px;

  font-size: 15px;

  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: ${Theme.color.point};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  margin-top: 10px;
`;

export const CancelButton = styled.button`
  flex: 1;

  height: 46px;

  border: 1px solid ${Theme.color.border};
  border-radius: 10px;

  background: #fff;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SaveButton = styled.button`
  flex: 1;

  height: 46px;

  border: none;
  border-radius: 10px;

  background: ${Theme.color.point};
  color: #fff;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
//delete

export const DeleteModalContainer = styled.div`
  width: 420px;

  background: white;

  border-radius: 18px;

  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const DeleteTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;

  color: ${Theme.color.text};

  margin-bottom: 20px;
`;

export const DeleteMessage = styled.p`
  text-align: center;

  line-height: 1.8;

  font-size: 16px;

  margin-bottom: 30px;

  strong {
    color: ${Theme.color.point};
    font-size: 18px;
  }
`;

export const DeleteButtonGroup = styled.div`
  width: 100%;

  display: flex;

  gap: 12px;
`;

export const DeleteConfirmButton = styled.button`
  flex: 1;

  height: 46px;

  border: none;

  border-radius: 10px;

  background: #ef4444;

  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #dc2626;
  }
`;

//복구버튼

export const RestoreButton = styled.button`
  flex: 1;

  height: 38px;

  border: none;
  border-radius: 8px;

  background: #20c997;

  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
  &:hover {
    background: #22c55e;
  }

  &:active {
    transform: scale(0.98);
  }
`;
