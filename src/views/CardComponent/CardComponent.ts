import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/models/Card";
import Events from "@/events/Events";
import PlayCardDto from "@/dto/PlayCardDto";

@Component
export default class CardComponent extends Vue {
    @Prop({ default: false })
    public showCard!: boolean;

    @Prop({ required: true })
    public card!: Card;

    public playCard(card: Card) {
        const cardPlayed: PlayCardDto = {
            cardId: card.id
        };
        if (card.isPassive) {
            this.socket.emit(Events.PlayCard, cardPlayed);
        } else {
            console.log("select player");
        }
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }
}
