import bcrypt from "bcrypt";

const saltRounds = 10;

const encryptpass = async (myPlaintextPassword:any) => {

    return await bcrypt.hash(myPlaintextPassword, saltRounds);
    
};

export default encryptpass;