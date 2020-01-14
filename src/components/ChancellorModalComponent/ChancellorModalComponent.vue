<template>
    <div
        class="z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
    >
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class="relative modal">
            <img
                class="border-modal"
                src="/assets/img/border-modal.png"
                alt="Table de jeu"
            />
            <div class="relative z-10 text-center">
                <div class="title-modal">Chancelier</div>
                <h2 class="text-white text-lg">
                    Séléctionnez la carte que vous souhaitez garder.
                </h2>

                <div class="flex flex-no-wrap justify-center mt-8 container">
                    <img
                        v-for="(card, index) in connectedPlayer.cardsHand"
                        :key="index"
                        :src="`/assets/img/card_${card.value}.png`"
                        :id="card.id"
                        class="size-card mx-2 is-draggable"
                    />
                </div>

                <div class="flex flex-no-wrap justify-center mt-16 container">
                    <div>
                        <div
                            data-index="0"
                            class="size-card mr-12 is-dropzone drop-card-zone guarded-card"
                        ></div>
                    </div>

                    <div class="flex">
                        <div
                            data-index="1"
                            class="size-card mr-4 is-dropzone drop-card-zone replaced-card"
                        ></div>
                        <div
                            data-index="2"
                            class="size-card is-dropzone drop-card-zone replaced-card"
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
    </div>
</template>

<script lang="ts" src="./ChancellorModalComponent.ts" />

<style lang="scss">
.is-draggable {
    touch-action: none;
    user-select: none;
}
</style>
