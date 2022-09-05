import express from 'express'
import { version } from '../package.json'
import { normal } from './tools/normal'
import { pipelines } from './tools/pipelines'
import { turbines } from './tools/turbines'
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req: any, res: any) => res.send(`Public Geo JSON v${version}`))

app.get('/pipelines', (req: any, res: any) => pipelines().then((data) => res.send(data)))

app.get('/turbines', (req: any, res: any) => turbines().then((data) => res.send(data)))

app.get('/terminals', (req: any, res: any) => normal('terminals.csv').then((data) => res.send(data)))

app.get('/extract', (req: any, res: any) => normal('extract.csv').then((data) => res.send(data)))

app.listen(PORT, () => {
  console.log(`public-geosjon@${version} - listening at PORT ${PORT}`)
})
