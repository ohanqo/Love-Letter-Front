import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/models/Card";
import CardPlayed from "@/views/CardPlayed/CardPlayed.vue";
import Player from "@/models/Player";

@Component({
    components: {
        CardPlayed
    }
})
export default class PriestModalComponent extends Vue {
    @Prop({ default: null })
    public targetCard?: Card | null;

    public selectedTargetId = this.aliveOpponents[0]?.id ?? "";

    public get aliveOpponents() {
        return this.$store.getters.GET_ALIVE_OPPONENTS;
    }

    public sendCardPlayedEvent() {
        if (this.selectedTargetId !== "")
            this.$emit("send-card-played-priest", this.selectedTargetId);
    }

    public closePriestModal() {
        this.$emit("close-priest-modal");
    }

    public closeModal() {
        this.$emit("close-modal");
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
