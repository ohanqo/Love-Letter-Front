<template>
    <div id="handcards">
        <div class="card">
            {{ currentPlayer.id }}
            <img v-bind:src="'/assets/img/card_' + card.value + '.png'" />
        </div>
    </div>
</template>

<script lang="ts" src="./PlayerHand.ts" />
<style lang="scss" src="./PlayerHand.scss" />
