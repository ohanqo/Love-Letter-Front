import { Component, Vue, Prop } from "vue-property-decorator";
import Card from '@/models/Card';
import Player from '@/models/Player';

@Component
export default class CommonModalComponent extends Vue {
    @Prop({ required: true })
    public cardPlayed!: Card;

    public selectedTargetId = "";

    public get players() {
        let players = this.$store.state.players;

        if(this.cardPlayed.name === "Roi") {
            players = players.filter((p: Player) => p.id !== this.currentPlayer.id);
        }
        console.log(players);    
        return players;
    }

    public sendCardPlayedEvent() {
        if(this.selectedTargetId !== "")
            this.$emit("send-card-played", this.selectedTargetId);
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
