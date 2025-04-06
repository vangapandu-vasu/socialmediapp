import axios from "axios";
import { useEffect,useState } from "react";
import { useLocation } from "react-router";
import "./designing/usersearch.css"


function Usersearch(){
    const location = useLocation();
    const user=location.state?.user;

    if(!user){
        alert("no user found");
    }

    const [isfollowing,setIsfollowing]=useState(false);
    const [currentuser,setCurrentuser]=useState("");
    
    
    

    useEffect(()=>{
        axios.get("http://localhost:9000/currentuser",{withCredentials:true})
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
    
    return (
        <div className="usersearch-container">
          <div className="usersearch-card">
            <h2 className="usersearch-heading">
              Name: <span className="usersearch-name">{user.Name}</span>
            </h2>
            <img
              src={`http://localhost:9000${user.profilePicture}`}
              alt="profilepic"
              className="usersearch-img"
            />
            <p className="usersearch-text"><strong>Bio:</strong> {user.bio}</p>
            <p className="usersearch-text"><strong>Quote:</strong> “{user.quote}”</p>
            <p className="usersearch-text"><strong>Following:</strong> {user.following.length}</p>
            <p className="usersearch-text"><strong>Followers:</strong> {user.followers.length}</p>
      
            <button
              onClick={isfollowing ? unfollow : follow}
              className={`usersearch-button ${isfollowing ? "unfollow" : "follow"}`}
            >
              {isfollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      );
}


export default Usersearch;