import { Component, Vue, Prop } from "vue-property-decorator";
import Events from "@/events/Events";
import RoundResultDto from "@/dto/RoundResultDto";
import PlayerCardComponent from "@/components/PlayerCardComponent/PlayerCardComponent.vue";

@Component({
    components: {
        PlayerCardComponent
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
}
