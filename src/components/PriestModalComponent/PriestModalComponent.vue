<template>
	<div class="z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
		<div class="absolute w-full h-full bg-gray-800 opacity-50"></div>
		<div v-if="targetCard === null" class="relative">
			<h2 class="w-full my-2 text-2xl leading-tight text-center text-white">La carte de quel joueurs souhaitez-vous voir ?</h2>
			<div class="flex items-center justify-center">
				<div class="inline-block relative w-64 m-2">
					<select v-model="selectedTargetId" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
						<option v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name}}</option>
					</select>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
						<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
					</div>
				</div>	
			</div>	
			<div class="flex items-center justify-center">
				<button @click="sendCardPlayedEvent" class="mx-auto block lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">Confirmer</button>
			</div>
		</div>
		
		<div v-else class="relative">
			<CardPlayed
				:card="targetCard"
			/>
			<div class="flex items-center justify-center">
				<button @click="closePriestModal" class="mx-auto block lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">Fermer</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./PriestModalComponent.ts" />
<style lang="scss" src="./PriestModalComponent.scss" />
