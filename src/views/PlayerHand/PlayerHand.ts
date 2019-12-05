import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Player from "@/models/Player";
import Card from "@/models/Card";
import CardOfPlayer from "../Card/Card.vue";

@Component({
    components:{
        CardOfPlayer
    }
})
export default class PlayerHand extends Vue {
    @Prop({ required: true })
    public player!: Player;

    public card: Card = new Card();
    public showCard: boolean = false;

    mounted() {
        this.card = this.player.cardsHand[this.player.cardsHand.length - 1];
        if(this.currentPlayer.id === this.player.id)
            this.showCard = true;
        else
            this.showCard = false
    }

    get currentPlayer() {
        return this.$store.getters.GET_ME;
    }
}
