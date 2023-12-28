import express from "express";
import 'dotenv/config'

import configViewEngine from "./config/viewEngine";
import webRoutes from "./routes/web/web";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('./src/public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

configViewEngine(app);

webRoutes(app);

app.listen(PORT, () => {
    console.log(`<<<< App listening port: ${PORT} >>>>`);
})

