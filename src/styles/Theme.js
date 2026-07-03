export const Theme = {
  color: {
    // --- 포인트 칼라 ---
    point: "#0EA5E9", // 포인트 컬러
    pointHover: "#38BDF8", // 호버
    pointDark: "#0284C7", // 클릭
    pointSoft: "#E0F2FE", // 포인트 컬러 배경색 느낌

    // --- 배경 ---
    bg: "#F8F9FA", // 배경색
    bgSoft: "#F1F5F9", // 구역 구분색
    bgDark: "#E2E8F0", // 클릭

    // --- 해더 ---
    headerBg: "#FFFFFF",
    headerText: "#18181B",

    // --- 푸터 ---
    footerBg: "#F1F5F9",
    footerText: "#64748B",

    // --- input ---
    inputBg: "#F8FAFC",
    inputBorder: "#CBD5E1",
    placeholder: "#94A3B8",

    // --- 글자 ---
    text: "#18181B",
    sub: "#64748B",
    disabled: "#CBD5E1",

    // --- 테두리
    border: "#E2E8F0", // 영역 구분선

    // --- 경고색
    danger: "#DC2626", // 경고, 실패
    success: "#16A34A", // 성공
    dangerSoft: "#FEE2E2",
    successSoft: "#DCFCE7",
  },

  // --- 모서리 각 ---
  radius: {
    sm: "6px", // 작은 버튼 같은 거
    md: "10px", // 일반적인 카드나 모달, 버튼 등
    lg: "16px", // 좀 많이 클때 사용 md로 모자랄때
  },

  // --- 그림자 ---
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.08)", // 버튼, 제목 등
    md: "0 4px 12px rgba(0,0,0,0.10)", // 모달, 분리감이 확실하게 필요할때
  },

  font: `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, sans-serif`, // 강사님이 주신 거 복붙
};
