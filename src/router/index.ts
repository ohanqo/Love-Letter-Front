import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";

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
        component: Home,
        beforeEnter: (to: any, from: any, next: any) => {
            if (isLogged()) {
                next();
            } else {
                router.replace({ name: "login" });
            }
        }
    }
    // {
    //     path: "/game",
    //     name: "game",
    //     component: Game,
    //     beforeEnter: (to: any, from: any, next: any) => {
    //         if (isLogged()) {
    //             next();
    //         } else {
    //             router.replace({ name: "login" });
    //         }
    //     }
    // }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

const isLogged = (): boolean => {
    return localStorage.password === "gucci-baron";
};

export default router;
