import { MutationTree } from "vuex";
import State from "./State";
import { SET_PLAYERS, SET_CURRENT_PLAYER } from "./types";
import Player from "@/models/Player";

const mutations: MutationTree<State> = {
    [SET_PLAYERS](state: State, newPlayers: Player[]) {
        state.players = newPlayers;
    },
    [SET_CURRENT_PLAYER](state: State, newCurrrentPlayer: Player) {
        state.currentPlayer = newCurrrentPlayer;
    }
};

export default mutations;
