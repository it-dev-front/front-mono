import styles from "./ProfileBoxLoading.module.css";

const DoughnutSkeleton = () => {
  return <div className={styles.donutSkeleton} />;
};

const ActionShowSkeleton = () => {
  return <div className="w-[200px] h-[100px] bg-gray-700 rounded-md" />;
};

const UserInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="w-[120px] h-[20px] bg-gray-700 rounded-sm" />
      <div className="w-[80px] h-[20px] bg-gray-700 rounded-sm" />
    </div>
  );
};

const RefreshButtonSkeleton = () => {
  return (
    <div className="flex flex-col gap-[8px] w-full items-end md:w-auto">
      <div className="w-[80px] h-[20px] bg-gray-700 rounded-sm" />
      <div className="w-full h-[40px] bg-gray-700 rounded-sm md:w-[120px]" />
    </div>
  );
};

const BadgeSkeleton = () => {
  return <div className="w-[100px] h-[100px] bg-gray-700 rounded-full" />;
};

const PcProfileBoxLoading = () => {
  return (
    <div className="block w-full">
      <div className="mx-auto w-full flex items-center justify-between bg-gray-900 max-w-[1080px] h-[240px] p-[40px] rounded-lg my-[8px] animate-pulse">
        {/* 왼쪽: 프로필 + 텍스트 */}
        <div className="flex items-center gap-[24px]">
          <ActionShowSkeleton />
          <UserInfoSkeleton />
        </div>

        {/* 오른쪽: 도넛형 차트 스켈레톤 */}
        <div className="flex items-end gap-[66px]">
          <BadgeSkeleton />
          <DoughnutSkeleton />
          <RefreshButtonSkeleton />
        </div>
      </div>
    </div>
  );
};

const MobileProfileBoxLoading = () => {
  return (
    <div className="mx-auto w-full flex items-center flex-col bg-gray-900 max-w-[1080px] min-h-[240px] gap-[16px] px-[20px] py-[16px] rounded-lg my-[8px] animate-pulse">
      <div className="flex flex-col items-center  gap-[12px]">
        <div className="flex items-center justify-evenly gap-[24px] w-full">
          <ActionShowSkeleton />
          <DoughnutSkeleton />
        </div>

        <div className="flex items-center gap-[12px] justify-start w-full ">
          <div className="flex items-center gap-[12px] justify-start w-full">
            <BadgeSkeleton />
            <UserInfoSkeleton />
          </div>
          <div className="w-[120px] h-[80px] " />
        </div>
      </div>
      <RefreshButtonSkeleton />
    </div>
  );
};

export { PcProfileBoxLoading, MobileProfileBoxLoading };
