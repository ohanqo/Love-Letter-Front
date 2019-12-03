import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    public password = "";

    public onButtonClick() {
        if (this.password === "gucci-baron") {
            localStorage.setItem("password", this.password);
            this.$router.replace({ name: "lobby" });
        } else {
            this.password = "";
        }
    }
}
