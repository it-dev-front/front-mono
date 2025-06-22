import Image from "next/image";

interface GoalProps {
  goal: number;
}

export const Goal = ({ goal }: GoalProps) => {
  if (goal === 0) {
    return null;
  }

  return (
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
  );
};
