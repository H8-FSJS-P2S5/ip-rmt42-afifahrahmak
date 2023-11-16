const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });

    const access_token = signToken({ id: user.id });

      res.status(201).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

    static async login(req,res){
        try {
            const {email,password} = req.body

            if(!email){
                res.status(400).json({message:'Email is missing'})
                return
            }

            if(!password){
                res.status(400).json({message:'Password is missing'})
                return
            }

            const user = await User.findOne({where:{email}})
            if(!user){
                res.status(401).json({message:'Invalid email or password'})
                return
            }
           

            const isValidPassword = comparePassword(password,user.password)

            if(!isValidPassword){
                res.status(401).json({message:'Invalid email or password'})
                return
            }

            const accessToken = signToken({id:user.id})
           
            res.json({accessToken})
        } catch (error) {
           console.log(error) 
           res.status(500).json({ message: 'Internal Server Error' })
        }
    }


  static async googleLogin(req, res, next) {
    try {
      console.log(req.headers.google_token);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      let status = 200;
      if (created) {
        status = 201;
      }

      const access_token = signToken({ id: user.id });
      res.status(status).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;