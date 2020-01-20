<template>
    <div class="flex">
        <section id="board">
            <img
                class="bg-board"
                src="/assets/img/border-love-letter.png"
                alt="Table de jeu"
            />
            <button class="deck" @click="pickCard">
                {{ NumberOfCard }}
            </button>
            <div class="positionHands">
                <Hand v-for="(p, index) in players" :key="index" :player="p" />
            </div>
            <div class="container-status-game">
                <div class="score">{{ currentPlayer.points }}</div>
            </div>

            <ChancellorModalComponent
                v-if="showChancellorModal"
                v-on:send-chancellor-placed-cards="sendChancellorPlacedCards"
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
        <section id="chat">
            <div class="container-chat">
                <MessageComponent
                    v-for="(message, index) in chatMessageGrouped"
                    :key="index"
                    :chat="message"
                />
            </div>
            <div class="flex input">
                <input
                    type="text"
                    v-model="userMessage"
                    class="w-full"
                    v-on:keyup="valideInputName"
                />
                <button
                    @click="sendMessageInChat"
                    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
                >
                    Envoyer
                </button>
            </div>
        </section>
    </div>
</template>

<script lang="ts" src="./Board.ts" />
<style lang="scss" src="./Board.scss" />
