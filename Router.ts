import { Express, Request, Response } from "express";
import path from "path";
const rootDir = path.resolve("./");
import { OSRouter } from "./routes/OSRouter";

export class Router{
    app: Express;

    constructor(app: Express){
        this.app = app;
        this.app.listen(process.env.PORT, () => console.log(`Api listening on port: ${process.env.PORT}`));
        this.app.get("/", (req: Request, res: Response) => res.send(`Hello World! ${rootDir}`));
        OSRouter.Route(this.app);
    }
}