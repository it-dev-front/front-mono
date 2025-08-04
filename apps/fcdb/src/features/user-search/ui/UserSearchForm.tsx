"use client";

import Form from "next/form";
import { userSearchAction } from "./UserSearchForm.server";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { ButtonSpinner } from "@/shared/ui/spinner/ButtonSpinner";
import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { isProd } from "@/shared/lib/environment";

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

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;

    if (name && isProd) {
      sendGTMEvent({
        event: "user_search_submit",
        value: {
          nickname: name,
        },
      });
    }

    formAction(formData);
  };

  return (
    <Form action={handleSubmit} className="flex items-center">
      <div className="flex-1">
        <div className="transform scale-[0.875] origin-left lg:scale-100">
          <input
            name="name"
            disabled={isLoading}
            placeholder="구단주 이름을 입력해주세요."
            className="w-[114%] h-10 text-[16px] bg-white text-black px-4 py-2 rounded-lg lg:w-[500px] lg:h-14 disabled:bg-[#ededed] disabled:text-[#b0b0b0] disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="ml-[2vw] w-[24vw] h-10 bg-gray-900 text-xs font-bold text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center lg:text-[16px] lg:ml-4 lg:w-32 lg:h-14 cursor-pointer"
      >
        {isLoading ? <ButtonSpinner /> : "전적보기"}
      </button>
    </Form>
  );
};
