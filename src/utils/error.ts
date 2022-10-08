class Error {
    public message:any;
    public statusCode:any;
    constructor(statusCode:any,message:any) {
        this.statusCode = statusCode;
        this.message = message;
         
      } 
  
    }
  
  
  
  
  
export {Error};
  