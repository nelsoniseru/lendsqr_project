import { Request, Response, NextFunction } from "express"
import jsonwebtoken from 'jsonwebtoken';
const {sign, verify } = jsonwebtoken;
import config from '../utils/default'

export async function authorized(req: Request, res: Response, next: NextFunction){
    if(!req.headers['authorization']) return res.status(401).json({"msg":"unauthorized"})
    const header = req.headers['authorization']
    const bearerToken = header.split(' ')
    const token = bearerToken[1]
   var secret = config.secret
    verify(token,secret,(err:any,payload:any)=>{

        if(err){
            const msg = err.name ==="JsonWebTokenError"? 'unauthorized':err.message
            return res.status(401).json({msg})
        }
        
        res.locals.user = payload
        next()
    })
   
}

export async function accessToken(id:any){
    var secret = config.secret
    var exp = config.exp
    const token = sign({ id },
        secret, {
        expiresIn:exp
      })
    return token
}