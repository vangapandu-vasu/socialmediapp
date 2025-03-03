const mongoose=require("mongoose");

const dataschema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        default:"user",
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture: { 
        type: String, 
        default: "" 
    },  
    bio: { 
        type: String,
        default: "Hey there! I'm using this app." 
    },
    quote: {
        type:String,
    },
    followers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],
    following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
     }],
    visitHistory:[
        {timeestamps:
            {type:Date}
        }
    ],
},{timestamps:true},
);

const pp=mongoose.model("profile",dataschema);

module.exports=pp;