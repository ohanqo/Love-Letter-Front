import { Component, Vue } from "vue-property-decorator";
import interact from "interactjs";
import { InteractEvent } from "@interactjs/types/types";
import gsap from "gsap";

@Component
export default class ChancellorModalComponent extends Vue {
    public mounted() {
        this.initCardsDropzone();
        this.initDraggableCards();
    }

    private initCardsDropzone() {
        interact(".is-dropzone").dropzone({
            accept: ".is-draggable",
            overlap: 0.5
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

        // target.style.transform = `translate(${newX}px, ${newY}px)`;
        gsap.to(target, {
            translateX: newX,
            translateY: newY,
            ease: "power2"
        });

        target.setAttribute("data-x", `${newX}`);
        target.setAttribute("data-y", `${newY}`);
    }

    private onDraggableCardDrop(event: InteractEvent) {
        const target = event.target;

        const newX = 0;
        const newY = 0;

        // target.style.transform = `translate(${newX}px, ${newY}px)`;
        gsap.to(target, {
            translateX: newX,
            translateY: newY,
            ease: "power2"
        });

        target.setAttribute("data-x", `${newX}`);
        target.setAttribute("data-y", `${newY}`);
    }

    get connectedPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
