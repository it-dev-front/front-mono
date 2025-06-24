"use server";

import { redirect } from "next/navigation";
import { getOuidApi } from "@/entities/id/api";

export async function userSearchAction(
  prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  try {
    const name = formData.get("name") as string;

    if (!name || name.trim() === "") {
      return { error: "구단주 이름을 입력해주세요." };
    }

    const result = await getOuidApi(name.trim());

    if (!result.ouid) {
      return { error: "존재하지 않는 유저입니다." };
    }

    redirect(`/user/${name.trim()}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("OPENAPI00007")) {
      return {
        error:
          "서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    return { error: "검색 중 오류가 발생했습니다." };
  }
}
