import { GetterTree } from "vuex";
import State from "./State";
import Player from "@/models/Player";
import { GET_PLAYERS, GET_SOCKET } from "./types";

const getters: GetterTree<State, State> = {
    [GET_PLAYERS](state: State): Player[] {
        return state.players;
    },
    [GET_SOCKET](state: State): SocketIOClient.Socket {
        return state.socket;
    }
};

export default getters;
