import dayjs from "dayjs";

// UTC -> KST
export const convertUtcToKst = (date: Date) => {
  return dayjs(date).add(9, "hour").toDate();
};
