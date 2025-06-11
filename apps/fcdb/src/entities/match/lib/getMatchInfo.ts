import { MatchDetailResponse } from "@/entities/fc-database/types";
import { ConvertedMatchInfo } from "../types/match.info.types";
import { MatchPlayerInfoType } from "../types/match.types";

const covertMatchStatus = (match: MatchDetailResponse) => {
  return {
    matchType: match.matchType,
    matchDate: match.matchDate,
  };
};

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
    matchResult: firstMatch.matchDetail.matchResult,
    players: {
      user: firstMatch.player,
      opponent: secondMatch.player,
    },
  };
};

export { convertMatchInfo, covertMatchStatus };
