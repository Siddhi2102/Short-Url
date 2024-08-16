const jwt = require("jsonwebtoken");
const secret="Sid123@123";

function setUser(user){

    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
        },
        secret
    );  
}

function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,secret);   //vrifying the secret kry if it the one we generated or not
    } catch(error){
        return null;
    }
    
}

module.exports={
    setUser,
    getUser,
};