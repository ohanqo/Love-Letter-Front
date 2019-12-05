import io from "socket.io-client";
import Player from "@/models/Player";

export default class State {
    public socket = io.connect(process.env.VUE_APP_SERVER_URL!);
    public currentPlayer: Player = new Player("0", "Unkown", []);
    public players: Player[] = [];
}
