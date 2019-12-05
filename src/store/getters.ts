import { GetterTree } from "vuex";
import State from "./State";
import { GET_PLAYER_WHO_HAS_TO_PLAY } from "./types";
import Player from "@/models/Player";

const getters: GetterTree<State, State> = {
    [GET_PLAYER_WHO_HAS_TO_PLAY](state: State): Player | undefined {
        return state.players.find((p: Player) => p.isPlayerTurn === true);
    }
};

export default getters;
