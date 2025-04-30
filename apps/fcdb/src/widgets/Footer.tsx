import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 flex flex-col items-center justify-center py-16">
      <Image src="/logo.svg" alt="logo" width={108} height={20} />
      <p className="text-[#FFFFFF] text-lg pt-[18px] lg:text-xl">
        Data based on NEXON DEVELOPERS
      </p>
    </footer>
  );
};
