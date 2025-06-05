/**@description 매치 종료 타입 변환*/
const convertMatchEndType = (matchEndType: number): string | undefined => {
  if (matchEndType === 0) {
    return "정상종료";
  } else if (matchEndType === 1) {
    return "몰수 승";
  } else if (matchEndType === 2) {
    return "몰수 패";
  }
};

/**@description 매치 플레이어 정보 변환*/
const convertMatchPlayers = (players: any[]) => {
  return players.map((player, index) => {
    if (index !== 0) return null;
    return {
      id: player.spId,
      position: player.spPosition,
      grade: player.spGrade,
      status: {
        shoot: player.status.shoot,
        effectiveShoot: player.status.effectiveShoot,
        assist: player.status.assist,
        goal: player.status.goal,
        spRating: player.status.spRating,
      },
    };
  });
};

/**@description 매치 정보 변환*/
const convertMatchInfo = (matchInfo: any[]) => {
  return matchInfo.map((info) => ({
    user: {
      ouid: info.ouid,
      seasonId: info.matchDetail.seasonId,
      nickname: info.nickname,
    },
    match: {
      matchResult: info.matchDetail.matchResult,
      matchEndType: convertMatchEndType(info.matchDetail.matchEndType),
      point: info.shoot.goalTotalDisplay,
    },
    players: convertMatchPlayers(info.player),
  }));
};

export { convertMatchInfo };
