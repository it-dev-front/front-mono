import Image from "next/image";

interface BallSpinnerProps {
  size?: number;
  ballSize?: number;
  gap?: number; // 공 사이 간격
}

const BALL_COUNT = 8;
const BALLS = Array.from({ length: BALL_COUNT });

export const BallSpinner = ({
  size = 20,
  ballSize = 26,
  gap = 90,
}: BallSpinnerProps) => {
  // gap만큼 반지름을 더 줄여 공 사이에 여유를 둠
  const radius = size / 2 - ballSize / 2 - gap;

  return (
    <div
      className="absolute animate-spin"
      style={{ width: size, height: size }}
    >
      {BALLS.map((_, i) => {
        const angle = (i * 360) / BALL_COUNT;
        const rad = (angle * Math.PI) / 180;
        const x = size / 2 + radius * Math.cos(rad);
        const y = size / 2 + radius * Math.sin(rad);
        const opacity = 1 - 0.7 * (i / BALL_COUNT);

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%)`,
              opacity,
            }}
          >
            <Image
              src="/images/ball.png"
              alt="spinner ball"
              width={ballSize}
              height={ballSize}
              style={{ width: ballSize, height: ballSize }}
            />
          </div>
        );
      })}
    </div>
  );
};
