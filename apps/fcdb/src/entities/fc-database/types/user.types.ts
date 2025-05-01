interface UserOuidResponse {
  ouid: string;
}

interface UserProfileResponse extends UserOuidResponse {
  nickname: string;
  level: number;
}

interface BestGradeResponse {
  matchType: number;
  division: number;
  achievementDate: Date;
}

export type { UserOuidResponse, UserProfileResponse, BestGradeResponse };
