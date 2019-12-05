import { Component, Vue } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from '@/events/Events';
import Player from '@/models/Player';

@Component({
    components: {
        Hand
    }
})
export default class Board extends Vue {
    public players: Player[] = [];
    public status: String = "C'est au tour du joueur : ";
    public playerTurn: Player | undefined;

    mounted() {
        this.players = this.$store.getters.GET_PLAYERSLIST;
        this.playerTurn  = this.isTurnOf(this.players);
        if(this.playerTurn)
            this.status += this.playerTurn.name;
    }

    public showAllCards() {
        console.log("Win");
    }

    public pickCard() {
        console.log(this.currentPlayer.isPlayerTurn)
        if (this.currentPlayer.isPlayerTurn){
            console.log("pioche");
            this.socket.emit(Events.PickCard);
        }
    }
    
    public get socket(): SocketIOClient.Socket {
        return this.$store.getters.GET_SOCKET;
    }

    public isTurnOf(players: Player[]): Player | undefined {
        return this.players.find((p: Player) => p.isPlayerTurn == true);
    }

    get currentPlayer() {
        return this.$store.getters.GET_ME;
    }
}
