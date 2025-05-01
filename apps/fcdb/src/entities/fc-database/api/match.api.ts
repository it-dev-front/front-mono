import { ApiRequest, MatchListParams, MatchDetailResponse } from "../types";

/**@description 매치 (경기) 관련 API*/
export const matchApi = (request: ApiRequest) => ({
  /**
   * 닉네임으로 계정 식별자(ouid)를 조회합니다.
   * @param matchtype - 매치 타입
   * @param offset - 리스트 시작 위치
   * @param limit - 리스트 최대 개수
   * @param orderby - 정렬
   * @returns 매치 id가 담겨져있는 string 배열
   * @example ["64f0a0000a000c2518b00016", "64f0a0000a000c2518b00016"]
   */
  getMatchInfo: (params: MatchListParams): Promise<string[]> =>
    request(`/fconline/v1/match`, { query: { ...params } }),
  /**
   * 매치 고유 식별자로 매치의 상제 정보를 조회합니다.
   * @param matchid - 매치 고유 아이디
   * @returns
   */
  getMatchDetail: (matchid: string): Promise<MatchDetailResponse> =>
    request(`/fconline/v1/match-detail`, { query: { matchid } }),
});
