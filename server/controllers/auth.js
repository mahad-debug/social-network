import User from "../models/user";
import { hashpassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password, secret}= req.body;
    //validation
    if(!name) return res.status(400).send("Name is required")
    if(!password || password.length < 6) return res.status(400)
    .send("Password is required and should be 6 six characters long") 
    //if(!secret) return res.status(400)
    //.send("answer is required");
    const exist = await User.findOne({ email });
    if(exist) return res.status(400).send("email is taken");
    //hash password
    const hashedPassword = await hashpassword(password);
    const user = new User({name, email, password: hashedPassword, secret})
    console.log(req.body)

    try {
       await user.save();
    //    console.log('Registered use =>', user)
       return res.json({
        ok: true,
       })
    } catch (err) {
        console.log('Registration failed =>', err);
        return res.status(400).send('Error. Try again.')
    }
};
export const login = async (req, res)=> {
    // console.log(req.body);
    try {
        // ye destructuring hota destructuring wo cheez hai k app object ki form ya array k ander data utha kr le kr aoo request kr k aur agr us jesa data na hoo to put krdo warna in krdo

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).send("no user found")
        //ye compare krwa raha hai password ko ,The "await" keyword is used to wait for a promise to resolve and return its value.
        const match = await comparePassword(password, user.password);
         if (!match) return res.status(400).send("Wrong password")
         //create signed token
         const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
         }); 
         //
         console.log(token) 
         user.password = undefined;
         user.secret = undefined;
        //  res.json({
        //     token,
        //     user,
        //  });
        res.status(200).json({msg:"got it"})
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error.Try again.");
    }
};

