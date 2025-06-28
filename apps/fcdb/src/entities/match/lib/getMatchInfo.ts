import { MatchDetailResponse } from "@/entities/fc-database/types";
import { ConvertedMatchInfo } from "../types/match.info.types";
import {
  MatchInfoType,
  MatchPlayerInfoType,
  PlayerType,
} from "../types/match.types";
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
const convertPlayers = (
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
): (PlayerType & { total: number }) | null => {
  if (players.length === 0) return null;
  return players.reduce(
    (best, player) => {
      const total = getPlayerTotal(player);
      const bestTotal = getPlayerTotal(best);
      return total > bestTotal
        ? { ...(player as PlayerType), total }
        : { ...(best as PlayerType), total: bestTotal };
    },
    { ...(players[0] as PlayerType), total: getPlayerTotal(players[0]) }
  );
};

type ScorePanel = {
  win: number;
  defeat: number;
  draw: number;
  winRate: number; // 승률 (%)
  total: number;
};

const getScorePanel = (matchInfo: MatchPlayerInfoType[]): ScorePanel => {
  const scoreObj = {
    win: 0,
    defeat: 0,
    draw: 0,
    total: 0,
    winRate: 0,
  };

  if (matchInfo.length === 0 || !matchInfo) return scoreObj;

  matchInfo.forEach((match: MatchPlayerInfoType) => {
    const matchResult = match.matchDetail?.matchResult || "";
    scoreObj.total++;

    if (matchResult === "승") {
      scoreObj.win++;
    } else if (matchResult === "패") {
      scoreObj.defeat++;
    } else if (matchResult === "무") {
      scoreObj.draw++;
    } else {
      scoreObj.defeat++;
    }
  });

  const sum = scoreObj.win + scoreObj.defeat + scoreObj.draw;
  scoreObj.winRate = sum > 0 ? (scoreObj.win / sum) * 100 : 0;

  return scoreObj;
};

export { convertMatchInfo, covertMatchStatus, convertPlayers, getScorePanel };
