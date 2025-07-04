import Image from "next/image";

export const BallSpinner = () => {
  return (
    <div>
      <Image
        src="/images/ball-spinner.gif"
        width={60}
        height={60}
        alt="ball-spinner"
      ></Image>
    </div>
  );
};
