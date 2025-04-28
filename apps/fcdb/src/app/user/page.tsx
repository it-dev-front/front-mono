import { User } from "@/views/User";

interface UserPageProps {
  searchParams: {
    name: string;
  };
}

export default async function UserPage({ searchParams }: UserPageProps) {
  const { name } = await searchParams;

  return (
    <div>
      <User name={name} />
    </div>
  );
}
