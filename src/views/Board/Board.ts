import { Component, Vue, Watch } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from "@/events/Events";
import Player from "@/models/Player";

@Component({
    components: {
        Hand
    }
})
export default class Board extends Vue {
    public status: String = "C'est au tour du joueur : ";

    public showAllCards() {
        console.log("Win");
    }

    public pickCard() {
        if (this.currentPlayer.isPlayerTurn) {
            this.socket.emit(Events.PickCard);
        }
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    get currentPlayer() {
        return this.$store.state.currentPlayer;
    }

    get players() {
        return this.$store.state.players;
    }

    get playerWhoHasToPlay(): Player | undefined {
        return this.$store.getters.GET_PLAYER_WHO_HAS_TO_PLAY;
    }

    @Watch("playerWhoHasToPlay", { immediate: true, deep: true })
    onPlayerWhoHasToPlayChanged(
        val: Player | undefined,
        _: Player | undefined
    ) {
        if (val) {
            this.status = `C'est au tour du joueur : ${val.name}`;
        }
    }
}
