import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
import passport  from "passport";
// import bcrypt from "bcrypt";
import cookieSession from "cookie-session";
// import passportSetup from ("./passport");
// import './passport';



const morgan = require("morgan");
require("dotenv").config();

// const initializePassport = require('./passport-config');
//  initializePassport(passport);

 ///initializePassport();


const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
.then(() => console.log("Db connected"))
.catch((err)=> console.log("database connection is error => ", err));

//middleware    
app.use(express.json({ limit: "5mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
})
);

//autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
//ye jo neechay cheezain wo utha kr le gaye routes per 
// app.post('/api/register', (req, res) => {
//   console.log("Register Endpoint =>", req.body);  
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}` ));
//TypeORM is an Object-Relational Mapping (ORM) tool for TypeScript and JavaScript. 
// It allows developers to work with databases using an object-oriented approach, rather than writing raw SQL queries.

const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'heybrosup',
    database: 'project'
});
client.connect()
.then(()=> {
    console.log("successfully connected to database postgres");
})
.catch(err => {
    console.error("Error connecting to database: ", err)
});

// app.use(
//     cookieSession({
//         name:"session",
//         keys:["cyberwolve"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());


  
//   app.use("/auth", authRoute);

// router.post("/api/auth/signup", auth,
// catchErrors(auth.signup)
// );
// router.post("/api/auth/signin", auth.signin);




app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))


app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req, res)=> {
    res.render("pages/index")
})

app.get('/success', (req, res) => {
    res.render("pages/profile")
})

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
    res.redirect('/success');
});

app.get('/google', passport.authenticate('google',{scope:['profile', 'email']}))

