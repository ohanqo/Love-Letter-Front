<template>
    <section id="board">
        <div class="vertical-center v-100vh">
            <img
                class="bg-board"
                src="/assets/img/bg-board-2.png"
                alt="Table de jeu"
            />
            <button @click="showAllCards" class="display-none btn-easy-win">
                Easy win
            </button>
        </div>
    </section>
</template>

<script lang="ts" src="./Board.ts" />
<style lang="scss" src="./Board.scss" />
