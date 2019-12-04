import Card from "./Card";

export default class Player {
    public constructor(
        public id: string,
        public name: string,
        public cardsHand: Card[] = []
    ) {}
}
