"use client";

import Form from "next/form";
import { userSearchAction } from "./UserSearchForm.server";
import { useActionState, useEffect } from "react";

export const UserSearchForm = () => {
  const [state, formAction] = useActionState(userSearchAction, { error: null });

  useEffect(() => {
    if (state.error) {
      //TODO toast
      console.log(state.error);
    }
  }, [state.error]);

  return (
    <Form action={formAction}>
      <input
        name="name"
        placeholder="구단주 이름을 입력해주세요."
        className="w-[64vw] h-10  bg-white text-xs text-[#000000] px-4 py-2  rounded-lg lg:text-[16px] lg:w-[500px] lg:h-14"
      />
      <button
        type="submit"
        className="ml-[2vw] w-[24vw] h-10 bg-gray-900 text-xs font-bold text-[#FFFFFF] px-4 py-2 rounded-lg hover:bg-gray-800 lg:text-[16px] lg:ml-4 lg:w-32 lg:h-14"
      >
        전적보기
      </button>
    </Form>
  );
};
