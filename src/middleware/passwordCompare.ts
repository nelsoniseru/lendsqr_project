 // false
import bcrypt from "bcrypt";



const comparePass = async (someOtherPlaintextPassword:any,hash:any) => {

    return await bcrypt.compareSync(someOtherPlaintextPassword, hash);
    
};

export default comparePass;