import { MatchPlayerInfoType, PlayerType } from "./match.types";

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

interface ConvertedPlayersType {
  user: any[];
  opponent: any[];
}

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

interface MatchSummaryType {
  matchInfo: ConvertedMatchInfo;
  matchStatus: ConvertedMatchStatus;
  matchPlayers: Array<{
    players: Record<string, PlayerType>;
    bestPlayer: PlayerType & { total: number };
  }>;
  matches: MatchPlayerInfoType[];
}

export type {
  ConvertedIndicatorType,
  ConvertedScoreType,
  ConvertedPlayersType,
  ConvertedMatchInfo,
  ConvertedMatchStatus,
  MatchSummaryType,
};
