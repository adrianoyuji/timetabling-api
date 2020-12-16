import express from "express";
import routes from "./routes";
import cors from "cors";
import DBConnect from "./database";
const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

//DB CONNECT
DBConnect();

//EXPRESS USES
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => console.log("Server started on port 3333"));
