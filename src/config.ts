import {Error} from "./error"
import cors  from 'cors';
import {Request, Response, NextFunction} from "express"
import express from "express"
import { SERVER_OK_HTTP_CODE,  NOT_FOUND_MESSAGE,SERVER_INTERNAL_ERROR_HTTP_CODE } from "./constant"


class AppConfig {
  private app:any;
  constructor(app:any) {
    this.app = app;
  }



  loadAppLevelErrorConfig() {
    this.app.use((req:Request, res:Response, next:NextFunction) => {
      const error = new Error( SERVER_OK_HTTP_CODE, req.path + " " +  NOT_FOUND_MESSAGE)
      res.status(error.statusCode || SERVER_INTERNAL_ERROR_HTTP_CODE)
      res.json({ status: error.statusCode || SERVER_INTERNAL_ERROR_HTTP_CODE, message: error.message })
    })

  }


  loadAppLevelConfig() {

    this.app.use(
      express.json(),
    );
    this.app.use(
      cors(),
    );
  }


}
export {AppConfig};
