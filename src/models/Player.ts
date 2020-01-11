import Card from "./Card";

export default class Player {
    public constructor(
        public id: string,
        public name: string,
        public cardsHand: Card[] = [],
        public consumedCards: Card[] = [],
        public isPlayerTurn = false,
        public hasLost = false,
        public points = 0
    ) {}
}
