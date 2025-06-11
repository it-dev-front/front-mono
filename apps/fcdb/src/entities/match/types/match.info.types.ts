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
  matchDate: Date;
  matchResult: "승" | "패" | "무";
  players: ConvertedPlayersType;
}

export type {
  ConvertedIndicatorType,
  ConvertedScoreType,
  ConvertedPlayersType,
  ConvertedMatchInfo,
};
