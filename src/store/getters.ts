import { GetterTree } from "vuex";
import State from "./State";
import Player from "@/models/Player";
import { GET_PLAYERS, GET_SOCKET, GET_PLAYERSLIST, GET_ME } from "./types";

const getters: GetterTree<State, State> = {
    [GET_PLAYERS](state: State): Player[] {
        return state.players;
    },
    [GET_SOCKET](state: State): SocketIOClient.Socket {
        return state.socket;
    },
    [GET_PLAYERSLIST](state: State): Player [] {
        return state.playersList;
    },
    [GET_ME](state: State): Player {
        return state.me;
    }
};

export default getters;
