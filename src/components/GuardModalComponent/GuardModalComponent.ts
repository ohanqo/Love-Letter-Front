import { Component, Vue } from "vue-property-decorator";

@Component
export default class GuardModalComponent extends Vue {
    public selectedTargetId = "";
    public selectedCardValue = "";
    
    public get players() {
        return this.$store.state.players;
    }

    public sendCardPlayedEvent(){
        if(this.selectedTargetId !== "")
            this.$emit("send-card-played-guard", this.selectedTargetId, this.selectedCardValue);
    }
}
