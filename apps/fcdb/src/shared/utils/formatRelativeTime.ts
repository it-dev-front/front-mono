import dayjs from "dayjs";
import { TIME_FORMATS } from "@/shared/constant/time";
import { convertUtcToKst } from "@/shared/utils/date";

/**
 * 주어진 날짜와 현재 날짜의 차이를 상대적인 시간 표현으로 변환합니다.
 * 예: '방금 전', '5분 전', '3시간 전', '2일 전', '1주 전' 등
 *
 * @param date - Date 객체
 * @returns 상대적 시간 표현 문자열
 */

export default function formatRelativeTime(date: Date): string {
  const targetDate = new Date(date);

  // 유효하지 않은 날짜인 경우
  if (isNaN(targetDate.getTime())) {
    return "날짜 정보 없음";
  }

  const koreaDate = convertUtcToKst(targetDate);

  // 두 날짜의 차이를 초 단위로 계산
  const elapsedSeconds = Math.trunc(
    (new Date().getTime() - koreaDate.getTime()) / 1000
  );

  // 특정 format 찾기
  for (const { unit, format } of TIME_FORMATS) {
    if (elapsedSeconds < unit) {
      return format(elapsedSeconds);
    }
  }

  // 기본 형식으로 반환
  return dayjs(date).format("YY.MM.DD");
}
