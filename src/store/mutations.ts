import { MutationTree } from "vuex";
import State from "./State";
import { SET_PLAYERS,SET_PLAYERSLIST, SET_ME } from "./types";
import Player from "@/models/Player";

const mutations: MutationTree<State> = {
    [SET_PLAYERS](state: State, newPlayers: Player[]) {
        state.players = newPlayers;
    },
    [SET_PLAYERSLIST](state: State, newPlayers: Player[]) {
        state.playersList = newPlayers;
    },
    [SET_ME](state: State, newPlayers: Player) {
        state.me = newPlayers;
    }
};

export default mutations;
