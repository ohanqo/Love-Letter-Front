import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/models/Card";
import Events from "@/events/Events";
import PlayCardDto from "@/dto/PlayCardDto";
import Player from "@/models/Player";
import { GET_PLAYER_WHO_HAS_TO_PLAY } from "@/store/types";

@Component
export default class CardComponent extends Vue {
    @Prop({ default: false })
    public showCard!: boolean;

    @Prop({ required: true })
    public card!: Card;

    @Prop({ required: true })
    public player!: Player;

    @Prop({ required: true })
    public isSelected!: boolean;

    public playCard(card: Card) {
        const cardPlayed: PlayCardDto = {
            cardId: card.id
        };
        if (card.name === "Chancelier") {
            this.socket.emit(Events.PlayChancellorCard, cardPlayed);
        } else if (card.isPassive) {
            this.socket.emit(Events.PlayCard, cardPlayed);
        } else {
            this.selectedCard();
            console.log("select player");
        }
    }

    public selectedCard() {
        if (this.connectedPlayer.id === this.playerWhoHasToPlay.id) {
            this.$emit("update-selected-card");
        }
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    public get playerWhoHasToPlay(): Player {
        return this.$store.getters.GET_PLAYER_WHO_HAS_TO_PLAY;
    }

    get connectedPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
