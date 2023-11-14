const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = class UserController {

    static async register(req, res, next){
        try {  
            const {username, email, password} = req.body
            const user = await User.create({username, email, password});

            res.status(201).json({
                "id": user.id,
            });

        } catch (error) {
            next(error);
        } 
    }

    
    static async login(req, res, next){  
        try {
            const {email, password} = req.body;

            if(!email) {
                res.status(400).json({message: "Error invalid email or password"}); 
                return; 
            }
            
            if(!password) {
                res.status(400).json({message: "Error invalid email or password"});
                return; 
            }

            const user = await User.findOne({ where: {email} }); 
            if(!user){
                next({name: 'Unauthenticated', message: "User not found or Password not matched"});
                return;
            }

            const isValidPassword = comparePassword(password, user.password);
            if(!isValidPassword){
                next({name: 'Unauthenticated', message: "User not found or Password not matched"});
                return;
            }

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token }); 
            
        } catch (error) {
            next(error);
        }
    }

}