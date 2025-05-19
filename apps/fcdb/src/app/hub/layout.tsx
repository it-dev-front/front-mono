import React from "react";

const HubPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-col gap-[8px] items-center w-full max-w-[1080px] pt-4 pb-28 mx-auto">
        {children}
      </main>
    </>
  );
};

export default HubPageLayout;
