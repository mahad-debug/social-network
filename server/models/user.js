import mongoose from "mongoose";
const {Schema} = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
         accessToken: String,
        tokens: [String],
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        accessToken: String,
        tokens: [String],
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    about : {},
    photo: String,
    following: [{ type: Schema.ObjectId, ref: "User"}],
    followers: [{ type: Schema.ObjectId, ref: "User"}],
},
//update krna aur create krna
{ timestamps: true}
);
// neechay code jo hai to users k schema m jayega






// fetch(url).then(resp=>resp.json).then(data=>console.log(data)).catch((e)=>console.log(e))

// fetch(url,(err,result)=>{
//     if(err)console.log(e)
//     console.log(result)
// })



// async function(){
//    try{
//     let data= await fetch(url)
//     let data2= await data.json()
//     console.log(data2)
//    }catch(e){
//     console.log(e)
//    }
// }
let User;

try {
  User = mongoose.model("users");
} catch (err) {
  User = mongoose.model("users", userSchema);
}


export default mongoose.model("User", userSchema);