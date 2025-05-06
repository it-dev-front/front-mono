interface ScoreCardProps {
  userScore: number;
  opponentScore: number;
}

// TODO: 모바일 고려 필요
// 모바일 : 41x18;
// PC : 103x32;

const ScoreCard = ({ userScore, opponentScore }: ScoreCardProps) => {
  return (
    <div className="score-card flex justify-between items-center w-[103px] h-[32px] text-[28px] leading-none">
      <span className="score-user">{userScore}</span>
      <span className="score-separator">vs</span>
      <span className="score-opponent">{opponentScore}</span>
    </div>
  );
};

export default ScoreCard;
