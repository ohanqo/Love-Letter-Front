<template>
    <section id="login">
        <div class="vertical-center v-100vh">
            <div class="form">
                <h1>Connexion</h1>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Mot de passe pute"
                />
                <input
                    @click="onButtonClick"
                    type="submit"
                    value="Valider pute"
                />
            </div>
        </div>
    </section>
</template>

<script lang="ts" src="./Login.ts" />
<style lang="scss" src="./Login.scss" />
