<template>
    <div class="message">
        <div
            v-if="currentPlayer.id === chat.player.id"
            class="personal_message"
        >
            <div
                class="content"
                :style="{
                    borderColor: chat.player.color,
                    color: chat.player.color
                }"
            >
                {{ chat.message }}
            </div>
        </div>
        <div v-else class="message_of_other">
            <span v-if="chat.player.name !== ''">{{ chat.player.name }}</span>
            <div
                class="content"
                :style="{
                    borderColor: chat.player.color,
                    color: chat.player.color
                }"
            >
                {{ chat.message }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./MessageComponent.ts" />
<style lang="scss" src="./MessageComponent.scss" />
