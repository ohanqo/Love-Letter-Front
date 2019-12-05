import io from "socket.io-client";
import Player from "@/models/Player";

export default class State {
    public socket = io.connect(process.env.VUE_APP_SERVER_URL!);
    public players: Player[] = [];
    public playersList: Player[] = [];
    public me!: Player;
}
