import { Component, Vue } from "vue-property-decorator";
import Hand from "../PlayerHand/PlayerHand.vue";

@Component({
    components: {
        Hand
    }
})
export default class Board extends Vue {
    mounted() {}

    public showAllCards() {
        console.log("Win");
    }
}
