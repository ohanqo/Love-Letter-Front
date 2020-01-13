import { Component, Vue, Prop } from "vue-property-decorator";
import Player from "@/models/Player";
import CardPlayed from "@/views/CardPlayed/CardPlayed.vue";
import Events from "@/events/Events";

@Component({
    components: {
        CardPlayed
    }
})
export default class GameEndedModalComponent extends Vue {
    @Prop({ required: true })
    public winners!: Player[];

    public get players() {
        return this.$store.state.players;
    }
}
