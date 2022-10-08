import express  from 'express'
import {Transaction} from './transaction/transaction.controller'
import {User} from './user/user.controller'
import {AppConfig} from './config'

class App {
 private app: any;
  constructor() {
    this.app = express();
  }
  appConfig() {
    new AppConfig(this.app).loadAppLevelConfig();
  }
  errorConfig() {
    new AppConfig(this.app).loadAppLevelErrorConfig();
  }

  /* Including wallet Route  */
   includeRoutes() {
     new Transaction(this.app).transactionConfig()
     new User(this.app).userConfig()
   }

  /* Including app Routes ends */

  startTheServer():any {
     this.appConfig();
     this.includeRoutes();
     this.errorConfig()
    const port =process.env.PORT || 4000
    this.app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  }
}


export {App}
