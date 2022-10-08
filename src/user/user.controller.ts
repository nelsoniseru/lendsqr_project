import {userService} from '../user/user.service'
class User {
  private service:any;
  private app:any;
  constructor(app:any) {
    this.service = new userService()
    this.app = app
  }

  userController() {
    this.app.post("/api/v1/register",this.service.registerService)
    this.app.post("/api/v1/login",this.service.loginService)
  }

  userConfig() {
    this.userController();
  }
}
export {User};