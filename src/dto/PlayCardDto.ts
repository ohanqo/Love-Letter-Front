import Card from '@/models/Card';

export default interface PlayCardDto {
    cardToPlay: Card;
    playerTargetId?: String;
}