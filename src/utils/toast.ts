import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted);

Vue.toasted.register(
    "error",
    payload => {
        if (!payload.message) {
            return "Une erreur est survenue.";
        }

        return payload.message;
    },
    {
        theme: "bubble",
        position: "bottom-center",
        duration: 3000,
        type: "error",
        singleton: true
    }
);

Vue.toasted.register(
    "success",
    payload => {
        if (!payload.message) {
            return "Action bien effectuée.";
        }

        return payload.message;
    },
    {
        theme: "bubble",
        position: "bottom-center",
        duration: 3000,
        type: "success",
        singleton: true
    }
);
