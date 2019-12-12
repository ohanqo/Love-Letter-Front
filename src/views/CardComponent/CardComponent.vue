<template>
	<div @click="playCard(card)" id="card" :class="{ selected: isSelected }">
		<img v-if="showCard" :src="'/assets/img/card_'+ card.value +'.png'" />
		<img v-else src="/assets/img/back_card.png" />
	</div>
</template>

<script lang="ts" src="./CardComponent.ts" />
<style lang="scss" src="./CardComponent.scss" />
