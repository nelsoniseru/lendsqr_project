import {Request, Response, NextFunction} from "express"
import { 
   SERVER_OK_HTTP_CODE,  
   SERVER_BAD_REQUEST_ERROR_HTTP_CODE,
   SERVER_ERROR_MSG 
} from "../constant"
import Module from './transaction.module'

var module = new Module()

class transactionService {
 
   async fundAccountService(req:Request, res:Response, next:NextFunction) {
      try {
         const {amount} = req.body
         var id = res.locals.user.id      
       var result =await module.fundAccountModule(id,amount)
       if (result ==1) {
         let transac = await module.transactionModule(id, amount,'Credit')
         if(transac.length > 0) return res.status(SERVER_OK_HTTP_CODE).json({message:`transaction successful`})
       }
       if (result !==1) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:`opps something went wrong`})
      } catch (error) {
       return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:`opps something went wrong`})

      }

 
    }
  
    async transferService(req:Request, res:Response, next:NextFunction) {
      try {         
         const {amount,email} = req.body
         var id = res.locals.user.id 
         const to = await module.emailModule(email)
         const from = await module.idModule(id)
       
         if(to.length == 0) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${email} account does not exist` })
         if(from[0].wallet_balance < amount) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `your balance is lower than your amount` })
       
         var from_amt = from[0].wallet_balance 
         var to_amt   =  to[0].wallet_balance
         let transfer_from = await module.transferFromUserModule(id,from_amt,amount)
         if (transfer_from==1) {
            let transfer_to = await module.transferToUserModule(to_amt,email,amount)
                 await module.transactionModule(to[0].id,amount,"Credit")
                 await module.transactionModule(from[0].id,amount,"Debit")
            if(transfer_to == 1) return res.status(SERVER_OK_HTTP_CODE).json({message:`transaction successful`})
            if(transfer_to !== 1) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:SERVER_ERROR_MSG})
         }
         if(transfer_from !== 1) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:SERVER_ERROR_MSG})
      } catch (error) {
          res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:SERVER_ERROR_MSG})

      }
 }
  


     async withdrawService(req:Request, res:Response, next:NextFunction) {
      try {
         const {amount} = req.body
         var id = res.locals.user.id 
         const user = await module.idModule(id)
         if(user[0].wallet_balance < amount) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `your balance is lower than your amount` })
         var amt = user[0].wallet_balance - Number(amount)
         var result = await module.withdrawModule(id,amt)
         if(result == 1){
            await module.transactionModule(user[0].id,amount,"Debit")
            return res.status(SERVER_OK_HTTP_CODE).json({message:`withdrawal successful`})
         }
         if(result !== 1) return res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:SERVER_ERROR_MSG})
         
      } catch (error) {
         res.status(SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({message:SERVER_ERROR_MSG})
      }
     }
  
  }
  export {transactionService};