import { convertMatchInfo } from "../lib/getMatchInfo";
import { MATCH_DETAIL_MOCK } from "./mock/match-detail.mock";

describe("match", () => {
  const mockFn = {
    getMatchInfo: jest.fn(),
  };

  beforeEach(() => {
    mockFn.getMatchInfo = jest.fn(convertMatchInfo);
  });

  test("", async () => {});

  test("should return match list", async () => {
    const expected = [
      {
        user: {
          ouid: "bf7aa48910ef14c5866851f455a9d37f",
          seasonId: 202503,
          nickname: "탁재훈",
        },
        match: {
          matchResult: "승",
          matchEndType: "몰수 승",
          point: 3,
        },
        players: [
          {
            id: 829241509, // 선수 식별자
            position: 7, // 포지션
            grade: 8, // 강화 등급
            status: {
              shoot: 0,
              effectiveShoot: 0,
              assist: 0,
              goal: 0,
              spRating: 7.7, // 선수 평점
            },
          },
        ],
      },
      {
        user: {
          ouid: "44d2861d6a8ed5e5ad447017386444df",
          seasonId: 202503,
          nickname: "SproutCho",
        },
        match: {
          matchResult: "패",
          matchEndType: "몰수 패",
          point: 0,
        },
        players: [],
      },
    ];

    const result = mockFn.getMatchInfo(MATCH_DETAIL_MOCK.matchInfo);

    expect(expected).toEqual(result);
  });
});
