import { Component, Vue } from "vue-property-decorator";
import Player from "@/models/Player";

@Component
export default class GuardModalComponent extends Vue {
    public selectedTargetId = "";
    public selectedCardValue = "";
    public cards = [
        "Espionne",
        "Prêtre",
        "Baron",
        "Servante",
        "Prince",
        "Chancelier",
        "Roi",
        "Comtesse",
        "Princesse"
    ];

    public get aliveOpponents() {
        return this.$store.getters.GET_ALIVE_OPPONENTS;
    }

    public sendCardPlayedEvent() {
        if (this.selectedTargetId !== "")
            this.$emit(
                "send-card-played-guard",
                this.selectedTargetId,
                this.selectedCardValue
            );
    }

    public closeModal() {
        this.$emit("close-modal");
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
