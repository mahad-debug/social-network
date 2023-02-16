import passport from "passport";
import connect from "./server";
import  "./passport";
import { setCookies} from "cookie-session";
export default async function(req, res, next){
    await connect();
    passport.authenticate('google', (req, res, info) => {
        if(err || !user) res.redirect('http://localhost:3000/?a=auth_fail');

        setCookies('token', info.token, {req, res });
        res.redirect('http://localhost:3000/home');
    })(req, res , next);
}
