
import { Room } from "colyseus";
import { Schema, type } from "@colyseus/schema";

export class State extends Schema {
    @type("int8")
    x = Math.floor(Math.random() * 16);
}

export class ExampleRoom extends Room<State> {
    interval;
    onCreate (options) {
        this.setState(new State());

        this.interval = setInterval(()=>{
            this.state.x =  Math.floor(Math.random() * 16);
        },1000);
    }

    onDispose(){
        clearInterval(this.interval);
    }
}
