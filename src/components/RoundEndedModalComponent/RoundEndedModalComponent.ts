import { Component, Vue, Prop } from "vue-property-decorator";
import Player from '@/models/Player';
import CardPlayed from '@/views/CardPlayed/CardPlayed.vue';
import Events from "@/events/Events";

@Component({
    components: {
        CardPlayed
    }
})
export default class RoundEndedModalComponent extends Vue {
    @Prop({ default: null })
    public alivePlayers?: Player[] | null;

    public onLaunchButtonClick() {
        this.socket.emit(Events.Play);
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }
}

