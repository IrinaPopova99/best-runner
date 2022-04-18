import * as bodyParser from "body-parser";
import express, { Router } from "express";
import * as path from "path";
import cors from "cors";
import workoutsRouters from './routes/workout';
import userRouters from './routes/user';

class Express {
  public app: express.Application;
  public router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.initPreRoutesMiddlewares();
    this.initRoutes();
    this.getRouter();
  }

  private initPreRoutesMiddlewares(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(bodyParser.json());
    this.app.get('/', (req, res) => res.send('hello homepage'));
  }

  private initRoutes(): void {
    this.app.use("/workout", workoutsRouters);
    this.app.use("/user", userRouters);
  }

  private getRouter(): Router {
    return this.router;
  }
}

export default Express;
