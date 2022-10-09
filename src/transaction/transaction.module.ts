import { connection } from '../database/knexfile.config';
const User = () => connection('users')
const Transaction = () => connection('transaction')
class Module{


async fundAccountModule(id:number,amount:any){
    const userAccount = await User().where('id', id)
    var amt = userAccount[0].wallet_balance + Number(amount)
     return await User().update({wallet_balance:amt}).where({id})  
}

async transactionModule(id:number,amount:any,status:string){
    const userAccount = await User().where('id', id)
     return await Transaction().insert({
        email:userAccount[0].email,
        status,
        amount,
        user_id:userAccount[0].id,
        created_at: new Date(Date.now()), 
        updated_at:new Date(Date.now())
        
        
    })
  

}
async transferFromUserModule(id:number,from_amt:any, amount:any){
     from_amt = from_amt - Number(amount)
    return await User().update({wallet_balance:from_amt}).where({id})  
}

async transferToUserModule(to_amt:any,email:string ,amount:any){
    to_amt = to_amt + Number(amount)
   
    return await User().update({wallet_balance:to_amt}).where({email})
} 

async emailModule(email:string){
    return await User().where('email', email)
}

async idModule(id:number){
    return await User().where('id', id)
}

async withdrawModule(id:number, amt:any){
  return  await User().update({wallet_balance:amt}).where({id})
}
}
export default Module