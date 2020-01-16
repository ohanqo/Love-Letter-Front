<template>
    <section id="board">
        <div class="vertical-center v-100vh">
            <img
                class="bg-board"
                src="/assets/img/border-love-letter.png"
                alt="Table de jeu"
            />
            <button class="deck" @click="pickCard">{{ NumberOfCard }}</button>
            <div class="positionHands">
                <Hand v-for="(p, index) in players" :key="index" :player="p" />
            </div>
            <div class="container-status-game">
                <div class="score">{{ currentPlayer.points }}</div>
            </div>
        </div>

        <ChancellorModalComponent
            v-if="showChancellorModal"
            v-on:send-chancellor-placed-cards="sendChancellorPlacedCards"
            v-on:close-modal="closeModal"
        />

        <CommonModalComponent
            v-if="showCommonModal"
            :cardPlayed="cardPlayed"
            v-on:send-card-played="sendCardPlayed"
            v-on:close-modal="closeModal"
        />

        <GuardModalComponent
            v-if="showGuardModal"
            v-on:send-card-played-guard="sendCardPlayedGuard"
            v-on:close-modal="closeModal"
        />

        <PriestModalComponent
            v-if="showPriestModal"
            v-on:send-card-played-priest="sendCardPlayedPriest"
            v-on:close-priest-modal="closePriestModal"
            :targetCard="targetCard"
            v-on:close-modal="closeModal"
        />

        <RoundEndedModalComponent
            v-if="showRoundEndedModal"
            :roundResult="roundResult"
        />

        <GameEndedModalComponent
            v-if="showGameEndedModal"
            :roundResult="roundResult"
            v-on:replay="replay"
        />
    </section>
</template>

<script lang="ts" src="./Board.ts" />
<style lang="scss" src="./Board.scss" />
