import { MatchDetailResponse } from "@/entities/fc-database/types";
import {
  ConvertedMatchInfo,
  ConvertedMatchStatus,
  PlayerListType,
  ScorePanelType,
} from "../types/match.info.types";
import { MatchPlayerInfoType, PlayerType } from "../types/match.types";
import { POSITION } from "@/shared/constant/position";
import { MIN_WIDTH } from "../constants";

const covertMatchStatus = (
  match: MatchDetailResponse
): ConvertedMatchStatus => {
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
      userPossession: firstMatch.matchDetail.possession ?? 0,
      opponentNickName: secondMatch.nickname,
      opponentPossession: secondMatch.matchDetail.possession ?? 0,
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
const convertPlayers = (matchInfo: MatchPlayerInfoType[]): PlayerListType[] => {
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

  const firstPlayer = players[0];
  if (!firstPlayer) return null;

  return players.reduce(
    (best, player) => {
      const total = getPlayerTotal(player);
      const bestTotal = getPlayerTotal(best);
      return total > bestTotal
        ? { ...player, total }
        : { ...best, total: bestTotal };
    },
    { ...firstPlayer, total: getPlayerTotal(firstPlayer) }
  );
};

const getBestPlayerActionShoot = (
  players: PlayerListType[]
): (PlayerType & { total: number }) | null => {
  const validPlayers = players
    .map((item) => item.bestPlayer)
    .filter(
      (player): player is PlayerType & { total: number } => player !== null
    );

  if (validPlayers.length === 0) return null;

  return validPlayers.reduce((prev, current) => {
    const prevScore = prev.status.goal + prev.status.assist + prev.status.shoot;
    const currentScore =
      current.status.goal + current.status.assist + current.status.shoot;

    return currentScore > prevScore ? current : prev;
  });
};

const getScorePanel = (matchInfo: MatchPlayerInfoType[]): ScorePanelType => {
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

const formatPossession = (user: number, opponent: number) => {
  if (user === 0 && opponent > 0) {
    return {
      userPossession: `${Math.max(100 - opponent, MIN_WIDTH)}%`,
      opponentPossession: `${Math.max(opponent, MIN_WIDTH)}%`,
    };
  }
  if (opponent === 0 && user > 0) {
    return {
      userPossession: `${Math.max(user, MIN_WIDTH)}%`,
      opponentPossession: `${Math.max(100 - user, MIN_WIDTH)}%`,
    };
  }
  return {
    userPossession: `${Math.max(user, MIN_WIDTH)}%`,
    opponentPossession: `${Math.max(opponent, MIN_WIDTH)}%`,
  };
};

export {
  convertMatchInfo,
  covertMatchStatus,
  convertPlayers,
  getScorePanel,
  getBestPlayerActionShoot,
  formatPossession,
};
