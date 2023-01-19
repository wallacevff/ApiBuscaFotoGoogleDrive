import bodyParser, { urlencoded } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import moment from "moment-timezone";
import path from "path";
const rfs = require('rotating-file-stream');
import cors from 'cors';

morgan.token('date', (req: Request, res: Response) => {
    return moment().tz('America/Fortaleza').format("DD/mm/yyyy HH:MM:ss");
});
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname + "/", 'Logs')
});

const app: Express = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));

export { app };