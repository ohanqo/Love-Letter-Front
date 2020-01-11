import { Component, Vue, Prop } from "vue-property-decorator";
import Card from '@/models/Card';

@Component
export default class CardPlayed extends Vue {
    @Prop({required: true})
    public card!: Card;
}
