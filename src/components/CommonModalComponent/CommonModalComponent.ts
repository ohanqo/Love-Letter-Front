import { Component, Vue, Prop } from "vue-property-decorator";
import PlayCardDto from "@/dto/PlayCardDto";
import Player from "@/models/Player";
import Card from "@/models/Card";

@Component
export default class CommonModalComponent extends Vue {
    @Prop({ required: true })
    public cardPlayed!: PlayCardDto;
    public selectedTargetId = "";

    public get players() {
        let players = this.$store.state.players;
        const card = this.currentCard;
        if (card.name === "Roi" || card.name === "Baron") {
            players = players.filter(
                (p: Player) => p.id !== this.currentPlayer.id
            );
        }
        players = players.filter((p: Player) => p.hasLost === false);

        return players;
    }

    public sendCardPlayedEvent() {
        if (this.selectedTargetId !== "")
            this.$emit("send-card-played", this.selectedTargetId);
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }

    public closeModal() {
        this.$emit("close-modal");
    }

    public get currentCard() {
        return this.currentPlayer.cardsHand.find(
            (c: Card) => c.id === this.cardPlayed.cardId
        );
    }
}
