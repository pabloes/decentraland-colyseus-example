import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from "fs";
import { createServer } from 'http';
import { Server, RelayRoom } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { ExampleRoom} from './rooms/ExampleRoom';

import basicAuth = require("express-basic-auth");

const port = Number(process.env.PORT || 2567) + Number(process.env.NODE_APP_INSTANCE || 0);
const app = express();
const isProd = !!process.env.PROD;
app.use(cors({
  origin: process.env.PROD ? 'https://play.decentraland.org':"*"
})); 
app.use(express.json());

const gameServer = new Server({
    server: createServer(app),
    express: app,
    pingInterval: process.env.PROD ? 1500 : 0,
});

const basicAuthMiddleware = basicAuth({
  // list of users and passwords
  users: {
      "manafever": "sammich",
  },
  
  // sends WWW-Authenticate header, which will prompt the user to fill
  // credentials in
  challenge: true
});

app.use('/monitor', basicAuthMiddleware, monitor());

gameServer.define(`example`, ExampleRoom)
.enableRealtimeListing();

gameServer.onShutdown(function(){
    console.log(`game server is going down.`);
});
  
gameServer.listen(port);