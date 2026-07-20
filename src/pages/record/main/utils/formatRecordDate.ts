const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export const formatRecordDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayLabel = DAY_LABELS[date.getDay()];

  return `${month}월 ${day}일 (${dayLabel})`;
};
