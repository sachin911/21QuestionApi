import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import user from './routes/user.route'
import friend from './routes/friend.route'
import game from './routes/game.route'
import notification from './routes/notification.route'
import {connectDatabase} from './db/connect'
import { socketConnection } from './utils/socket'

const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

connectDatabase();

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));


const server = app.listen(port, () => {
    logger.info('server started - ', port);
});

socketConnection(server);

app.use('/user', user);
app.use('/friend', friend);
app.use('/game', game);
app.use('/notification', notification);

//Index route
app.get('/', (req, res) => {
  res.send({ response: "I am alive" }).status(200);
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001/");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
