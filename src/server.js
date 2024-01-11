import express from "express";
import 'dotenv/config';
import methodOverride from 'method-override';
import cors from 'cors';

import configViewEngine from "./config/viewEngine";
import webRoutes from "./routes/web/web";
import apiRouter from './routes/api/api';
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8080;

const app = express();

var corsOptions = {
    origin: process.env.REACT_URL,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};

app.use(cors(corsOptions))

app.use(express.static('./src/public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(methodOverride('_method'));

configViewEngine(app);

webRoutes(app);
apiRouter(app);

app.listen(PORT, () => {
    console.log(`<<<< App listening port: ${PORT} >>>>`);
})

