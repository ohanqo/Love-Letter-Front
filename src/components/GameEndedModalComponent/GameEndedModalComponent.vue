<template>
    <div
        class="z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
    >
        <div class="absolute w-full h-full bg-gray-900 opacity-75"></div>
        <div class="relative">
            <img src="/assets/img/game_ended.png" class="mb-10 mx-auto" />
            <p
                class="w-full my-2 text-lg leading-tight text-center text-white m--20"
            >
                Gagnant :
            </p>
            <div class="flex justify-center items-center flex-wrap">
                <PlayerCardComponent
                    v-for="(p, index) in roundResult.winners"
                    :key="index"
                    :player="p"
                />
            </div>
            <p
                class="w-full my-2 text-lg leading-tight text-center text-white mt-10"
            >
                Looser :
            </p>
            <div class="flex justify-center items-center flex-wrap">
                <PlayerCardComponent
                    v-for="(p, index) in roundResult.others"
                    :key="index"
                    :player="p"
                />
            </div>
            <button
                @click="onLaunchButtonClick"
                class="block border border-white mt-5 mx-auto px-5 py-2 rounded text-white disabled:opacity-50"
            >
                Rejouer
            </button>
        </div>
    </div>
</template>

<script lang="ts" src="./GameEndedModalComponent.ts" />
<style lang="scss" src="./GameEndedModalComponent.scss" />
