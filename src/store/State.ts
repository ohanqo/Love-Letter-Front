import io from "socket.io-client";

export default class State {
    public mainSocket = io.connect(process.env.VUE_APP_SERVER_URL!);
}
