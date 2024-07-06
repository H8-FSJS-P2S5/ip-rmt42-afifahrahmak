const {User} = require("../models")
const { signToken, verifyToken } = require("../helpers/jwt")

const authentication = async function mesinAuthentifikasi(req,res,next) {
    try {
        // console.log(!req.headers.authorization,"<<<<<<< !req.headers.authorization")
        // console.log(req.headers,"<<<<<<< req.headers")
        // console.log(req.body,"<<<<<<< req.body")
        // console.log(req.headers.authorization,"<<<<<<< req.auth")
        if(!req.headers.authorization){
            throw { name : 'Unauthenticated', message: `Unauthorized`}
        }

        const token = req.headers.authorization.split(" ")[1];
        
        let verify = verifyToken(token);
        console.log(verify, "<<<Ini hasil verify token")

        if(!verify) {
           throw { name : 'Unauthenticated', message: `Unauthorized`}
        }

        const user = await User.findByPk(verify.id)

        if(!user) {
            throw { name : 'Unauthenticated', message: `Unauthorized`}
        }

        req.userData = {
            id: user.id,
            username: user.username,
            role: user.role,
            phoneNumber: user.phoneNumber

        }
        // console.log(req.userData)
        next();

    } catch (error) {
        console.log("authentication error >>>",error)
        next(error)
    }
}

module.exports = authentication 