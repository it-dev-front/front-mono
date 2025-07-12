import { User } from "@/views/User";
import { Metadata } from "next";

interface UserPageProps {
  params: { name: string };
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  return {
    title: `${decodedName} | FCDB - FC 온라인 전적 검색`,
    description: `${decodedName}님의 FC 온라인 전적 정보입니다.`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { name } = await params;

  return <User nickname={name} />;
}
