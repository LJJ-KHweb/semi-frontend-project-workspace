import styled from "styled-components";
import { Theme } from "../../../../styles/Theme";

export const Main = styled.main`
  padding: 32px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 28px;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterButton = styled.button`
  width: 110px;
  height: 42px;

  border: none;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  background: ${({ role }) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "#dbeafe";
      case "ROLE_BAN":
        return "#fee2e2";
      case "ROLE_USER":
        return "#dcfce7";
      default:
        return "#f4f6f9";
    }
  }};

  color: ${({ role }) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "#2563eb";
      case "ROLE_BAN":
        return "#dc2626";
      case "ROLE_USER":
        return "#16a34a";
      default:
        return "#444";
    }
  }};

  &:hover {
    opacity: 0.9;
  }

  &[data-active="true"] {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export const Table = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

export const HeaderRow = styled.div`
  display: grid;

  grid-template-columns:
    1fr
    1.2fr
    2fr
    1.4fr
    1fr
    1fr;

  align-items: center;
  padding: 18px 24px;

  background: #fafafa;
  font-weight: 700;

  border-bottom: 1px solid ${Theme.color.border};
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns:
    1fr
    1.2fr
    2fr
    1.4fr
    1fr
    1fr;

  align-items: center;
  padding: 18px 24px;

  border-bottom: 1px solid ${Theme.color.border};

  &:hover {
    background: #fafcff;
  }
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${Theme.color.text};

  &:last-child {
    justify-content: center;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const UpdateButton = styled.button`
  width: 70px;
  height: 34px;

  border: 1px solid ${Theme.color.border};
  border-radius: 8px;

  background: white;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: ${Theme.color.point};
    color: white;
    border-color: ${Theme.color.point};
  }
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 30px;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;

  background: ${({ role }) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "#dbeafe";
      case "ROLE_BAN":
        return "#fee2e2";
      default:
        return "#dcfce7";
    }
  }};

  color: ${({ role }) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "#2563eb";
      case "ROLE_BAN":
        return "#dc2626";
      default:
        return "#16a34a";
    }
  }};
`;

/* ===== 수정 모달 권한 선택 ===== */

export const RoleButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const RoleButton = styled.button`
  flex: 1;
  height: 46px;

  border-radius: 10px;
  border: 1px solid ${Theme.color.border};

  cursor: pointer;

  font-size: 14px;
  font-weight: 600;

  transition: all 0.2s ease;

  background: ${({ $active, $role }) => {
    if (!$active) return "#fff";

    switch ($role) {
      case "ROLE_ADMIN":
        return "#dbeafe";
      case "ROLE_BAN":
        return "#fee2e2";
      default:
        return "#dcfce7";
    }
  }};

  color: ${({ $active, $role }) => {
    if (!$active) return Theme.color.text;

    switch ($role) {
      case "ROLE_ADMIN":
        return "#2563eb";
      case "ROLE_BAN":
        return "#dc2626";
      default:
        return "#16a34a";
    }
  }};

  border-color: ${({ $active, $role }) => {
    if (!$active) return Theme.color.border;

    switch ($role) {
      case "ROLE_ADMIN":
        return "#93c5fd";
      case "ROLE_BAN":
        return "#fca5a5";
      default:
        return "#86efac";
    }
  }};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;
