import express from 'express'

// for new router to handle the request of new object
var router = express.Router();

//controllers
import { login, register } from "../controllers/auth";
//callback function neechay wala
router.post("/register", register);
router.post("/login", login);




module.exports = router;