import { User } from "@/views/User";

interface UserPageProps {
  params: Promise<{ name: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { name } = await params;

  return <User nickname={name} />;
}
