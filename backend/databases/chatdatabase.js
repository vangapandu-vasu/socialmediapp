const mongoose=require("mongoose");

const dataschema = new mongoose.Schema({
    sender:{
        type:String,
    },
    receiver:{
        type:String
    },
    content:{
        type:String
    },
    timestamps:{
        type:Date,
        default:Date.now
    },
},
{timestamps:true}
);

const ch=mongoose.model("chatsdata",dataschema);


module.exports=ch;