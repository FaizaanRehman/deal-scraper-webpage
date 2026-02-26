interface CardBadgeProps {
  text: string;
  bgColor: string;
}

const CardBadge: React.FC<CardBadgeProps> = ({ text, bgColor }) => {
  return (
    <span
      className={`inline-block ${bgColor} font-bold text-sm px-2 py-1 rounded-md shadow-lg shadow-black/30 ring-1 ring-black/20`}
    >
      {text}
    </span>
  );
};

export default CardBadge;
