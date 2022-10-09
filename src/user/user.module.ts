import { connection } from '../database/knexfile.config';
const User = () => connection('users')
class Module{
async emailModule(email:string){
    return await User().where('email', email)
}

async idModule(id:number){
    return await User().where('id', id)
}
async createUser(body:any,hashpass:string){
    const {email} = body
    return  await User().insert({ email, password: hashpass, created_at: new Date(Date.now()), updated_at: new Date(Date.now()) });
  
}


}
export default Module