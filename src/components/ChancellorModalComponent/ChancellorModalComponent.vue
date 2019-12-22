<template>
    <div
        class="z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
    >
        <div class="absolute w-full h-full bg-gray-800 opacity-50"></div>

        <div class="relative">
            <h2 class="text-white text-3xl">
                Séléctionnez la carte que vous souhaitez garder.
            </h2>

            <div class="flex flex-no-wrap mt-8 container">
                <img
                    v-for="(card, index) in connectedPlayer.cardsHand"
                    :key="index"
                    :src="`/assets/img/card_${card.value}.png`"
                    :id="card.id"
                    class="w-40 mr-4 is-draggable"
                />
            </div>

            <div class="flex flex-no-wrap justify-between mt-16 container">
                <div>
                    <div
                        data-index="0"
                        class="bg-black w-40 h-64 is-dropzone"
                    ></div>
                </div>

                <div class="flex">
                    <div
                        data-index="1"
                        class="bg-black w-40 h-64 mr-8 is-dropzone"
                    ></div>
                    <div
                        data-index="2"
                        class="bg-black w-40 h-64 is-dropzone"
                    ></div>
                </div>
            </div>

            <button
                :disabled="!hasPlacedAllCards"
                @click="emitPlacedCards"
                class="block border border-white mt-5 mx-auto px-5 py-2 rounded text-white disabled:opacity-50"
            >
                Confirmer
            </button>
        </div>
    </div>
</template>

<script lang="ts" src="./ChancellorModalComponent.ts" />

<style lang="scss">
.is-draggable {
    touch-action: none;
    user-select: none;
}
</style>
