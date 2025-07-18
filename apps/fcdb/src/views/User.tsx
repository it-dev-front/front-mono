import { redirect } from "next/navigation";
import { getOuidApi } from "@/entities/id/api";
import { MatchList } from "@/features/match/ui/MatchList";

import { onlyServerApi as onlyServerMatchApi } from "@/entities/match/model/api/only-server-api";
import { onlyServerApi as onlyServerProfileApi } from "@/entities/profile/model/api/only-server-api";

function handleApiError(error: unknown) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  if (errorMessage.includes("OPENAPI00007")) {
    console.log("🔄 FC Online API 서버 일시적 오류 - 홈으로 리다이렉트");
  } else {
    console.log("🔄 기타 API 에러 - 홈으로 리다이렉트");
  }
  redirect("/");
}

export const User = async ({ nickname }: { nickname: string }) => {
  const decodedNickname = decodeURIComponent(nickname);

  let ouid: string | undefined;
  try {
    const result = await getOuidApi(decodedNickname);
    ouid = result.ouid;
  } catch (error) {
    handleApiError(error);
  }

  if (!ouid) redirect("/");

  try {
    const [profile, bestRating, matchIds] = await Promise.all([
      onlyServerProfileApi.getUserProfile(ouid),
      onlyServerProfileApi.getBestRating(ouid),
      onlyServerMatchApi.getMatchIds(ouid, 1, 20),
    ]);
    const matchList = await onlyServerMatchApi.getMatchList(matchIds);
    profile.nickname = decodedNickname;

    return (
      <MatchList
        ouid={ouid}
        matchList={matchList}
        profileInfo={profile}
        bestRating={bestRating}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
};
