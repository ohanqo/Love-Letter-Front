import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Card extends Vue {
    @Prop({ required: true })
    public showCard: boolean = false;
    
    @Prop({ required: true })
    public card!: Card;
}
