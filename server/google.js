import passport from "passport";
import connect from "./server";
import "./passport";
export default async function(req, res, next){
    await connect();
    passport.authenticate('google',{
        scope: ['profile', 'email'],
        session: false
    }) (req, res, next);
}