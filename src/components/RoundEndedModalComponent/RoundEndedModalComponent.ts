import { Component, Vue, Prop } from "vue-property-decorator";
import CardPlayed from "@/views/CardPlayed/CardPlayed.vue";
import Events from "@/events/Events";
import RoundResultDto from "@/dto/RoundResultDto";

@Component({
    components: {
        CardPlayed
    }
})
export default class RoundEndedModalComponent extends Vue {
    @Prop({ default: null })
    public roundResult?: RoundResultDto | null;

    public onLaunchButtonClick() {
        this.socket.emit(Events.Play);
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    public get players() {
        return this.$store.state.players;
    }
}
