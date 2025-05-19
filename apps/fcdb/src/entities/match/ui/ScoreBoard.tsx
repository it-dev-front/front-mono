interface ScoreBoardProps {
  userScore: number;
  opponentScore: number;
}

const ScoreBoard = ({ userScore, opponentScore }: ScoreBoardProps) => {
  return (
    <div className="flex justify-between items-center w-[103px] h-[32px] mobile:w-[41px] mobile:h-[18px] leading-none">
      <span className="text-[28px] mobile:text-[16px]">{userScore}</span>
      <span className="text-[20px] mobile:text-[12px]">vs</span>
      <span className="text-[28px] mobile:text-[16px]">{opponentScore}</span>
    </div>
  );
};

export default ScoreBoard;
