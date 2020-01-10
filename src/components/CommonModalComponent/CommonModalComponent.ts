import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CommonModalComponent extends Vue {
    public selectedTargetId = "";

    public get players() {
        return this.$store.state.players;
    }

    public sendCardPlayedEvent() {
        this.$emit("send-card-played", this.selectedTargetId);
    }
}
