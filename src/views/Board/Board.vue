<template>
    <section id="board">
        <div class="vertical-center v-100vh">
            <img
                class="bg-board"
                src="/assets/img/border-love-letter.png"
                alt="Table de jeu"
            />
            <button class="deck" @click="pickCard"></button>
            <div class="positionHands">
                <Hand v-for="(p, index) in players" :key="index" :player="p" />
            </div>
            <div class="container-status-game">
                <div class="score">{{ currentPlayer.points }}</div>
            </div>
            <div class="status_game">{{ status }}</div>
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
            :cardPlayed="cardPlayed"
            v-on:send-card-played="sendCardPlayed"
        />

        <GuardModalComponent
            v-if="showGuardModal"
            v-on:send-card-played-guard="sendCardPlayedGuard"
        />

        <PriestModalComponent
            v-if="showPriestModal"
            v-on:send-card-played-priest="sendCardPlayedPriest"
            v-on:close-priest-modal="closePriestModal"
            :targetCard="targetCard"
        />

        <RoundEndedModalComponent
            v-if="showRoundEndedModal"
            :roundResult="roundResult"
        />

        <GameEndedModalComponent
            v-if="showGameEndedModal"
            :roundResult="roundResult"
        />
    </section>
</template>

<script lang="ts" src="./Board.ts" />
<style lang="scss" src="./Board.scss" />
