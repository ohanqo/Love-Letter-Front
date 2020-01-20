import { Component, Vue } from "vue-property-decorator";
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
import MessageComponent from "@/components/MessageComponent/MessageComponent.vue";
import Card from "@/models/Card";
import Message from "@/models/Message";
import PlayCardDto from "@/dto/PlayCardDto";
import { EventBus } from "@/event-bus";
import RoundResultDto from "@/dto/RoundResultDto";
import Chat from "@/dto/ChatDto";

@Component({
    components: {
        Hand,
        ChancellorModalComponent,
        CommonModalComponent,
        GuardModalComponent,
        PriestModalComponent,
        RoundEndedModalComponent,
        GameEndedModalComponent,
        MessageComponent
    }
})
export default class Board extends Vue {
    public showCommonModal = false;
    public showGuardModal = false;
    public showChancellorModal = false;
    public showPriestModal = false;
    public showRoundEndedModal = false;
    public showGameEndedModal = false;
    public cardPlayed?: PlayCardDto;
    public targetCard: Card | null = null;
    public roundResult: RoundResultDto | null = null;
    public NumberOfCard = 18;
    public chatMessage: Chat[] = [];
    public userMessage: string = "";

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

        this.socket.on(Events.StartRound, (players: Player[]) => {
            this.showRoundEndedModal = false;
            this.roundResult = null;
        });

        this.socket.on(Events.NumberOfCardsLeft, (NumberOfCard: number) => {
            this.NumberOfCard = NumberOfCard;
        });

        this.socket.on(Events.Chat, (chat: Chat) => {
            this.chatMessage.push(chat);
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

        EventBus.$on("replay", () => this.replay());
    }

    public closeModal() {
        this.showCommonModal = false;
        this.showGuardModal = false;
        this.showPriestModal = false;
        this.cardPlayed = undefined;
    }

    public sendMessageInChat() {
        if (this.userMessage !== "") {
            const data: Chat = {
                player: this.currentPlayer,
                message: this.userMessage,
                type: "chat"
            };
            this.socket.emit(Events.Chat, data);
            this.userMessage = "";
        }
    }

    public replay() {
        this.showGameEndedModal = false;
        this.socket.emit(Events.Play);
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

    public valideInputName(e: any) {
        if (e.keyCode === 13) {
            this.sendMessageInChat();
        }
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

    get chatMessageGrouped(): Chat[] {
        return this.chatMessage.map((c: Chat, index: number) => {
            const potentialPreviousChat = this.chatMessage[index - 1];

            if (
                this.isPreviousMessageIsFromSamePlayer(potentialPreviousChat, c)
            ) {
                c.player.name = "";
            }

            return c;
        });
    }

    private isPreviousMessageIsFromSamePlayer(
        potentialPreviousChat: Chat,
        c: Chat
    ) {
        return (
            c.type !== "gameevent" &&
            potentialPreviousChat &&
            potentialPreviousChat.player.id === c.player.id
        );
    }
}
