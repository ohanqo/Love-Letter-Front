<template>
    <section class="bg-black w-screen h-screen flex flex-wrap">
        <h1
            class="text-white text-3xl font-bold tracking-wide w-screen text-center my-6 fixed top-0"
        >Love Letter</h1>

        <div class="flex-1 justify-center items-center flex flex-col h-full p-6 pr-3">
            <input
                v-model="username"
                class="bg-white rounded text-xl p-2 w-1/2 mb-12"
                placeholder="Pseudo"
                type="text"
            />
            <button
                @click="onPlayClick"
                class="border-white border-2 py-3 hover:bg-white hover:text-black w-1/2 rounded bg-black text-white"
            >Jouer !</button>
        </div>

        <div class="flex-1 justify-center items-center flex flex-col h-full p-6 pl-3">
            <h2 class="text-white">Liste des joueurs</h2>

            <div class="flex flex-col">
                <span
                    class="text-white"
                    v-for="(player, index) in playerList"
                    :key="index"
                >{{ player.name }}</span>
            </div>

            <button
                class="border-white border-2 py-3 hover:bg-white hover:text-black w-1/2 rounded bg-black text-white"
            >Lancer la partie</button>
        </div>
    </section>
</template>

<script lang="ts" src="./Lobby.ts" />
<style lang="scss" src="./Lobby.scss" />
