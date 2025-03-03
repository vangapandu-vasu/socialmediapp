const mongoose=require("mongoose");

const dataschema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    visitHistory:[
        {timeestamps:
            {type:Date}
        }
    ],
},{timestamps:true});


const act=mongoose.model("socialmediapp",dataschema);




module.exports=act;