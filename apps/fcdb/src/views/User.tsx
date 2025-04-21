import { Header } from "@/widgets/Header";

interface UserPageProps {
  name: string;
}

export const User = ({ name }: UserPageProps) => {
  return (
    <div>
      <Header />
      <div className="pt-40 flex justify-center">
        <ol>
          <li>player</li>
          <li>{name}</li>
        </ol>
      </div>
    </div>
  );
};
