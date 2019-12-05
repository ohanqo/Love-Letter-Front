import { Component, Vue, Prop } from "vue-property-decorator";
import Card from '@/models/Card';

@Component
export default class CardComponent extends Vue {
    @Prop({ default: false })
    public showCard!: boolean;

    @Prop({ required: true })
    public card!: Card;

    public PlayCard(card: Card){
        console.log(card.value);
    }
}
