import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2"

import userModel from  "../dao/models/Users.model.js";
import cartModel from "../dao/models/cart.model.js";
import { createHash, validatePassword } from "../utils.js";

const LocalStrategy =  local.Strategy;

const inicializePassport = () => {
    passport.use("register", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async (req, username, password, done) =>{
            try{
                const {name} = req.body;
                const user = await userModel.findOne({email:username});
                const cart = cartModel.create()
                if(user){
                    console.log("Usuario ya registrado");
                    return done(null, false)
                }
                let rol="user";
                if(username.endsWith("@coder.com")){
                    rol = "admin";
                }
                const newUser =  {
                    name,
                    email:username,
                    password: createHash(password),
                    rol,
                    cart:cart._id
                }
                const userCreated = await userModel.create(newUser);
                return done(null, userCreated)
            }catch (error){
                return done(error)
            }
        }
    ));

    passport.use("login", new LocalStrategy(
        {
            usernameField:"email"
        },
    async(username, password, done)=>{
        try{
            const user = await userModel.findOne({email:username})
            if(!user){
                return done(null, false);
            }
            if(!validatePassword(password, user)){
                return done(null, false);
            }
            return done(null, user);
        }catch(error){
            return done(error);
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id);
        done(null, user)
    });

    passport.use("github",new GitHubStrategy({
        clientID: "Iv1.956cc57cb6eba8df",
        clientSecret:"9c4461f2d9fb3b6adae4141400ddd23a2f653415",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accesToken, refreshToken, profile, done) =>{
        try {
            console.log(profile._json.name);
            const first_name = profile._json.name;
            let email
            if(!profile._json.email){
                email = profile._json.username
            }

            let user = await userModel.findOne({email:profile._json.email});
                if(user){
                    console.log("Usuario ya registrado");
                    return done(null, false)
                }

                const cart =  cartModel.create()

                const newUser =  {
                    first_name: profile._json.first_name,
                    last_name: profile._json.last_name,
                    email: profile._json.email,
                    age: profile._json.age,
                    password: "",
                    cart: cart._id
                }
                const result = await userModel.create(newUser);
                return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))
}

export default inicializePassport;