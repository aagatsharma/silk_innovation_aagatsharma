import { CardsProps } from "@/types/cardtypes";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface MemoryCardProps {
  card: CardsProps;
  handleClick: (card: CardsProps) => void;
  flipped: boolean;
  disable: boolean;
}

const MemoryCards = ({
  card,
  handleClick,
  flipped,
  disable,
}: MemoryCardProps) => {
  const handleCardClick = () => {
    if (disable) {
      return;
    }

    handleClick(card);
  };
  return (
    <Card className={`w-[100px] h-[100px] `}>
      <Button
        size={"lg"}
        variant={"secondary"}
        className={`w-full h-full ${
          card.matched && "bg-red-500 hover:bg-red-500"
        }`}
        onClick={handleCardClick}
      >
        <h1
          className={`${card.matched && "invisible"} ${
            flipped ? "visible" : "invisible"
          } text-2xl`}
        >
          {card.name}
        </h1>
      </Button>
    </Card>
  );
};

export default MemoryCards;
