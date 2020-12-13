import express from "express";
import routes from "./routes";
import DBConnect from "./database";
const app = express();

//DB CONNECT
DBConnect();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server started on port 3333"));
