import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 flex flex-col items-center justify-center py-16">
      <Image src="/logo.svg" alt="logo" width={108} height={20} />
      <p className="text-[#FFFFFF] text-xl pt-[18px]">
        Data based on NEXON DEVELOPERS
      </p>
    </footer>
  );
};
