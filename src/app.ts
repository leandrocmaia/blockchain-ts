import express, { Application, NextFunction } from "express";
import asyncHandler from "./controllers/utils";
import apiError from "./middlewares/apiError";
import logger from "./types/logger";

class App {
  public app: Application;

  public port: number;

  public baseApi: string;

  constructor(appInit: {
    port: number;
    baseApi: string;
    middleWares: any[];
    controllers: any[];
  }) {
    this.app = express();
    this.port = appInit.port;
    this.baseApi = appInit.baseApi || "/";

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.initializeErrorMiddleware();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (c: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use(this.baseApi, asyncHandler(controller.router));
    });
  }

  private assets() {
    this.app.use(express.static("public"));
  }

  private initializeErrorMiddleware() {
    this.app.use(
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        next();
      })
    );
    this.app.use(apiError);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
