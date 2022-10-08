import {transactionService} from './transaction.service'
import {authorized} from '../middleware/jwt_helper'
class Transaction {
  private service:any;
  private app:any;
  private auth:any;
  constructor(app:any) {
    this.service = new transactionService()
    this.app = app
    this.auth = authorized
  }

  transactionController() {
    this.app.post("/api/v1/fund-account",this.auth,this.service.fundAccountService)
    this.app.post("/api/v1/transfer",this.auth,this.service.transferService)
    this.app.post("/api/v1/withdraw",this.auth,this.service.withdrawService)
  }

  transactionConfig() {
    this.transactionController();
  }
}
export {Transaction};