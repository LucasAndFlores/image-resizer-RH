import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { getRoutes } from "./routes";

const app = express();

app.use(express.json());

app.use(getRoutes());

app.listen(5050, () => console.log(`Server is running on port: 5050`));
