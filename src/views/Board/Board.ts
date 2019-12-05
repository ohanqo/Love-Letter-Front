import { Component, Vue } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from '@/events/Events';
import Player from '@/models/Player';
import store from '@/store';

@Component({
    components: {
        Hand
    }
})
export default class Board extends Vue {
    public players: Player[] = [];

    mounted() {
        this.players = this.$store.getters.GET_PLAYERSLIST;
    }

    public showAllCards() {
        console.log("Win");
    }

    public pickCard() {
        this.socket.emit(Events.PickCard);
    }
    
    public get socket(): SocketIOClient.Socket {
        return this.$store.getters.GET_SOCKET;
    }
}
