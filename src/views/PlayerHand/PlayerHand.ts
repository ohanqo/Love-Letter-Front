import { Component, Vue, Prop } from "vue-property-decorator";
import Player from "@/models/Player";
import CardPlayed from "../CardPlayed/CardPlayed.vue";
import CardOfPlayer from "../CardComponent/CardComponent.vue";

@Component({
    components: {
        CardOfPlayer,
        CardPlayed
    },
    filters: {
        capitalize: function(value: any) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
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

    get currentPlayer(): Player {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }

    get playerWhoHasToPlay(): Player {
        return this.$store.getters.GET_PLAYER_WHO_HAS_TO_PLAY;
    }

    get isPlayerTurn(): boolean {
        return this.player.id === this.playerWhoHasToPlay.id;
    }
}
