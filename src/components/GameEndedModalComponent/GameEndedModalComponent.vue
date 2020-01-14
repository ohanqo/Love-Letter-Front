<template>
    <div
        class="z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
    >
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div class="relative">
            <h2
                class="w-full my-2 text-2xl leading-tight text-center text-white"
            >
                La partie est terminée !
            </h2>
            <p
                class="w-full my-2 text-2xl leading-tight text-center text-white"
            >
                Le(s) joueur(s) gagnant :
            </p>
            <div class="flex justify-center items-center">
                <div
                    v-for="(p, index) in roundResult.winners"
                    :key="index"
                    class="max-w-sm w-full lg:max-w-full lg:flex m-2"
                >
                    <div
                        class="h-48 lg:h-auto lg:w-30 flex-none bg-cover rounded-t lg:rounded-t-none bg-white lg:rounded-l text-center overflow-hidden"
                    >
                        <CardPlayed :card="p.cardsHand[0]" />
                    </div>
                    <div
                        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
                    >
                        <div class="mb-8">
                            <p class="text-sm text-gray-600 flex items-center">
                                Joueur :
                            </p>
                            <div class="text-gray-900 font-bold text-xl mb-2">
                                {{ p.name }}
                            </div>
                            <p class="text-gray-700 text-base">
                                Score total : {{ p.points }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="block border border-white mt-5 mx-auto px-5 py-2 rounded text-white disabled:opacity-50"
            >
                Rejouer
            </button>
        </div>
    </div>
</template>

<script lang="ts" src="./GameEndedModalComponent.ts" />
<style lang="scss" src="./GameEndedModalComponent.scss" />
