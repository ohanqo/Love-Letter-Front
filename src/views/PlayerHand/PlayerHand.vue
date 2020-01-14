<template>
    <div class="player_hand">
        <div class="container_player" :style="{ borderColor: player.color }">
            <p v-if="currentPlayer.id === player.id">
                Vous
            </p>
            <p v-else>{{ player.name | capitalize }}</p>
        </div>
        <div class="handcards">
            <CardOfPlayer
                v-for="(card, index) in player.cardsHand"
                :key="index"
                :showCard="showCard"
                :card="card"
                :player="player"
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
