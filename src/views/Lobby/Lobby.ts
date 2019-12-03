import { Component, Vue } from "vue-property-decorator";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS } from "@/store/types";

@Component
export default class Lobby extends Vue {
    public username = "";
    public playerList: Player[] = [];

    public mounted() {
        this.socket.on(Events.Players, (playerList: Player[]) => {
            this.$store.commit(SET_PLAYERS, playerList);
            this.playerList = playerList;
        });

        this.socket.on(Events.GameFull, () => {
            alert("La partie est pleine");
        });
    }

    public onPlayClick() {
        this.socket.emit(Events.PlayerConnect, this.username);
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.getters.GET_SOCKET;
    }
}
