const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
require("dotenv").config();
const port=9000;
const act=require("./databases/database");
const pp=require("./databases/profiledatabases");
const post=require("./databases/postdata"); 
const cookieParser=require("cookie-parser");
const {setuser,getuser}=require("./auth");
const { verify } = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const {Server}=require("socket.io");
const http=require("http");
const server=http.createServer(app);
const io=new Server(server,{
    origin:"http://localhost:9000",
    methods: ["GET","POST"]
});
const ch=require("./databases/chatdatabase");


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static("uploads"));







mongoose.connect(dotenv.process.url)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  


app.post("/signup",async(req,res)=>{
    const body=req.body;
    const {email,password}=req.body;
    const check=await act.findOne({email});
    if(!check){
        const user=await act.create({
            fname:body.fname,
            email:body.email,
            password:body.password,
        });
        const userp=await pp.create({
            Name:body.fname,
            email:body.email,
            password:body.password,
        });
        console.log("data uploaded");
        console.log(user);
        console.log(userp);
        return res.send("success");
    }
    else{
        return res.send("already exists");
    }

})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await act.findOne({email,password})
    if(!user){
        console.log("invalid credentials");
        return res.send("wrong details");
    }
    else{
        const token=setuser(user);
        res.cookie("uid",token,
            {
                httpOnly: true, // Prevents JavaScript from accessing it
                secure: true, // Set true in production (HTTPS required)
                sameSite: "lax", // Allows sending cookies on same-site requests
            }
        );
        return res.send("access granted");
        return res.status(200).json({ message: "access granted", token });
    }
});

app.get("/profile",async(req,res)=>{
    const token=req.cookies.uid;
    if(!token){
        return res.json({username:"no token"});
    }
    const verify=getuser(token);
    const user=await act.findOne({email:verify.email});
    return res.json({username:user.fname});

});

app.get("/profileset",async(req,res)=>{
    const token=req.cookies.uid;
    if(!token){
        return res.json("not logged in");
    }
    const userdetails=getuser(token);
    const result=await pp.findOne({email:userdetails.email});
    if(!result){
        return res.status(404).json("cannot find the user");
    }
    else{
        return res.json(result);
    }
});

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}--profilepic${path.extname(file.originalname)}`)
    }
});

const upload=multer({storage:storage});

app.put("/update-profile",upload.single("profilepicture"),async(req,res)=>{
    try{
        const {email,Name,bio,quote}=req.body;
        const user=await pp.findOne({email:email});

        user.Name=Name || user.Name;
        user.bio=bio || user.bio;
        user.quote=quote || user.quote;

        if(req.file){
            user.profilePicture=`/uploads/${req.file.filename}`
        }
        // user.profilepicture=profilepicture || user.profilepicture;
        
        await user.save();
        res.json("profile updated");
    }
    catch(err){
        console.log("error in updating profile",err);
    }

});

app.get("/search",async(req,res)=>{
    const {userdetails}=req.query;
    const searchuser= await pp.findOne({Name:userdetails});
    if(!searchuser){
        return res.json("there exists no user");
    }
    else{
        return res.json(searchuser);
    }
});

app.get("/currentuser",async(req,res)=>{
    const token=req.cookies.uid;
    const verify=getuser(token)
    const user=await pp.findOne({email:verify.email});
    if(!user){
        return res.json("no user found")
    }
    else{
        return res.json(user);
    }
});

app.get("/check/:user",async(req,res)=>{
    const searcheduserName=req.params.user;
    const token=req.cookies.uid;
    const verify=getuser(token)
    const loggeduser=await pp.findOne({email:verify.email});
    const searcheduser=await pp.findOne({Name:searcheduserName})
    const searcheduserid=searcheduser._id;
    const loggeruserid=loggeduser._id;
    if(searcheduser.followers.includes(loggeruserid)){
        return res.status(200).json("following");
    }
})

app.put("/follow/:user",async(req,res)=>{
    console.log("in server follow")
    const searcheduserName=req.params.user;
    console.log("searcgeduserName",searcheduserName);
    const token=req.cookies.uid;
    const verify=getuser(token)
    const loggeduser=await pp.findOne({email:verify.email});
    const searcheduser=await pp.findOne({Name:searcheduserName})
    console.log("searcheduser",searcheduser);
    const searcheduserid=searcheduser._id;

    const loggeruserid=loggeduser._id;
    if(!loggeduser || !searcheduser){
        return res.json("user not found");
    }

    if(!loggeduser.following.includes(searcheduserid)){
        loggeduser.following.push(searcheduserid);
        searcheduser.followers.push(loggeruserid);
        await loggeduser.save();
        await searcheduser.save();
        return res.json("follwed");
    }
});

app.put("/unfollow/:user",async(req,res)=>{
    const searcheduserName=req.params.user;
    const token=req.cookies.uid;
    const verify=getuser(token)
    const loggeduser=await pp.findOne({email:verify.email});
    const searcheduser=await pp.findOne({Name:searcheduserName})
    const searcheduserid=searcheduser._id.toString();
    const loggeruserid=loggeduser._id.toString();
    if(!loggeruserid || !searcheduserid){
        return res.status(404).json("user not found");
    }



    if(!loggeduser.following.includes(searcheduserid)){
       return res.status(400).json({message:"you are not following this user"})
    }

    loggeduser.following=loggeduser.following.filter(id=>id.toString() !== searcheduserid);
    searcheduser.followers=searcheduser.followers.filter(id=>id.toString() !== loggeruserid);
    await loggeduser.save();
    await searcheduser.save();
    return res.status(200).json("unfollowed");
});

const poststore=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,"postfile");
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}--postpic${path.extname(file.originalname)}`)
    }
});

