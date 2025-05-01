type OrderBy = "desc" | "asc";

interface MatchListParams {
  matchtype: number;
  offset: number;
  limit: number;
  orderby: OrderBy;
}

interface MatchDeatil {
  seasonId: number;
  matchResult: string;
  matchEndType: number;
  systemPause: number;
  foul: number;
  injury: number;
  redCards: number;
  yellowCards: number;
  dribble: number;
  cornerKick: number;
  possession: number;
  OffsideCount: number;
  averageRating: number;
  controller: string; // "keyboard" | "pad"
}

interface PlayerStatus {
  shoot: number;
  effectiveShoot: number;
  assist: number;
  goal: number;
  dribble: number;
  intercept: number;
  defending: number;
  passTry: number;
  passSuccess: number;
  dribbleTry: number;
  dribbleSuccess: number;
  ballPossesionTry: number;
  ballPossesionSuc: number;
  aerialTry: number;
  aerialSuccess: number;
  blockTry: number;
  block: number;
  tackleTry: number;
  tackle: number;
  yellowCards: number;
  redCards: number;
  spRating: number;
}

export interface Player {
  spId: number;
  spPosition: number;
  spGrade: number;
  status: PlayerStatus;
}

interface ShootDetail {
  goalTime: number;
  x: number;
  y: number;
  type: number;
  result: number;
  spId: number;
  spGrade: number;
  spLevel: number;
  spIdType: boolean;
  assist: boolean;
  assistSpI: number;
  assistX: number;
  assistY: number;
  hitPost: boolean;
  inPenalty: boolean;
}

interface PassStats {
  passTry: number;
  passSuccess: number;
  shortPassTry: number;
  shortPassSuccess: number;
  longPassTry: number;
  longPassSuccess: number;
  bouncingLobPassTry: number;
  bouncingLobPassSuccess: number;
  drivenGroundPassTry: number;
  drivenGroundPassSuccess: number;
  throughPassTry: number;
  throughPassSuccess: number;
  lobbedThroughPassTry: number;
  lobbedThroughPassSuccess: number;
}

interface DefenceStats {
  blockTry: number;
  blockSuccess: number;
  tackleTry: number;
  tackleSuccess: number;
}

interface MatchInfo {
  ouid: string;
  nickanme: string;
  matchDetail: MatchDeatil;
  shootDetail: ShootDetail[];
  pass: PassStats;
  defence: DefenceStats;
  player: Player[];
}

interface MatchDetailResponse {
  matchId: string;
  matchDate: Date;
  matchType: number;
  matchInfo: MatchInfo[];
}

export type { MatchListParams, MatchDetailResponse };
