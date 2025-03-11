import axios from "axios";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";

const socket=io("http://localhost:9000",{
    transports:["websocket","polling"]
});

function Chats(){

    const [user, setUser] = useState("");
    const [text,setText] = useState("");
    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9000/usernamef",{withCredentials:true})
        .then(Response=>{
            setUser(Response.data.Name);
        })
        .catch(err=>{
            console.log("error in fetching current user id ",err);
        })
    },[]);


    let handletext=(e)=>{
        e.preventDefault();
        if(text.trim()){
            socket.emit("message",text);
            setText("");
        }
    }
    
    useEffect(() => {
        socket.on("message",(msg)=>{
            setMessages((prevmsgs)=>[...prevmsgs,msg])
        });

        return () => socket.off("message");
    },[])
    


    return(
        <>
            <h1>on chats</h1>
            <input className="no" id="noo" placeholder="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
            <button onClick={(e)=>handletext(e)} className="btttttt">send
            </button>
            <div>
                {messages.map((msg,index)=>(
                    <p key={index}>{user}:{msg}</p>
                ))}
            </div>
        </>
    )
}

export default Chats;
