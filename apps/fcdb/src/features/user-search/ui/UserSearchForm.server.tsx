"use server";

import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { redirect } from "next/navigation";

export async function userSearchAction(
  prevState: { error: string },
  formData: FormData
): Promise<{ error: string | null }> {
  const name = formData.get("name") as string;
  const userApi = await FcClient.get("User");
  const result = await userApi.getOuid(name);

  if (!result.ouid) {
    return { error: "존재하지 않는 유저입니다." };
  }

  // 정상 처리
  redirect(
    `/user?name=${encodeURIComponent(name)}&q=${encodeURIComponent(result.ouid)}`
  );
}
