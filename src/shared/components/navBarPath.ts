// 하단 네비게이션 바의 SVG path를 실제 렌더 폭에 맞게 생성한다.
//
// 원본(피그마 추출)은 폭 390 좌표계에 바 배경과 중앙 노치가 하나의 실루엣으로 합쳐져 있다.
// 이를 그대로 늘리면(preserveAspectRatio="none") 중앙 노치 곡선이 가로로 찌그러진다.
// 따라서 노치는 고정 크기로 유지하고 좌우 직선부만 폭에 맞춰 늘리도록 path를 재생성한다.

// 바 높이(원본 좌표계 기준). viewBox의 세로도 이 값을 사용한다.
export const NAV_BAR_HEIGHT = 100;

// 노치의 깊이(중앙이 파인 정도)와 어깨 반폭. 이 두 값을 바꾸면 어깨 곡선도 아래 비율에 따라 함께 조정된다.
const NOTCH_DEPTH = 56;
const NOTCH_HALF_WIDTH = 46; // 중앙에서 양쪽 어깨 끝까지의 거리

// 어깨 곡선 제어점(원본 실루엣에서 추출한 비율).
// x는 어깨 반폭(NOTCH_HALF_WIDTH) 대비, y는 깊이(NOTCH_DEPTH) 대비 비율이라
// 폭/깊이를 바꿔도 어깨의 둥근 전환이 같은 형태로 유지된다.
const shoulderRatio = {
  c1aX: 0.93212,
  c1bX: 0.88428,
  c2X: 0.89711,
  c2Y: 0.10018,
  c3aX: 0.90878,
  c3aY: 0.14569,
  c3bX: 0.91491,
  c3bY: 0.19268,
  straightX: 0.91491,
  straightY: 0.24074,
  bottomCtrlX: 0.50528,
  midY: 0.62939, // 어깨에서 노치 바닥으로 내려가는 중간 제어점 y
};

// 실제 폭(px 아닌 논리 폭)을 받아 바+노치 실루엣 path 문자열을 생성한다.
export const createNavBarPath = (width: number) => {
  const centerX = width / 2;
  const leftShoulderX = centerX - NOTCH_HALF_WIDTH;
  const rightShoulderX = centerX + NOTCH_HALF_WIDTH;
  const height = NAV_BAR_HEIGHT;

  // 비율을 실제 좌표로 환산: x는 중앙 기준 반폭 배수, y는 깊이 배수
  const sx = (ratio: number) => ratio * NOTCH_HALF_WIDTH; // 중앙 기준 상대 x
  const sy = (ratio: number) => ratio * NOTCH_DEPTH;
  const rx = (relX: number) => centerX + relX;

  const s = shoulderRatio;
  const midY = sy(s.midY);

  return [
    // 우상단 → 우측 변 → 하단 변 → 좌측 변 → 좌상단(노치 왼쪽 어깨 앞까지)
    `M${width - 1} 0`,
    `C${width - 0.448} 0 ${width} 0.448 ${width} 1`,
    `V${height - 1}`,
    `C${width} ${height - 0.448} ${width - 0.448} ${height} ${width - 1} ${height}`,
    `H1`,
    `C0.448 ${height} 0 ${height - 0.448} 0 ${height - 1}`,
    `V1`,
    `C0 0.448 0.448 0 1 0`,
    `H${leftShoulderX}`,
    // 왼쪽 어깨 → 노치 바닥 (오른쪽 어깨 로직의 x 부호를 뒤집어 대칭 생성)
    `C${rx(-sx(s.c1aX))} 0 ${rx(-sx(s.c1bX))} ${sy(0.0503)} ${rx(-sx(s.c2X))} ${sy(s.c2Y)}`,
    `C${rx(-sx(s.c3aX))} ${sy(s.c3aY)} ${rx(-sx(s.c3bX))} ${sy(s.c3bY)} ${rx(-sx(s.straightX))} ${sy(s.straightY)}`,
    `C${rx(-sx(s.straightX))} ${midY} ${rx(-sx(s.bottomCtrlX))} ${NOTCH_DEPTH} ${centerX} ${NOTCH_DEPTH}`,
    // 노치 바닥 → 오른쪽 어깨
    `C${rx(sx(s.bottomCtrlX))} ${NOTCH_DEPTH} ${rx(sx(s.straightX))} ${midY} ${rx(sx(s.straightX))} ${sy(s.straightY)}`,
    `C${rx(sx(s.c3bX))} ${sy(s.c3bY)} ${rx(sx(s.c3aX))} ${sy(s.c3aY)} ${rx(sx(s.c2X))} ${sy(s.c2Y)}`,
    `C${rx(sx(s.c1bX))} ${sy(0.0503)} ${rx(sx(s.c1aX))} 0 ${rightShoulderX} 0`,
    `H${width - 1}`,
    `Z`,
  ].join(' ');
};
