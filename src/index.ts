import express from "express"
// @ts-ignore
import pipelines from "./assets/pipelines.csv"

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", (req: any, res: any) => {
    console.log(pipelines)
    res.send( "Hello world! fittur tuttir asd" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );