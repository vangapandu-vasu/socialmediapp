// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import axios from "axios";


// function Profilesetting(){

//     const {username}=useParams("");
//     const [Name,setName]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [profilepicture,setProfilepicture]=useState("");
//     const [bio,setBio]=useState("");
//     const [quote,setQuote]=useState("");

//     useEffect(()=>{
//         axios.get("http:localhost:9000/profileset",{withCredentials:true})
//         .then(Response=>{
//             setName(Response.data.Name || "")
//             setEmail(Response.data.email || "");
//             setPassword(Response.data.password || "");
//             setBio(Response.data.bio || "");
//             setProfilepicture(Response.data.profilepicture || "");
//             setQuote(Response.data.quote || "");
//         }).catch(Error=>{
//             console.log("error in prodileupdataion",Error);
//         })
//     },[]);

//     let handlesub=(e)=>{
//         e.preventDefult();
//         axios.put("http:localhost:9000/update-profile",
//             {email,Name,bio,quote,profilepicture},{
//             withCredentials:true,
//             headers:{
//                 "Content-Type":"multipart/formData"
//             }
//         })
//         .then()
//     }

//     return(
        
//         <>

//             <h1>FullName:{username}</h1>
//              <h1>Email:{email}</h1>         
//             <h1>password:{password}</h1>
//             <div className="profiles">
//                 <form onSubmit={(e)=>handlesub(e)}>
//                     <input
//                         value={Name} type="text" required onChange={(e)=>setName(e.target.value)}
//                     ></input>
//                     <input
//                         value={bio} type="text" required onChange={(e)=>setBio(e.target.value)}
//                     ></input>
//                     <input
//                         value={quote} type="text" required onChange={(e)=>setQuote(e.target.value)}
//                     ></input>
//                     <label
//                         htmlFor="profilepicture"
//                         type="file"
//                         value={profilepicture}
//                         id="profilepicture"
//                         onChange={(e)=>setProfilepicture(e.target.files[0])}
//                     ></label>
//                     <button  type="submit">update</button>
//                 </form>
//             </div>
//         </>
//     );
// };


// export default  Profilesetting;

import { useEffect, useState } from "react";
import {   useParams } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Profilesetting() {
  const { username } = useParams("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");
  const [quote, setQuote] = useState("");
  const [image,setImage] = useState(null);
  

  useEffect(() => {
    axios
      .get("http://localhost:9000/profileset", { withCredentials: true })
      .then((response) => {
        if(response.data==="not logged in"){
          <h1>your not logged in please login in</h1>
        }
        setName(response.data.name || "");
        setEmail(response.data.email || "");
        setPassword(response.data.password || "");
        setBio(response.data.bio || "");
        setProfilePicture(response.data.profilePicture || "");
        setQuote(response.data.quote || "");
      })
      .catch((error) => {
        console.log("Error in profile update", error);
      });
  }, []);

  let handleimage=(e)=>{
    e.preventDefault();
    setImage(e.target.files[0]);
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    

    const formData= new FormData();
    formData.append("email",email)
    formData.append("Name",name)
    formData.append("bio",bio);
    formData.append("quote",quote);
    if(image){
      formData.append("profilepicture",image);
    }
     
  


    axios.put("http://localhost:9000/update-profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.log("Error updating profile", error);
      });
  };

  return (
    <div className="container mt-5">
                 {/* email and password and fullname belongs to main database if changing here will complicate it 
//             like the profile page renders using fname if i change it here i have to change it on main database  
//             so it will unneccesary complication 
//         */}
        <h1>username:{username}</h1>
        <h1>email:{email}</h1>
        <h1>password:{password}</h1>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Profile Settings</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              rows="3"
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          {/* Quote */}
          <div className="mb-3">
            <label className="form-label">Favorite Quote</label>
            <input
              type="text"
              className="form-control"
              value={quote}
              required
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-3">
            <label className="form-label">Profile Picture URL</label>
            <input
              type="file"
              className="form-control"
              // value={profilePicture}
              onChange={(e) => handleimage(e)}
            />
          </div>

          {/* Display preview Profile Picture */}
          {profilePicture && (
            <div className="text-center mb-3">
              <img
                src={`http://localhost:9000${profilePicture}`}
                alt="Profile"
                className="rounded-circle"
                width="100"
                height="100"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profilesetting;
