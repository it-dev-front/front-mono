"use client";

import Form from "next/form";
import { userSearchAction } from "./UserSearchForm.server";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { ButtonSpinner } from "@/shared/ui/spinner/ButtonSpinner";
import { useState } from "react";

export const UserSearchForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction, isPending] = useActionState(userSearchAction, {
    url: null,
    errorMessage: null,
  });

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (state.errorMessage) {
      toast.error(state.errorMessage);
      setIsLoading(false);
    }
    if (state.url) {
      router.push(state.url);
    }
  }, [state.errorMessage, state.url, router, isPending]);

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    }
  }, [isPending]);

  return (
    <Form action={formAction} className="flex items-center">
      <input
        name="name"
        placeholder="구단주 이름을 입력해주세요."
        className="w-[64vw] h-10  bg-white text-xs text-[#000000] px-4 py-2  rounded-lg lg:text-[16px] lg:w-[500px] lg:h-14"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="ml-[2vw] w-[24vw] h-10 bg-gray-900 text-xs font-bold text-[#FFFFFF] px-4 py-2 rounded-lg hover:bg-gray-800 lg:text-[16px] lg:ml-4 lg:w-32 lg:h-14 cursor-pointer flex items-center justify-center"
      >
        {isLoading ? <ButtonSpinner /> : "전적보기"}
      </button>
    </Form>
  );
};
