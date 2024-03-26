import MemoryCards from "@/components/home/MemoryCards";
import { Button } from "@/components/ui/button";
import { CardsProps } from "@/types/cardtypes";
import { useEffect, useState } from "react";

const cardsNumber = [
  { name: 1, matched: false },
  { name: 2, matched: false },
  { name: 3, matched: false },
  { name: 4, matched: false },
  { name: 5, matched: false },
  { name: 6, matched: false },
  { name: 7, matched: false },
  { name: 8, matched: false },
  { name: 9, matched: false },
  { name: 10, matched: false },
];

const Home = () => {
  const [cards, setCards] = useState<CardsProps[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardsProps | null>();
  const [secondChoice, setSecondChoice] = useState<CardsProps | null>();
  const [disable, setDisable] = useState(false);

  const shuffleCards = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    const shufflingCard = [...cardsNumber, ...cardsNumber]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shufflingCard);
  };

  const handleClick = (card: CardsProps) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisable(false);
  };

  useEffect(() => {
    if (!firstChoice || !secondChoice) {
      return;
    }
    setDisable(true);

    if (firstChoice.name === secondChoice.name) {
      setCards((prevcard) =>
        prevcard.map((item) =>
          item.name === firstChoice.name ? { ...item, matched: true } : item
        )
      );
    }
    setTimeout(resetTurn, 1000);
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1>Memory Game</h1>
        <Button onClick={shuffleCards}>Shuffle Cards</Button>
      </div>
      <div className="flex items-center flex-col mt-10">
        <div className="grid grid-cols-5 gap-4">
          {cards.map((card: CardsProps, index: number) => (
            <MemoryCards
              card={card}
              key={index}
              handleClick={handleClick}
              flipped={
                card === firstChoice || card === secondChoice || card.matched
              }
              disable={disable}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
