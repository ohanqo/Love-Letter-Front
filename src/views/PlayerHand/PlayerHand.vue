<template>
    <div id="handcards">
        <div v-if="currentPlayer.id == player.id" class="card">
            <img v-bind:src="'/assets/img/card_' + card.value + '.png'" />
        </div>
		<div v-else class="card">
			<img src="/assets/img/back_card.png" />
		</div>
    </div>
</template>

<script lang="ts" src="./PlayerHand.ts" />
<style lang="scss" src="./PlayerHand.scss" />
