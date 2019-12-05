import { Component, Vue, Watch } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS } from "@/store/types";

@Component({
    components: {
        Hand
    }
})
export default class Board extends Vue {
    public status: String = "C'est au tour du joueur : ";

    public mounted() {
        this.socket.on(Events.CardPicked, (players: Player[]) => {
            this.$store.commit(SET_PLAYERS, players);
        });
    }

    public showAllCards() {
        console.log("Win");
    }

    public pickCard() {
        if (this.currentPlayer.isPlayerTurn) {
            this.socket.emit(Events.Pick);
        }
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    get currentPlayer() {
        return this.$store.getters.GET_CURRENT_PLAYER;
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
