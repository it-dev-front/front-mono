import { ConvertedMatchInfo } from "../types/match.info.types";
import { MatchPlayerInfoType } from "../types/match.types";

/**@description 매치 정보 변환*/
const convertMatchInfo = (
  matchInfo: MatchPlayerInfoType[]
): ConvertedMatchInfo => {
  const firstMatch = matchInfo[0];
  const secondMatch = matchInfo[1];

  if (!firstMatch || !secondMatch) {
    throw new Error("매치 정보 없음");
  }

  return {
    indicator: {
      userNickName: firstMatch.nickname,
      userPossession: firstMatch.matchDetail.possession ?? null,
      opponentNickName: secondMatch.nickname,
      opponentPossession: secondMatch.matchDetail.possession ?? null,
    },
    score: {
      userScore: firstMatch.shoot.goalTotalDisplay,
      opponentScore: secondMatch.shoot.goalTotalDisplay,
    },
    matchDate: new Date(),
    matchResult: firstMatch.matchDetail.matchResult as "승" | "패" | "무",
    players: {
      user: firstMatch.player,
      opponent: secondMatch.player,
    },
  };
};

export { convertMatchInfo };
