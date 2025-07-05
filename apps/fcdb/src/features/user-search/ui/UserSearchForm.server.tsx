"use server";

import { getOuidApi } from "@/entities/id/api";

export async function userSearchAction(
  prevState: { errorMessage: string | null },
  formData: FormData
): Promise<{ errorMessage: string | null; url: string | null }> {
  try {
    const name = formData.get("name") as string;

    if (!name || name.trim() === "") {
      return { errorMessage: "구단주 이름을 입력해주세요.", url: null };
    }

    const result = await getOuidApi(name.trim());

    if (!result.ouid) {
      return { errorMessage: "존재하지 않는 유저입니다.", url: null };
    }

    return { errorMessage: null, url: `/user/${name.trim()}` };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("OPENAPI00007")) {
      return {
        errorMessage:
          "서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
        url: null,
      };
    }

    return {
      errorMessage: "검색 중 오류가 발생했습니다.",
      url: null,
    };
  }
}
