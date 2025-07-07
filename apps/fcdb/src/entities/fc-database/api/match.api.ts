import { ApiRequest, MatchListParams, MatchDetailResponse } from "../types";

/**@description 매치 (경기) 관련 API*/
export const matchApi = async (request: ApiRequest) => ({
  /**
   * 닉네임으로 계정 식별자(ouid)를 조회합니다.
   * @param matchtype - 매치 타입
   * @param offset - 리스트 시작 위치
   * @param limit - 리스트 최대 개수
   * @param orderby - 정렬
   * @returns 매치 id가 담겨져있는 string 배열
   * @example ["64f0a0000a000c2518b00016", "64f0a0000a000c2518b00016"]
   */
  getMatchInfo: async (params: MatchListParams): Promise<string[]> => {
    const response = await request<any>(
      `/fconline/v1/match`,
      {
        next: {
          revalidate: 60,
        },
      },
      { ...params }
    );
    return response;
  },
  /**
   * 매치 고유 식별자로 매치의 상제 정보를 조회합니다.
   * @param matchid - 매치 고유 아이디
   * @returns
   */
  getMatchDetail: async (matchid: string): Promise<MatchDetailResponse> => {
    const response = await request<MatchDetailResponse>(
      `/fconline/v1/match-detail`,
      {
        next: {
          revalidate: 60,
        },
      },
      { matchid }
    );
    return response;
  },
});
