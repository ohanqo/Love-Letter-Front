import { GetterTree } from "vuex";
import State from "./State";
import {
    GET_PLAYER_WHO_HAS_TO_PLAY,
    GET_CONNECTED_PLAYER,
    GET_ALIVE_OPPONENTS
} from "./types";
import Player from "@/models/Player";

const getters: GetterTree<State, State> = {
    [GET_PLAYER_WHO_HAS_TO_PLAY](state: State): Player | undefined {
        return state.players.find((p: Player) => p.isPlayerTurn === true);
    },
    [GET_CONNECTED_PLAYER](state: State): Player | undefined {
        return state.players.find(
            (p: Player) => p.id === state.connectedPlayerId
        );
    },
    [GET_ALIVE_OPPONENTS](state: State, getters: any): Player[] {
        return state.players.filter(
            (p: Player) =>
                p.hasLost === false && p.id !== getters.GET_CONNECTED_PLAYER.id
        );
    }
};

export default getters;
