import { MutationTree } from "vuex";
import State from "./State";
import { SET_PLAYERS, SET_CURRENT_PLAYER_ID } from "./types";
import Player from "@/models/Player";

const mutations: MutationTree<State> = {
    [SET_PLAYERS](state: State, newPlayers: Player[]) {
        state.players = newPlayers;
    },
    [SET_CURRENT_PLAYER_ID](state: State, newCurrrentPlayerId: string) {
        state.connectedPlayerId = newCurrrentPlayerId;
    }
};

export default mutations;
