import express, { NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { initServices } from "./loaders/service.loader";
import { initControllers } from "./loaders/controller.loader";
import App from "./app";

import loggerMiddleware from "./middlewares/logger";
import apiErrorMiddleware from "./middlewares/apiError";
import { initRepositories } from "./loaders/repository.loader"
import { initClients } from "./loaders/client.loader";

async function run() {

  const clients = initClients();
  const repositories = await initRepositories(clients);
  const services = initServices(repositories);
  const controllers = initControllers(services);

  const app = new App({
    port: parseInt(process.env.PORT as string, 10) || 3000,
    baseApi: "/api/v1",
    controllers: [
      controllers.blockchainController,
    ],
    middleWares: [
      cors(),
      cookieParser(),
      express.json(),
      express.urlencoded({ extended: true }),
      loggerMiddleware,
      apiErrorMiddleware,
    ],
  });
  
  app.listen();
  
}

run();
