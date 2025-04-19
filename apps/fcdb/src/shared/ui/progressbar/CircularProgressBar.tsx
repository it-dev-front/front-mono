import styles from "./CircularProgressBar.module.css";

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgressBar = ({
  percentage,
  size = 120,
  strokeWidth = 7,
}: CircularProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center text-white">
      <svg width={size} height={size}>
        <circle
          className={styles["circle-bg"]}
          stroke="#444"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={styles["circle-progress"]}
          stroke="#B0FF41"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-lg font-semibold"
          fill="#ffffff"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};
