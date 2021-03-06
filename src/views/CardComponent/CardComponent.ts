import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/models/Card";
import Events from "@/events/Events";
import PlayCardDto from "@/dto/PlayCardDto";
import Player from "@/models/Player";
import { GET_PLAYER_WHO_HAS_TO_PLAY } from "@/store/types";
import { EventBus } from "@/event-bus";

@Component
export default class CardComponent extends Vue {
    @Prop({ default: false })
    public showCard!: boolean;

    @Prop({ required: true })
    public card!: Card;

    @Prop({ required: true })
    public player!: Player;

    public playCard(card: Card) {
        const cardPlayed: PlayCardDto = {
            cardId: card.id
        };

        if (this.isCardBelongsToPlayer(cardPlayed.cardId)) {
            if (card.name === "Chancelier") {
                this.socket.emit(Events.PlayChancellorCard, cardPlayed);
            } else if (card.name === "Garde") {
                EventBus.$emit("display-guard-modal", cardPlayed);
            } else if (card.name === "Prêtre") {
                EventBus.$emit("display-priest-modal", cardPlayed);
            } else if (card.isPassive) {
                this.socket.emit(Events.PlayCard, cardPlayed);
            } else {
                EventBus.$emit("display-common-modal", cardPlayed);
            }
        }
    }

    public isCardBelongsToPlayer(id: string) {
        return this.connectedPlayer.cardsHand.some((c: Card) => c.id === id);
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    public get playerWhoHasToPlay(): Player {
        return this.$store.getters.GET_PLAYER_WHO_HAS_TO_PLAY;
    }

    get connectedPlayer(): Player {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
