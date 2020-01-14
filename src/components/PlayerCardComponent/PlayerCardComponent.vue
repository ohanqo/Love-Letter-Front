<template>
    <div class="card-to-show-player">
        <CardPlayed v-if="player.cardsHand[0]" :card="player.cardsHand[0]" />
        <div class="vertical-center">
            <div class="info">
                <p v-if="player.id === currentPlayer.id">
                    Vous
                </p>
                <p v-else>
                    {{ player.name }}
                </p>
                <div class="show-score">{{ player.points }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./PlayerCardComponent.ts" />
<style lang="scss" src="./PlayerCardComponent.scss" />
