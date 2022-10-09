import { connection } from '../../database/knexfile.config';
import bcrypt from "bcrypt";
const saltRounds = 10;
const User = () => connection('users')

export async function findExistingUser(email:any){
    console.log(email)
    const existingUser = await User().where('email', email)
    return existingUser 
}

export async function createUser(payload:any){
   
    let user = await User().insert({email:payload.email, password:payload.password, created_at: new Date().toISOString(), updated_at: new Date().toISOString()})
    return user
}


export async function comparePass(someOtherPlaintextPassword:any,hash:any){
    return await bcrypt.compareSync(someOtherPlaintextPassword, hash);
    
};


export  async  function encryptpass(myPlaintextPassword:any){
    return await bcrypt.hash(myPlaintextPassword, saltRounds);
    
};



