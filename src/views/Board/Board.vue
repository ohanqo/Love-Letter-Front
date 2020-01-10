<template>
    <section id="board">
        <div class="vertical-center v-100vh">
            <img
                class="bg-board"
                src="/assets/img/bg-board-2.png"
                alt="Table de jeu"
            />
            <button class="deck" @click="pickCard"></button>
            <div class="positionHands">
                <Hand v-for="(p, index) in players" :key="index" :player="p" />
            </div>
            <div class="status_game">
                {{ status }}
            </div>
            <button @click="showAllCards" class="display-none btn-easy-win">
                Easy win
            </button>
        </div>

        <ChancellorModalComponent
            v-if="showChancellorModal"
            v-on:send-chancellor-placed-cards="sendChancellorPlacedCards"
        />

        <CommonModalComponent
            v-if="showCommonModal"
            v-on:send-card-played="sendCardPlayed"
         />
    </section>
</template>

<script lang="ts" src="./Board.ts" />
<style lang="scss" src="./Board.scss" />
