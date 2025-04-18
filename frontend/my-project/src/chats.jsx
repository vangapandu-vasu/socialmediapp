import axios from "axios";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
import "./designing/chats.css"

const socket=io("http://localhost:9000",{
    transports:["websocket","polling"]
});

function Chats(){

    const [user, setUser] = useState("");
    const [text,setText] = useState("");
    const [messages,setMessages] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followingusers, setFollowingusers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9000/usernamef",{withCredentials:true})
        .then(Response=>{
            setUser(Response.data.Name);
            setFollowing(Response.data.following);
            console.log(following);
        })
        .catch(err=>{
            console.log("error in fetching current user id ",err);
        });
    },[]);
    useEffect(()=>{
        if(following.length>0){
            axios.post("http://localhost:9000/followingusers",{ids:following})
            .then(Response=>{
                setFollowingusers(Response.data);
                console.log(Response.data);
                console.log("in frontend part from backend");
            })
            .catch(err=>{
                console.log("error while fetching followingusers", err)
            })
        }
        
    },[following])


    let handletext=(e)=>{
        e.preventDefault();
        if(text.trim()){
            socket.emit("message",text);
            setText("");
        }
    }

    let handlename=(e)=>{
      e.preventDefault();
      //here implement the code for retrving the data from database
    }
    
    useEffect(() => {
        socket.on("message",(msg)=>{
            setMessages((prevmsgs)=>[...prevmsgs,msg])
        });

        return () => socket.off("message");
    },[])
    


    return (
        <>
          <h1 style={{ color: "white", textAlign: "center", padding: "1rem", backgroundColor: "#121212" }}>
            On Chats
          </h1>
      
          <div className="chat-container">
            {/* User List */}
            <div className="userpart">
              {followingusers.map(({ id, name }) => (
                <p key={id}>
                  <button onClick={(e)=>handlename(e)}>{name}</button>
                  </p>
              ))}
            </div>
      
            {/* Chat Window */}
            <div className="chatpart">
              {messages.map((msg, index) => (
                <p key={index}>{user}: {msg}</p>
              ))}
      
              {/* Input Area */}
              <div className="input-area">
                <input
                  className="no"
                  id="noo"
                  placeholder="Type a message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button onClick={(e) => handletext(e)} className="btttttt">Send</button>
              </div>
            </div>
          </div>
        </>
      );
}

export default Chats;
