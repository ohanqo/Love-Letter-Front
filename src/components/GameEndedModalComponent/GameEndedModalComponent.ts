import { Component, Vue, Prop } from "vue-property-decorator";
import CardPlayed from "@/views/CardPlayed/CardPlayed.vue";
import RoundResultDto from "@/dto/RoundResultDto";

@Component({
    components: {
        CardPlayed
    }
})
export default class GameEndedModalComponent extends Vue {
    @Prop({ default: null })
    public roundResult?: RoundResultDto | null;

    public get players() {
        return this.$store.state.players;
    }
}
