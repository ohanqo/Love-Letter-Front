import { Component, Vue } from "vue-property-decorator";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS, SET_CURRENT_PLAYER_ID } from "@/store/types";

@Component
export default class Lobby extends Vue {
    public username = "";

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
            this.$router.replace({ name: "game" });
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
