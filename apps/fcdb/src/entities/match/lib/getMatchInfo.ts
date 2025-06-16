import { MatchDetailResponse } from "@/entities/fc-database/types";
import { ConvertedMatchInfo } from "../types/match.info.types";
import { MatchPlayerInfoType, PlayerType } from "../types/match.types";
import { POSITION } from "@/shared/constant/position";

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

const conertPlayers = (matchInfo: MatchPlayerInfoType[]) => {
  return matchInfo.map((match) => {
    return match.player.reduce(
      (acc, player) => {
        const position = POSITION[player.spPosition as keyof typeof POSITION];
        acc[position] = {
          ...player,
          spPosition: position,
        };
        return acc;
      },
      {} as Record<string, PlayerType>
    );
  });
};

export { convertMatchInfo, covertMatchStatus, conertPlayers };
