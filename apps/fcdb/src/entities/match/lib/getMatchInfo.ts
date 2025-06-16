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

/**@description 선수 리스트 조회 */
const conertPlayers = (
  matchInfo: MatchPlayerInfoType[]
): Array<{
  players: Record<string, PlayerType>;
  bestPlayer: PlayerType & { total: number };
}> => {
  return matchInfo.map((match) => {
    const bestPlayer = getBestPlayer(match.player);
    const players = match.player.reduce(
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

    return {
      players,
      bestPlayer,
    };
  });
};

const getPlayerTotal = (player: PlayerType) =>
  player.status.shoot +
  player.status.assist +
  player.status.effectiveShoot +
  player.status.passSuccess +
  player.status.dribbleSuccess;

/**@description 매 경기 최고의 플레이어 */
const getBestPlayer = (
  players: PlayerType[]
): (PlayerType & { total: number }) | undefined => {
  if (players.length === 0) return undefined;
  return players.reduce(
    (best, player) => {
      const total = getPlayerTotal(player);
      const bestTotal = getPlayerTotal(best);
      return total > bestTotal
        ? { ...player, total }
        : { ...best, total: bestTotal };
    },
    { ...players[0], total: getPlayerTotal(players[0]) }
  );
};

/**@description 유저의 최고의 플레이어 조회 */
const getUserBestPlayer = (matchInfo: MatchPlayerInfoType[]) => {};

export { convertMatchInfo, covertMatchStatus, conertPlayers };
