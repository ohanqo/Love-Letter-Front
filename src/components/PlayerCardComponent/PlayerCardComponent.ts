import { Component, Vue, Prop } from "vue-property-decorator";
import CardPlayed from "@/views/CardPlayed/CardPlayed.vue";
import Player from "@/models/Player";

@Component({
    components: {
        CardPlayed
    }
})
export default class PlayerCardComponent extends Vue {
    @Prop({ required: true })
    public player!: Player;

    public get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
