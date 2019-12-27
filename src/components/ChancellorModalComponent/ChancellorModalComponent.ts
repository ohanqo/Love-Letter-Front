import { Component, Vue } from "vue-property-decorator";
import interact from "interactjs";
import { InteractEvent } from "@interactjs/types/types";
import gsap from "gsap";
import Card from "@/models/Card";
import Player from "@/models/Player";
import { findIndex, cloneDeep } from "lodash";

@Component
export default class ChancellorModalComponent extends Vue {
    public placedCards: Card[] = [];

    public mounted() {
        this.initCardsDropzone();
        this.initDraggableCards();
    }

    public emitPlacedCards() {
        this.$emit("send-chancellor-placed-cards", cloneDeep(this.placedCards));
    }

    public get hasPlacedAllCards(): boolean {
        return this.placedCards.length >= this.connectedPlayer.cardsHand.length;
    }

    private initCardsDropzone() {
        interact(".is-dropzone").dropzone({
            accept: ".is-draggable",
            overlap: 0.75
        });
    }

    private initDraggableCards() {
        interact(".is-draggable").draggable({
            onmove: this.onDraggableCardMove,
            onend: this.onDraggableCardDrop
        });
    }

    private onDraggableCardMove(event: InteractEvent) {
        const target = event.target;

        const dataX = target.getAttribute("data-x");
        const dataY = target.getAttribute("data-y");
        const initialX = dataX ? parseFloat(dataX) : 0;
        const initialY = dataY ? parseFloat(dataY) : 0;

        const deltaX = event.dx;
        const deltaY = event.dy;

        const newX = initialX + deltaX;
        const newY = initialY + deltaY;

        this.moveTargetTo(target, newX, newY);
    }

    private onDraggableCardDrop(event: InteractEvent) {
        if (this.isOverlappingDropzone(event)) {
            this.clipCardToDropzoneIndex(event);
        } else {
            this.removePotentialPlacedCard(event);
            this.moveTargetTo(event.target, 0, 0);
        }
    }

    private clipCardToDropzoneIndex(event: InteractEvent) {
        const dropzone = event.relatedTarget;
        const dropzoneIndex = this.getDropzoneId(dropzone);

        if (this.isOverllapingSameDropzone(event, dropzoneIndex)) {
            return;
        } else if (this.isDropzoneEmpty(dropzoneIndex)) {
            this.assignCardToDropzoneIndex(event, dropzoneIndex);
        } else {
            this.moveTargetTo(event.target, 0, 0);
        }
    }

    private isOverllapingSameDropzone(
        event: InteractEvent,
        dropzoneIndex: number
    ): boolean {
        const card = this.findCardById(event.target.id);
        return this.placedCards[dropzoneIndex] === card ? true : false;
    }

    private assignCardToDropzoneIndex(
        event: InteractEvent,
        dropzoneIndex: number
    ) {
        const target = event.target;
        const card = this.findCardById(target.id);

        if (card) {
            this.removeCardFromPlacedCards(card);
            this.placedCards.splice(dropzoneIndex, 1, card);
        } else {
            alert("Une erreur est survenue lors du placement de la carte.");
        }
    }

    private findCardById(id: string) {
        return this.connectedPlayer.cardsHand.find((c: Card) => c.id === id);
    }

    private removeCardFromPlacedCards(card: Card) {
        this.placedCards.map((c: Card, index: number) => {
            if (c.id === card.id) {
                this.placedCards.splice(index, 1);
            }
        });
    }

    private getDropzoneId(dropzone: Interact.Element): number {
        const rawIndex = dropzone.getAttribute("data-index") ?? "-1";
        return parseInt(rawIndex);
    }

    private removePotentialPlacedCard(event: InteractEvent) {
        const potentialPlacedCardId = event.target.id;
        const potentialPlacedCardIndex = findIndex(this.placedCards, {
            id: potentialPlacedCardId
        });

        if (potentialPlacedCardIndex !== -1) {
            this.placedCards.splice(potentialPlacedCardIndex, 1);
        }
    }

    private isDropzoneEmpty(index: number): boolean {
        return this.placedCards[index] ? false : true;
    }

    private moveTargetTo(target: Interact.Element, x: number, y: number) {
        gsap.to(target, {
            translateX: x,
            translateY: y,
            ease: "power2"
        });

        target.setAttribute("data-x", `${x}`);
        target.setAttribute("data-y", `${y}`);
    }

    private isOverlappingDropzone(event: InteractEvent) {
        return event.relatedTarget !== null;
    }

    get connectedPlayer(): Player {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
