import { Component, Vue } from "vue-property-decorator";

@Component
export default class PriestModalComponent extends Vue {
    public selectedTargetId = "";

    public get players() {
        return this.$store.state.players;
    }

    public sendCardPlayedEvent() {
        if(this.selectedTargetId !== "")
            this.$emit("send-card-played", this.selectedTargetId);
    }
}
