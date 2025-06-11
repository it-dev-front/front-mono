import { convertMatchInfo } from "../getMatchInfo";
import { MATCH_DETAIL_MOCK } from "./mock/match-detail.mock";

describe("getMatchInfo", () => {
  it("should convert match info correctly", () => {
    const result = convertMatchInfo(MATCH_DETAIL_MOCK.matchInfo);

    expect(result).toEqual({
      indicator: {
        userNickName: "탁재훈",
        userPossession: 59,
        opponentNickName: "SproutCho",
        opponentPossession: null,
      },
      score: {
        userScore: 3,
        opponentScore: 0,
      },
      matchDate: expect.any(Date),
      matchResult: "승",
      players: {
        user: MATCH_DETAIL_MOCK.matchInfo[0].player,
        opponent: MATCH_DETAIL_MOCK.matchInfo[1].player,
      },
    });
  });

  it("should throw error when match data is insufficient", () => {
    expect(() => convertMatchInfo([MATCH_DETAIL_MOCK.matchInfo[0]])).toThrow(
      "매치 정보가 부족합니다."
    );
  });
});
