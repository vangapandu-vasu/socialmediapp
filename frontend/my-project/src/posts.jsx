import { useState } from "react";
import axios  from "axios";
import "./designing/posts.css"


function Posts(){

    const [postname,setPostname] = useState("")
    const [image,setImage] = useState("");
    const [caption,setCaption] = useState("");

    let handleimg=(e)=>{
        setImage(e.target.files[0])
    }

    let handlesub=(e)=>{
        e.preventDefault();

        const formdata = new FormData()
        formdata.append("postname",postname);
        formdata.append("caption",caption);
        if(image){
            formdata.append("image",image)
        }


        axios.post("http://localhost:9000/post",formdata,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/formdata"
            }
        }).then(()=>{
            alert("post updated successfully");
        }).catch((err)=>{
            console.log("there was some error in updating the post",err)
        })
    }

    return (
        <div className="container mt-5 fade-in">
          <div className="card card-post p-4">
            <h2 className="text-center mb-4">Create a New Post</h2>
            <form onSubmit={(e) => handlesub(e)}>
              {/* Post Name */}
              <div className="mb-3">
                <label className="form-label">Post Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  placeholder="Name your post"
                  onChange={(e) => setPostname(e.target.value)}
                  required
                />
              </div>
      
              {/* File Upload */}
              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control bg-dark text-light"
                  onChange={(e) => handleimg(e)}
                />
              </div>
      
              {/* Caption */}
              <div className="mb-4">
                <label className="form-label">Caption</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  placeholder="#Caption"
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>
      
              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="btn btn-submit">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default Posts;
//look at this code seems to be an error;