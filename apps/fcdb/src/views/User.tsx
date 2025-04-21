import { Header } from "@/widgets/Header";

interface UserPageProps {
  name: string;
}

export const User = ({ name }: UserPageProps) => {
  return (
    <div>
      <Header />
      <ol>
        <li>Player!</li>
        <li>{name}</li>
      </ol>
    </div>
  );
};
