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
      <div className="hidden lg:block">
        <div className="flex items-center justify-center -top-6 absolute">
          <Image
            src={"/images/ball.png"}
            alt="season-image"
            width={24}
            height={24}
            className="rounded-[4px]"
          />
          <p className="mb-[2px] text-[#ABEE02]">{`x${goal}`}</p>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex items-center justify-center -top-[-20px] right-[-12px] absolute">
          <Image
            src={"/images/ball.png"}
            alt="season-image"
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
