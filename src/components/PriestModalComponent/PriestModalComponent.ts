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

    public selectedTargetId = "";

    public get players() {
        const players = this.$store.state.players;
        return players.filter((p: Player) => p.id !== this.currentPlayer.id);
    }

    public sendCardPlayedEvent() {
        if (this.selectedTargetId !== "")
            this.$emit("send-card-played-priest", this.selectedTargetId);
    }

    public closePriestModal() {
        this.$emit("close-priest-modal");
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
