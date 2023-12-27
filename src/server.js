import express from "express";
import configViewEngine from "./config/viewEngine";
import webRoutes from "./routes/web/web";
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('./src/public'));

configViewEngine(app);

webRoutes(app);

app.listen(PORT, () => {
    console.log(`<<<< App listening port: ${PORT} >>>>`);
})

