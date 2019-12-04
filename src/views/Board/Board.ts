import { Component, Vue } from "vue-property-decorator";

@Component
export default class Board extends Vue {
    mounted() {}

    public showAllCards() {
        console.log("Win");
    }
}
