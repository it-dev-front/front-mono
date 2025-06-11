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
  systemPause: number | null;
  foul: number | null;
  injury: number | null;
  redCards: number | null;
  yellowCards: number | null;
  dribble: number | null;
  cornerKick: number | null;
  possession: number | null;
  offsideCount: number | null;
  averageRating: number | null;
  controller: "keyboard" | "gamepad" | "etc";
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
  ballPossesionSuccess: number;
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

interface ShootType {
  shootTotal: number;
  effectiveShootTotal: number;
  shootOutScore: number;
  goalTotal: number;
  goalTotalDisplay: number;
  ownGoal: number;
  shootHeading: number;
  goalHeading: number;
  shootFreekick: number;
  goalFreekick: number;
  shootInPenalty: number;
  goalInPenalty: number;
  shootOutPenalty: number;
  goalOutPenalty: number;
  shootPenaltyKick: number;
  goalPenaltyKick: number;
}

interface Player {
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
  assistSpId: number;
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
  nickname: string;
  matchDetail: MatchDeatil;
  shoot: ShootType;
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
