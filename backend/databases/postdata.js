const mongoose=require("mongoose");

const dataschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    postName:{
        type:String,
        default:"new post"
    },
    image:{
        type:String,
    },
    caption:{
        type:String,
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const post=mongoose.model("postdataset",dataschema);

module.exports=post;