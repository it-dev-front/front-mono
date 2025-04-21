export const TIME_UNITS = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 60 * 60 * 24,
  WEEK: 60 * 60 * 24 * 7,
  MONTH: 60 * 60 * 24 * 30,
};

export const TIME_FORMATS = [
  { unit: TIME_UNITS.MINUTE, format: () => "방금 전" },
  {
    unit: TIME_UNITS.HOUR,
    format: (seconds: number) =>
      `${Math.trunc(seconds / TIME_UNITS.MINUTE)}분 전`,
  },
  {
    unit: TIME_UNITS.DAY,
    format: (seconds: number) =>
      `${Math.trunc(seconds / TIME_UNITS.HOUR)}시간 전`,
  },
  {
    unit: TIME_UNITS.WEEK,
    format: (seconds: number) => `${Math.trunc(seconds / TIME_UNITS.DAY)}일 전`,
  },
  {
    unit: TIME_UNITS.MONTH * 4,
    format: (seconds: number) =>
      `${Math.trunc(seconds / TIME_UNITS.WEEK)}주 전`,
  },
];
