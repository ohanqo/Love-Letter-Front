import { MutationTree } from "vuex";
import State from "./State";
import { SET_PLAYERS } from "./types";
import Player from "@/models/Player";

const mutations: MutationTree<State> = {
    [SET_PLAYERS](state: State, newPlayers: Player[]) {
        state.players = newPlayers;
    }
};

export default mutations;
