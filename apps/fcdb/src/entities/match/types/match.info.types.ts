import { MatchDetailResponse } from "@/entities/fc-database/types";
import { PlayerType } from "./match.types";

/**
 * @description fcdb 매치 정보 커스텀 타입
 */

interface ConvertedIndicatorType {
  userNickName: string;
  userPossession: number | null;
  opponentNickName: string;
  opponentPossession: number | null;
}

interface ConvertedScoreType {
  userScore: number;
  opponentScore: number;
}

// TODO 인터페이스 정의
interface ConvertedPlayersType {
  user: any[];
  opponent: any[];
}

type ScorePanelType = {
  win: number;
  defeat: number;
  draw: number;
  winRate: number; // 승률 (%)
  total: number;
};

interface ConvertedMatchInfo {
  indicator: ConvertedIndicatorType;
  score: ConvertedScoreType;
  matchResult: string;
  players: ConvertedPlayersType;
}

interface ConvertedMatchStatus {
  matchType: number;
  matchDate: Date;
}

type PlayerListType = {
  players: Record<string, PlayerType>;
  bestPlayer: (PlayerType & { total: number }) | null;
};

interface MatchSummaryType {
  matchInfo: ConvertedMatchInfo;
  matchStatus: ConvertedMatchStatus;
  matchPlayers: PlayerListType[];
  matches: MatchDetailResponse;
}

export type {
  ConvertedIndicatorType,
  ConvertedScoreType,
  ConvertedPlayersType,
  ConvertedMatchInfo,
  ConvertedMatchStatus,
  MatchSummaryType,
  PlayerListType,
  ScorePanelType,
};
