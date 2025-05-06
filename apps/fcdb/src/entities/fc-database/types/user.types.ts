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
  achievementDate: string;
}

export type { UserOuidResponse, UserProfileResponse, BestGradeResponse };
