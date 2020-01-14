import { Component, Vue, Prop } from "vue-property-decorator";
import PlayerCardComponent from "@/components/PlayerCardComponent/PlayerCardComponent.vue";
import RoundResultDto from "@/dto/RoundResultDto";

@Component({
    components: {
        PlayerCardComponent
    }
})
export default class GameEndedModalComponent extends Vue {
    @Prop({ default: null })
    public roundResult?: RoundResultDto | null;
}
