import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Player from "@/models/Player";
import Card from "@/models/Card";
import CardOfPlayer from "../CardComponent/CardComponent.vue";

@Component({
    components: {
        CardOfPlayer
    }
})
export default class PlayerHand extends Vue {
    @Prop({ required: true })
    public player!: Player;

    public cardSelectedIndex = -1;

    public showCard: boolean = false;

    mounted() {
        if (this.currentPlayer.id === this.player.id) this.showCard = true;
        else this.showCard = false;
    }


    updateSelectedCard(newIndex: number) {
        this.cardSelectedIndex = newIndex;
    }
    
    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
