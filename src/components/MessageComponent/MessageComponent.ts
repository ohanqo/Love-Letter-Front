import { Component, Vue, Prop } from "vue-property-decorator";
import ChatDto from "@/dto/ChatDto";

@Component
export default class MessageComponent extends Vue {
    @Prop({ required: true })
    public chat!: ChatDto;

    get currentPlayer() {
        return this.$store.getters.GET_CONNECTED_PLAYER;
    }
}
