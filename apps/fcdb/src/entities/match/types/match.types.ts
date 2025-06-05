type ControllerType = "keyboard" | "gamepad" | "etc";

type MatchInfoType = {
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
  controller: ControllerType;
};

type ShootType = {
  shootTotal: number | null;
  effectiveShootTotal: number | null;
  shootOutScore: number;
  goalTotal: number | null;
  goalTotalDisplay: number;
  ownGoal: number | null;
  shootHeading: number | null;
  goalHeading: number | null;
  shootFreekick: number | null;
  goalFreekick: number | null;
  shootInPenalty: number | null;
  goalInPenalty: number | null;
  shootOutPenalty: number | null;
  goalOutPenalty: number | null;
  shootPenaltyKick: number | null;
  goalPenaltyKick: number | null;
};

type ShootDetailType = {
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
};

type PassType = {
  passTry: number | null;
  passSuccess: number | null;
  shortPassTry: number | null;
  shortPassSuccess: number | null;
  longPassTry: number | null;
  longPassSuccess: number | null;
  bouncingLobPassTry: number | null;
  bouncingLobPassSuccess: number | null;
  drivenGroundPassTry: number | null;
  drivenGroundPassSuccess: number | null;
  throughPassTry: number | null;
  throughPassSuccess: number | null;
  lobbedThroughPassTry: number | null;
  lobbedThroughPassSuccess: number | null;
};

type DefenceType = {
  blockTry: number | null;
  blockSuccess: number | null;
  tackleTry: number | null;
  tackleSuccess: number | null;
};

type PlayerStatusType = {
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
};

type PlayerType = {
  spId: number;
  spPosition: number;
  spGrade: number;
  status: PlayerStatusType;
};

type MatchPlayerInfoType = {
  ouid: string;
  nickname: string;
  matchDetail: MatchInfoType;
  shoot: ShootType;
  shootDetail: ShootDetailType[];
  pass: PassType;
  defence: DefenceType;
  player: PlayerType[];
};

type MatchDetailType = {
  matchId: string;
  matchDate: string;
  matchType: number;
  matchInfo: MatchPlayerInfoType[];
};

export type { MatchDetailType };
