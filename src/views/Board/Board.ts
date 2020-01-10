import { Component, Vue, Watch } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS } from "@/store/types";
import ChancellorModalComponent from "@/components/ChancellorModalComponent/ChancellorModalComponent.vue";
import CommonModalComponent from "@/components/CommonModalComponent/CommonModalComponent.vue";
import Card from "@/models/Card";
import Message from "@/models/Message";
import PlayCardDto from '@/dto/PlayCardDto';
import { EventBus } from '@/event-bus';
import CardPlayed from '../CardPlayed/CardPlayed';

@Component({
    components: {
        Hand,
        ChancellorModalComponent,
        CommonModalComponent
    }
})
export default class Board extends Vue {
    public status: String = "C'est au tour du joueur : ";
    public showCommonModal = false;
    public showChancellorModal = false;
    public cardPlayed?: PlayCardDto;

    public mounted() {
        this.socket.on(Events.CardPicked, (players: Player[]) => {
            this.$store.commit(SET_PLAYERS, players);
        });

        this.socket.on(Events.CardPlayed, (players: Player[]) => {
            this.$store.commit(SET_PLAYERS, players);
        });

        this.socket.on(Events.ChancellorChooseCard, () => {
            this.showChancellorModal = true;
        });

        this.socket.on(Events.Message, ({ message, type }: Message) => {
            if (type === "success") {
                this.$toasted.global.success({ message });
            } else {
                this.$toasted.global.error({ message });
            }
        });

        EventBus.$on('display-common-modal', (cardPlayed: PlayCardDto) => {
            this.showCommonModal = true;
            this.cardPlayed = cardPlayed;
        });
    }

    public sendCardPlayed(selectedTargetId: string) {
        if (this.cardPlayed?.cardId) {
            const data: PlayCardDto = {
                cardId: this.cardPlayed.cardId,
                targetId: selectedTargetId
            };

            this.socket.emit(Events.PlayCard, data);
            this.showCommonModal = false;
            this.cardPlayed = undefined;
        }
    }

    public sendChancellorPlacedCards(placedCards: Card[]) {
        this.socket.emit(Events.ChancellorPlacedCard, placedCards);
        this.showChancellorModal = false;
    }

    public showAllCards() {
        console.log("Win");
    }

    public pickCard() {
        if (this.currentPlayer.isPlayerTurn) {
            this.socket.emit(Events.Pick);
        }
    }

    public get socket(): SocketIOClient.Socket {
        return this.$store.state.socket;
    }

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }

    get players() {
        return this.$store.state.players;
    }

    get playerWhoHasToPlay(): Player | undefined {
        return this.$store.getters.GET_PLAYER_WHO_HAS_TO_PLAY;
    }

    @Watch("playerWhoHasToPlay", { immediate: true, deep: true })
    onPlayerWhoHasToPlayChanged(
        val: Player | undefined,
        _: Player | undefined
    ) {
        if (val) {
            this.status = `C'est au tour du joueur : ${val.name}`;
        }
    }
}
