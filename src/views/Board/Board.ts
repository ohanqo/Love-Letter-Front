import { Component, Vue, Watch } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";
import Events from "@/events/Events";
import Player from "@/models/Player";
import { SET_PLAYERS } from "@/store/types";
import ChancellorModalComponent from "@/components/ChancellorModalComponent/ChancellorModalComponent.vue";
import CommonModalComponent from "@/components/CommonModalComponent/CommonModalComponent.vue";
import GuardModalComponent from "@/components/GuardModalComponent/GuardModalComponent.vue";
import PriestModalComponent from "@/components/PriestModalComponent/PriestModalComponent.vue";
import RoundEndedModalComponent from "@/components/RoundEndedModalComponent/RoundEndedModalComponent.vue";
import GameEndedModalComponent from "@/components/GameEndedModalComponent/GameEndedModalComponent.vue";
import Card from "@/models/Card";
import Message from "@/models/Message";
import PlayCardDto from "@/dto/PlayCardDto";
import { EventBus } from "@/event-bus";
import RoundResultDto from "@/dto/RoundResultDto";

@Component({
    components: {
        Hand,
        ChancellorModalComponent,
        CommonModalComponent,
        GuardModalComponent,
        PriestModalComponent,
        RoundEndedModalComponent,
        GameEndedModalComponent
    }
})
export default class Board extends Vue {
    public status: String = "C'est au tour du joueur : ";
    public showCommonModal = false;
    public showGuardModal = false;
    public showChancellorModal = false;
    public showPriestModal = false;
    public showRoundEndedModal = false;
    public showGameEndedModal = false;
    public showTurnOf = false;
    public cardPlayed?: PlayCardDto;
    public targetCard: Card | null = null;
    public roundResult: RoundResultDto | null = null;

    public mounted() {
        this.socket.on(Events.CardPicked, (players: Player[]) => {
            this.$store.commit(SET_PLAYERS, players);
        });

        this.socket.on(Events.CardPlayed, (players: Player[]) => {
            this.$store.commit(SET_PLAYERS, players);
        });

        this.socket.on(Events.ShowTargetCard, (targetCard: Card | null) => {
            if (targetCard === null) this.closePriestModal();
            else this.targetCard = targetCard;
        });

        this.socket.on(Events.ChancellorChooseCard, () => {
            if (this.currentPlayer.isPlayerTurn)
                this.showChancellorModal = true;
        });

        this.socket.on(Events.RoundEnded, (roundResult: RoundResultDto) => {
            this.roundResult = roundResult;
            this.showRoundEndedModal = true;
        });

        this.socket.on(Events.GameEnded, (roundResult: RoundResultDto) => {
            this.roundResult = roundResult;
            this.showRoundEndedModal = false;
            this.showGameEndedModal = true;
        });

        this.socket.on(Events.Message, ({ message, type }: Message) => {
            if (type === "success") {
                this.$toasted.global.success({ message });
            } else {
                this.$toasted.global.error({ message });
            }
        });

        this.socket.on(Events.StartRound, (players: Player[]) => {
            this.showRoundEndedModal = false;
            this.roundResult = null;
        });

        EventBus.$on("display-common-modal", (cardPlayed: PlayCardDto) => {
            if (this.currentPlayer.isPlayerTurn) {
                this.showCommonModal = true;
                this.cardPlayed = cardPlayed;
            }
        });

        EventBus.$on("display-guard-modal", (cardPlayed: PlayCardDto) => {
            if (this.currentPlayer.isPlayerTurn) {
                this.showGuardModal = true;
                this.cardPlayed = cardPlayed;
            }
        });

        EventBus.$on("display-priest-modal", (cardPlayed: PlayCardDto) => {
            if (this.currentPlayer.isPlayerTurn) {
                this.showPriestModal = true;
                this.cardPlayed = cardPlayed;
            }
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

    public sendCardPlayedGuard(
        selectedTargetId: string,
        selectedCardValue: string
    ) {
        if (this.cardPlayed?.cardId) {
            const data: PlayCardDto = {
                cardId: this.cardPlayed.cardId,
                targetId: selectedTargetId,
                guessCardName: selectedCardValue
            };

            this.socket.emit(Events.PlayCard, data);
            this.showGuardModal = false;
            this.cardPlayed = undefined;
        }
    }

    public sendCardPlayedPriest(selectedTargetId: string) {
        if (this.cardPlayed?.cardId) {
            const data: PlayCardDto = {
                cardId: this.cardPlayed.cardId,
                targetId: selectedTargetId
            };
            this.socket.emit(Events.PlayPriestCard, data);
            this.cardPlayed = undefined;
        }
    }

    public closePriestModal() {
        this.showPriestModal = false;
        this.targetCard = null;
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

    public fadeOutModal() {
        this.showTurnOf = false;
    }

    @Watch("playerWhoHasToPlay", { immediate: true, deep: true })
    onPlayerWhoHasToPlayChanged(
        val: Player | undefined,
        _: Player | undefined
    ) {
        if (val) {
            this.status = `C'est au tour du joueur : ${val.name}`;
            //this.showTurnOf = true;
            const anim = setTimeout(this.fadeOutModal, 1500);
        }
    }
}
