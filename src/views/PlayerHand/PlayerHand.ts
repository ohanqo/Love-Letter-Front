import { Component, Vue, Prop } from "vue-property-decorator";
import Player from '@/models/Player';
import Card from '@/models/Card';


@Component
export default class PlayerHand extends Vue {
    @Prop({ required: true})
    public player!: Player;

    public card: Card = new Card;
    public showCard: boolean = false;

    mounted(){
        this.card = this.player.cardsHand[this.player.cardsHand.length-1];
    }

    get currentPlayer() {
        return this.$store.getters.GET_ME;
    }

}
