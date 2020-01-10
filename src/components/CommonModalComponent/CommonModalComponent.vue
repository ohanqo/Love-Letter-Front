<template>
	<div class="fixed top-0 right-0 bottom-0 left-0 z-10">
		<h2>Sur quel joueur souhaitez-vous utiliser cette carte ?</h2>
		<select v-model="selectedTargetId">
			<option v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name}}</option>
		</select>
		<button @click="sendCardPlayedEvent">Confirmer</button>
	</div>
</template>

<script lang="ts" src="./CommonModalComponent.ts" />
<style lang="scss" src="./CommonModalComponent.scss" />
