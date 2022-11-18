import express from "express";
import { version } from "../package.json";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));

const routes = ["pipelines", "shipyards", "turbines", "terminals", "extracts"];

app.get("/", (req: any, res: any) =>
  res.send({
    message: `Public Geo JSON v${version}`,
    routes,
  })
);

app.get("/pipelines", (req: any, res: any) => {
  try {
    const data = fs.readFileSync("./assets/json/pipelines.json")
    res.send(data)
  } catch(e) {
    res.status(500)
    res.send(e)
  }
});

app.get("/shipyards", (req: any, res: any) => {
  try {
    const data = fs.readFileSync("./assets/json/shipyards.json")
    res.send(data)
  } catch(e) {
    res.status(500)
    res.send(e)
  }
});

app.get("/turbines", (req: any, res: any) => {
  try {
    const data = fs.readFileSync("./assets/json/turbines.json")
    res.send(data)
  } catch(e) {
    res.status(500)
    res.send(e)
  }
});

app.get("/terminals", (req: any, res: any) => {
  try {
    const data = fs.readFileSync("./assets/json/terminals.json")
    res.send(data)
  } catch(e) {
    res.status(500)
    res.send(e)
  }
});

app.get("/extracts", (req: any, res: any) => {
  try {
    const data = fs.readFileSync("./assets/json/extracts.json")
    res.send(data)
  } catch(e) {
    res.status(500)
    res.send(e)
  }
});

app.listen(PORT, () => {
  console.log(`public-geosjon@${version} - listening at PORT ${PORT}`);
});
