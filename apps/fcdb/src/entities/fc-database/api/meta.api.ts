import { ApiRequest } from "../types";

/**@description 메타 데이터 관련 API*/
export const metaApi = async (request: ApiRequest) => ({
  /**
   * 선수 메타 데이터를 조회합니다.
   * @returns 선수 메타 데이터
   */
  getSoccerPlayerMeta: (): Promise<{ id: number; name: string }[]> =>
    fetch("https://open.api.nexon.com/static/fconline/meta/spid.json", {
      next: { revalidate: 60 * 60 * 24 }, // 24시간 캐시
    }).then((res) => res.json()),

  /**
   * 시즌 메타 데이터를 조회합니다.
   * @returns 시즌 메타 데이터
   */
  getSeasonIdMeta: (): Promise<
    { seasonId: number; className: string; seasonImg: string }[]
  > =>
    fetch("https://open.api.nexon.com/static/fconline/meta/seasonid.json", {
      next: { revalidate: 60 * 60 * 24 }, // 24시간 캐시
    }).then((res) => res.json()),
});
