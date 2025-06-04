interface PositionIndicatorProps {
  color: string;
  label: string;
}

export const PositionIndicator = ({ color, label }: PositionIndicatorProps) => {
  return (
    <div className="flex items-center gap-[4px]">
      <div className={`w-[8px] h-[8px] rounded-full bg-[${color}]`} />
      <p className="text-[10px] font-bold">{label}</p>
    </div>
  );
};
