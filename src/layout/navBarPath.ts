// 하단 네비게이션 바의 SVG path를 실제 렌더 폭에 맞게 생성한다.
//
// 원본(피그마 추출)은 폭 390 좌표계에 바 배경과 중앙 노치가 하나의 실루엣으로 합쳐져 있다.
// 이를 그대로 늘리면(preserveAspectRatio="none") 중앙 노치 곡선이 가로로 찌그러진다.
// 따라서 노치는 고정 크기로 유지하고 좌우 직선부만 폭에 맞춰 늘리도록 path를 재생성한다.

// 바 높이(원본 좌표계 기준). viewBox의 세로도 이 값을 사용한다.
export const NAV_BAR_HEIGHT = 100;

// 노치의 깊이(중앙이 파인 정도)와 폭. 원본 실루엣에서 추출한 값이며 항상 고정 유지한다.
const NOTCH_DEPTH = 54;
const NOTCH_HALF_WIDTH = 40.44; // 중앙에서 양쪽 어깨까지의 거리 (원본 155.059~235.941)

// 노치 어깨의 곡선 제어에 쓰이는 원본 상수(중앙 기준 상대 좌표로 환산).
// 원본 절대 좌표를 중앙(195.5) 기준 상대값으로 옮겨 폭과 무관하게 재사용한다.
const CENTER = 195.5;
const shoulder = {
  outerX: 235.941 - CENTER, // 어깨 바깥쪽 x
  c1aX: 233.196 - CENTER,
  c1bX: 231.261 - CENTER,
  c2X: 231.78 - CENTER,
  c2Y: 5.40992,
  c3aX: 232.252 - CENTER,
  c3aY: 7.86733,
  c3bX: 232.5 - CENTER,
  c3bY: 10.4047,
  straightX: 232.5 - CENTER,
  straightY: 13,
  bottomCtrlX: 215.934 - CENTER, // 바닥으로 내려가는 제어점
  bottomY: NOTCH_DEPTH,
};

// 실제 폭(px 아닌 논리 폭)을 받아 바+노치 실루엣 path 문자열을 생성한다.
export const createNavBarPath = (width: number) => {
  const centerX = width / 2;
  const leftShoulderX = centerX - NOTCH_HALF_WIDTH;
  const rightShoulderX = centerX + NOTCH_HALF_WIDTH;
  const height = NAV_BAR_HEIGHT;

  // 중앙 기준 상대 x를 실제 좌표로 옮기는 헬퍼
  const rx = (relX: number) => centerX + relX;

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
    `C${rx(-shoulder.c1aX)} 0 ${rx(-shoulder.c1bX)} 2.714 ${rx(-shoulder.c2X)} ${shoulder.c2Y}`,
    `C${rx(-shoulder.c3aX)} ${shoulder.c3aY} ${rx(-shoulder.c3bX)} ${shoulder.c3bY} ${rx(-shoulder.straightX)} ${shoulder.straightY}`,
    `C${rx(-shoulder.straightX)} 33.987 ${rx(-shoulder.bottomCtrlX)} ${shoulder.bottomY} ${centerX} ${shoulder.bottomY}`,
    // 노치 바닥 → 오른쪽 어깨
    `C${rx(shoulder.bottomCtrlX)} ${shoulder.bottomY} ${rx(shoulder.straightX)} 33.987 ${rx(shoulder.straightX)} ${shoulder.straightY}`,
    `C${rx(shoulder.c3bX)} ${shoulder.c3bY} ${rx(shoulder.c3aX)} ${shoulder.c3aY} ${rx(shoulder.c2X)} ${shoulder.c2Y}`,
    `C${rx(shoulder.c1bX)} 2.714 ${rx(shoulder.c1aX)} 0 ${rightShoulderX} 0`,
    `H${width - 1}`,
    `Z`,
  ].join(' ');
};
