import {
  ApiRequest,
  BestGradeResponse,
  UserOuidResponse,
  UserProfileResponse,
} from "../types";

/**@description 유저 관련 API*/
export const userApi = async (request: ApiRequest) => ({
  /**
   * 닉네임으로 계정 식별자(ouid)를 조회합니다.
   * @param nickname - 조회할 유저의 닉네임
   * @returns ouid를 포함한 객체
   */
  getOuid: async (nickname: string): Promise<UserOuidResponse> => {
    try {
      const response = await request<UserOuidResponse>(
        "/fconline/v1/id",
        {},
        {
          nickname,
        }
      );
      return response;
    } catch (error) {
      return {
        ouid: "",
      };
    }
  },
  /**
   * 계정 식별자(ouid)로 유저의 기본 정보를 조회합니다.
   * @param ouid - 유저 식별자
   * @returns ouid, 닉네임, 레벨 정보를 포함한 객체
   */
  getUserInfo: (ouid: string): Promise<UserProfileResponse> =>
    request("/fconline/v1/user/basic", {}, { ouid }),
  /**
   * 유저의 역대 최고 등급 정보를 조회합니다.
   * @param ouid - 유저 식별자
   * @returns 매치 타입, 디비전, 달성 날짜 정보를 포함한 객체
   */
  getUserBestRating: (ouid: string): Promise<BestGradeResponse> =>
    request("/fconline/v1/user/maxdivision", {}, { ouid }),
  getUserMatchList: (params: {
    ouid: string;
    matchtype: number;
    limit: number;
    offset: number;
  }): Promise<any> => request("/fconline/v1/user/match", {}, { ...params }),
});
