import { useState } from "react";
import axios  from "axios";


function Posts(){

    const [postname,setPostname] = useState("")
    const [image,setImage] = useState("");
    const [caption,setCaption] = useState("");

    let handleimg=(e)=>{
        setImage(e.target.files[0])
    }

    let handlesub=(e)=>{
        e.preventDefult();

        const formdata = new FormData()
        formdata.append("postname",postname);
        formdata.append("caption",caption);
        if(image){
            formdata.append("image",image)
        }


        axios.post("http://localhost:9000/post",formdata,{
            withCredentials:true,
            headers:{
                "content-Type":"multipart/formdata"
            }
        })
    }

    return(
        <>
            <form onSubmit={(e)=>handlesub(e)}>
                <input type="text" placeholder="name your post" onChange={(e)=>setPostname(e.target.value)} required ></input>
                <input type="file" onChange={(e)=>handleimg(e)}></input>
                <input type="input" onChange={(e)=>setCaption(e.target.value)} placeholder="#caption" required ></input>
            </form>
        </>
    );
}

export default Posts;