import Image from "next/image";

export const Banner = () => {
  return (
    <div className="relative w-[90vw] h-[46vw] lg:w-[640px] lg:h-[320px] rounded-xl overflow-hidden">
      <Image
        unoptimized
        src="/images/banner.png"
        alt="logo"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};
