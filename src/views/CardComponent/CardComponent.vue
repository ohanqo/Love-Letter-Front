<template>
	<div @click="PlayCard(card)" class="card">
		<img v-if="showCard" v-bind:src="'/assets/img/card_'+ card.value +'.png'" />
		<img v-else src="/assets/img/back_card.png" />
	</div>
</template>

<script lang="ts" src="./CardComponent.ts" />
<style lang="scss" src="./CardComponent.scss" />
