import { ButtonSpinner } from "@/shared/ui/spinner/ButtonSpinner";

interface ShowMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  text?: string;
}

export const ShowMoreButton = ({
  onClick,
  disabled,
  loading,
  text = "더 보기",
}: ShowMoreButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-gray-900 text-white px-4 h-[58px] rounded-md w-full border-1 border-gray-800 ${
        loading ? "bg-gray-800 opacity-80 cursor-default" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <ButtonSpinner /> : text}
    </button>
  );
};
