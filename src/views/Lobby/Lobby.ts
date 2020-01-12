import { Component, Vue } from "vue-property-decorator";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS, SET_CURRENT_PLAYER_ID } from "@/store/types";
import RoundEndedModalComponent from '@/components/RoundEndedModalComponent/RoundEndedModalComponent.vue';

@Component({
    components: {
        RoundEndedModalComponent
    }
})
export default class Lobby extends Vue {
    public username = "";
    public showRoundEndedModal = false;
    public alivePlayers: Player[] | null = null;

    public mounted() {
        this.socket.on(Events.Players, (playerList: Player[]) => {
            this.$store.commit(SET_PLAYERS, playerList);
        });

        this.socket.on(Events.GameFull, () => {
            alert("La partie est pleine !");
        });

        this.socket.on(Events.NotEnoughPlayers, () => {
            alert("Il n'y a pas assez de joueur pour commencer la partie !");
        });

        this.socket.on(Events.AlreadyRegistered, () => {
            alert("Vous êtes déjà inscrit !");
        });

        this.socket.on(Events.CurrentPlayer, (currentPlayerId: string) => {
            this.$store.commit(SET_CURRENT_PLAYER_ID, currentPlayerId);
        });

        this.socket.on(Events.StartRound, (players: Player[]) => {
            console.log(players);
            this.$store.commit(SET_PLAYERS, players);

            if (this.$router.currentRoute.name !== "game") {
                this.$router.replace({ name: "game" });
            }

            this.showRoundEndedModal = false;
            this.alivePlayers = null;
        });

        this.socket.on(Events.RoundEnded, (alivePlayers: Player[]) => {
            console.log("Joueurs restant :");
            console.log(alivePlayers);
            this.alivePlayers = alivePlayers;
            this.showRoundEndedModal = true;
        });
    }

    public onPlayClick() {
        this.socket.emit(Events.PlayerConnect, this.username);
    }

    public onLaunchButtonClick() {
        this.socket.emit(Events.Play);
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    public get players(): Player[] {
        return this.$store.state.players;
    }
}
