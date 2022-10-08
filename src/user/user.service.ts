import { Request, Response, NextFunction } from "express"
import {
  SERVER_OK_HTTP_CODE,
  SERVER_BAD_REQUEST_ERROR_HTTP_CODE,
  EMAIL_EXIST,
  INVALID_LOGIN_MSG,
  CREATE_ACCT_MSG,
  FIELD_ERROR_MSG,
  SERVER_ERROR_MSG
} from "../utils/constant"
import {accessToken} from '../middleware/jwt_helper'
import encryptpass from '../middleware/encryptpassword'
import comparePass from '../middleware/passwordCompare'
import Module from "./user.module";
var module = new Module()
class userService {

  async registerService(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { email, password } = req.body

      if (!email && password) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${FIELD_ERROR_MSG}` });

      const existingEmail = await module.emailModule(email)

      if (existingEmail.length > 0) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${email} ${EMAIL_EXIST}` })

      const hashpass = await encryptpass(password);

      const insertedRows = await module.createUser(req.body,hashpass)

      if (insertedRows) return res.status(SERVER_OK_HTTP_CODE).json({ message: `${email} ${CREATE_ACCT_MSG}` });

    } catch (error) {

      res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ statuscode: SERVER_BAD_REQUEST_ERROR_HTTP_CODE, message:SERVER_ERROR_MSG});

    }

  }

  async loginService(req: Request, res: Response, next: NextFunction) {

    try {
      const { email, password } = req.body
  
      const existingEmail = await module.emailModule(email)
      var hash = existingEmail[0].password
      var comparePassword = await comparePass(password, hash)
      if (existingEmail.length == 0 || comparePassword == false) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: INVALID_LOGIN_MSG })


      if (comparePassword == true) {
        var id = existingEmail[0].id
        var token =  await accessToken(id)
       
        return res.status(SERVER_OK_HTTP_CODE).json({ token })
      }
    } catch (error) {
      return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message:INVALID_LOGIN_MSG})

    }
  }


}
export { userService };