const postt=multer({poststore:poststore});

app.post("/post",postt.single("image"),async(req,res)=>{
    const {postname,caption}=req.body;
    const token=req.cookies.uid;
    const verify=getuser(token);
    
    if(!verify){
        return res.status(401).json("unauthorized please login again")
    }
    
    const postimp={
        user:verify._id,
        postname:postname,
        caption:caption,
        image:req.file?`/postfile${req.file.filename}`:null,
    }
    
    await postimp.save()
});

app.get("/usernamef",async(req,res)=>{
    const token = req.cookies.uid;
    const verify = getuser(token);
    const user = await pp.findOne({email:verify.email});
    console.log("user details in usernamef", user);
    return res.status(200).json(user);
});

    app.post("/followingusers",async(req,res)=>{
        const {ids}=req.body
        console.log(ids);
        console.log("till here its ids");
        if(!ids){
            return res.status(404).json("couldn't find the ids")
        }
        const users= await pp.find({_id:{$in:ids}})
        console.log(users);
        console.log("tille here its users")
        if(!users||users.length===''){
            return res.status(404).json("couldn't find the users or 0");
        }
        const usermap=users.map(user=>({id:user.id,name:user.Name}));
        console.log(usermap)
        console.log("tille here usermap");

        return res.status(200).json(usermap);
    });

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    
    socket.on("message",async (data)=>{
        console.log("some user sended a text:",data.content);

        const chats = new ch({sender:data.sender,
            receiver: data.receiver, 
            content: data.content});
 
        chats.save();

        io.emit("message",{sender:data.sender,
            receiver: data.receiver, 
            content: data.content});
        
    });
    

    socket.on("disconnect",()=>{
        console.log("that user disconnected")
    });


});


app.post("/fetchchat",async(req,res)=>{
    //query for chat retriving
    const {user1, user2} = req.body;
    const main = await ch.find(
        {
            $or:[
                {sender:user1, receiver:user2},
                {sender:user2, receiver:user1}
            ]

    }).sort({timestamps : 1});

    return res.status(200).json(main);
});



server.listen(port,(req,res)=>{
    console.log("server working perfectly fine");
});