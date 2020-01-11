<template>
    <div class="player_hand">
        <div class="handcards">
            <CardOfPlayer
                v-for="(card, index) in player.cardsHand"
                :key="index"
                :showCard="showCard"
                :card="card"
                :player="player"
                :isSelected="index === cardSelectedIndex ? true : false"
                v-on:update-selected-card="updateSelectedCard(index)"
            />
        </div>
        <div class="cards_played">
            <CardPlayed
            v-for="(cardPlayed, index) in player.consumedCards"
            :key="index"
            :card="cardPlayed"
            />
        </div>
    </div>
</template>

<script lang="ts" src="./PlayerHand.ts" />
<style lang="scss" src="./PlayerHand.scss" />
