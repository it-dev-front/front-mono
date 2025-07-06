import { redirect } from "next/navigation";
import { getOuidApi } from "@/entities/id/api";
import { MatchList } from "@/features/match/ui/MatchList";
import { QueryClient } from "@tanstack/react-query";
import { getMatchIds } from "@/entities/match/model/api";
import { MATH_QUERY_KEY } from "@/entities/match/model/keys/queryKeys";

export const User = async ({ nickname }: { nickname: string }) => {
  const decodedNickname = decodeURIComponent(nickname);

  try {
    const queryClient = new QueryClient();

    const result = await getOuidApi(decodedNickname);

    if (!result.ouid) {
      redirect("/");
    }

    queryClient.prefetchInfiniteQuery({
      queryKey: [MATH_QUERY_KEY.INFINITY, result.ouid],
      queryFn: ({ pageParam = 1 }) => getMatchIds(result.ouid, pageParam),
      initialPageParam: 1,
    });

    return <MatchList ouid={result.ouid} />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("에러 메시지:", errorMessage);
    if (errorMessage.includes("OPENAPI00007")) {
      console.log("🔄 FC Online API 서버 일시적 오류 - 홈으로 리다이렉트");
    } else {
      console.log("🔄 기타 API 에러 - 홈으로 리다이렉트");
    }

    redirect("/");
  }
};
