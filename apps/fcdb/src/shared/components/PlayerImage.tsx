"use client";
import Image from "next/image";
import { useState } from "react";

export default function PlayerImage({ spId, ...rest }: any) {
  /*
  1. 맨 앞에 seasonId(3자리) 제거하고 나머지 숫자 추출
  2. 문자열 시작 부분에 있는 0을 모두 제거
  이렇게 해야지 player image를 가져올 수 있는 spId를 추출할 수 있습니다.
  */
  const playerImageSpId = spId.toString().slice(3).replace(/^0+/, "");

  const actionImageSrc = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
  const playerImageSrc = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${playerImageSpId}.png`;

  const [imgSrc, setImgSrc] = useState(actionImageSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        if (imgSrc === actionImageSrc) {
          setImgSrc(playerImageSrc);
        } else if (imgSrc === playerImageSrc) {
          setImgSrc("/images/player/default.jpg");
        }
      }}
    />
  );
}
