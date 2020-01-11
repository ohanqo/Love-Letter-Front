import { Component, Vue, Prop } from "vue-property-decorator";
import Card from '@/models/Card';
import CardPlayed from '@/views/CardPlayed/CardPlayed.vue';


@Component({
    components: {
        CardPlayed
    }
})
export default class PriestModalComponent extends Vue {
    @Prop({ default: null })
    public targetCard?: Card | null;

    public selectedTargetId = "";

    public get players() {
        return this.$store.state.players;
    }

    public sendCardPlayedEvent() {
        if(this.selectedTargetId !== "")
            this.$emit("send-card-played-priest", this.selectedTargetId);
    }

    public closePriestModal(){
        this.$emit("close-priest-modal");
    }
}
