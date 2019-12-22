import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login/Login.vue";
import Lobby from "@/views/Lobby/Lobby.vue";
import Board from "@/views/Board/Board.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/",
        name: "lobby",
        component: Lobby,
        beforeEnter: (to: any, from: any, next: any) => passwordMiddleware(next)
    },
    {
        path: "/game",
        name: "game",
        component: Board,
        beforeEnter: (to: any, from: any, next: any) => {
            passwordMiddleware(next);
            playersMiddleware(next);
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

const isLogged = (): boolean => {
    return localStorage.password === "gucci-baron";
};

const hasEnoughPlayers = (): boolean => {
    return store.state.players.length > 1;
};

const passwordMiddleware = (next: () => void) => {
    if (isLogged()) {
        next();
    } else {
        router.replace({ name: "login" });
    }
};

const playersMiddleware = (next: () => void) => {
    if (hasEnoughPlayers()) {
        next();
    } else {
        router.replace({ name: "lobby" });
    }
};

export default router;
