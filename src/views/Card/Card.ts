import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Card extends Vue {
    @Prop({ default: false })
    public showCard!: boolean;

    @Prop({ required: true })
    public card!: Card;
}
