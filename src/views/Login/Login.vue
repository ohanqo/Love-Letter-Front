<template>
    <section id="login">
        <div class="vertical-center v-100vh">
            <div class="form">
                <h1>Connexion</h1>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Mot de passe"
                />
                <input @click="onButtonClick" type="submit" value="Valider" />
            </div>
        </div>
    </section>
</template>

<script lang="ts" src="./Login.ts" />
<style lang="scss" src="./Login.scss" />
