const playerActionImageSource = (spId: number): string => {
  try {
    return `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
  } catch (e) {
    return `/images/player/default.jpg`;
  }
};

export { playerActionImageSource };
