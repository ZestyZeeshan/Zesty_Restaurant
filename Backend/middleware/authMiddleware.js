import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

const auth=  async (req, res, next)=>{
    const authHeader = req.header['authorization'];

    if(!authHeader || authHeader.startsWith('Bearer')){
        return res.status(401).json({msg: ' No token, authorisation denied'});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decode;

        next();
    }catch(e){
        console.error("Token verification error:",e.message);
        res.status(401).json({msg:'Token is not valid'});

    }
}

export {auth};