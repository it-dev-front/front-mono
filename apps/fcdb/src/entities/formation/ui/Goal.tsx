import Image from "next/image";

interface GoalProps {
  goal: number;
}

export const Goal = ({ goal }: GoalProps) => {
  if (goal === 0) {
    return null;
  }

  return (
    <div>
      <div className="mobile:hidden">
        <div className="flex items-center justify-center -top-[20px] absolute">
          <Image
            unoptimized
            src={"/images/ball.png"}
            alt="ball-image"
            width={24}
            height={24}
            className="rounded-[4px]"
          />
          <p className="mb-[2px] text-[#ABEE02]">{`x${goal}`}</p>
        </div>
      </div>
      <div className="hidden mobile:block">
        <div className="flex items-center justify-center top-0 -right-[28px] absolute">
          <Image
            unoptimized
            src={"/images/ball.png"}
            alt="ball-image"
            width={22}
            height={22}
            className="rounded-[4px]"
          />
          <p className="text-[#ABEE02] text-[14px]">{`x${goal}`}</p>
        </div>
      </div>
    </div>
  );
};
