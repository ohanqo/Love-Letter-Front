<template>
    <div id="handcards">
        <CardOfPlayer
            v-for="(card, index) in player.cardsHand"
            :key="index"
            :showCard="showCard"
            :card="card"
        />
    </div>
</template>

<script lang="ts" src="./PlayerHand.ts" />
<style lang="scss" src="./PlayerHand.scss" />
