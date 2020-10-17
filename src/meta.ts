import Colyseus = require('colyseus.js');
import {WS_HOST, HTTP_HOST} from './config';


class SammichGame implements ISystem {
    constructor(){
        const client = new Colyseus.Client(`${WS_HOST}`);
        const box = new Entity();
        const boxShape = new BoxShape();
        box.addComponent(boxShape);
        box.addComponent(new Transform({position:new Vector3(0,1,8)}));
        engine.addEntity(box);
        const position = box.getComponent(Transform).position;
        client.joinOrCreate("example").then(room => {
            room.onStateChange((state, ...args)=>{
                console.log("state change", state, args);
                position.set(state.x, position.y, position.z );
            });
        });
    }

    update(dt){

    }
}

export default SammichGame;