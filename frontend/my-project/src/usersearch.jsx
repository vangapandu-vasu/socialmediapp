import axios from "axios";
import { useEffect,useState } from "react";
import { useLocation } from "react-router";


function Usersearch(){
    const location = useLocation();
    const user=location.state?.user;

    if(!user){
        alert("no user found");
    }

    const [isfollowing,setIsfollowing]=useState(false);
    const [currentuser,setCurrentuser]=useState("");
    
    
    

    useEffect(()=>{
        axios.get("http://localhost:9000/currentuser")
        .then(Response=>{
            setCurrentuser(Response.data)
            console.log(Response.data);
            console.log(currentuser);
        })
        .catch(err=>{
            console.log("error in fetching current user id ",err);
        })
    },[]);

    useEffect(()=>{
        axios.get(`http://localhost:9000/check/${user.Name}`,{withCredentials:true})
        .then(Response=>{
            if(Response.data==="following"){
                setIsfollowing(true)
            }else{
                setIsfollowing(false)
            }
        })
    
        console.log(Response.data);
    },[user.Name])

    let follow=async()=>{
        try{
            await axios.put(`http://localhost:9000/follow/${user.Name}`,{},{withCredentials:true})
            console.log("user.name",user.Name);
            setIsfollowing(true);
        }catch(err){
            console.log("error in following",err);
            console.log("in catch",user.Name)
        }
    }


    let unfollow=async()=>{
        try{
            await axios.put(`http://localhost:9000/unfollow/${user.Name}`,{},{withCredentials:true});
            setIsfollowing(false);
        }catch(err){
            console.log("error in unfollowing",err);
        }
    }
    
    return(
        <div>
            <h2>name:{user.Name}</h2>
            <img src={`http://localhost:9000${user.profilePicture}`} alt="profilepic" height="100" width="100" ></img>
            <p>Bio:{user.bio}</p>
            <p>quote:{user.quote}</p>
            <p>following:{user.following.length}</p>
            <p>followers:{user.followers.length}</p>
            <button onClick={isfollowing?unfollow:follow} >
                <p>{isfollowing?"unfollow":"follow"}</p>
            </button>       
        </div>
    )
}


export default Usersearch;