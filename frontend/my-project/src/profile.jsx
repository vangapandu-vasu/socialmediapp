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
import "./designing/profilesetting.css"

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
    <div className="container mt-5 fade-in">
      {/* email and password and fullname belongs to main database if changing here will complicate it 
//             like the profile page renders using fname if i change it here i have to change it on main database  
//             so it will unneccesary complication 
//         */}
      {/* User Info Display */}
      <div className="card bg-dark text-light shadow-sm mb-4 p-3 border-secondary fade-in">
        <h5 className="text-secondary mb-3">User Details</h5>
        <p className="mb-1">
          <strong>Username:</strong> {username}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {email}
        </p>
        <p className="mb-1">
          <strong>Password:</strong> {password}
        </p>
      </div>
  
      {/* Profile Form */}
      <div className="card bg-dark text-light shadow p-4 border-secondary fade-in">
        <h2 className="text-center text-light mb-4">Profile Settings</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control bg-dark text-light border-secondary"
              rows="3"
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
  
          <div className="mb-3">
            <label className="form-label">Favorite Quote</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              value={quote}
              required
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Upload New Profile Picture</label>
            <input
              type="file"
              className="form-control bg-dark text-light border-secondary"
              onChange={(e) => handleimage(e)}
            />
          </div>
  
          {profilePicture && (
            <div className="text-center mb-3">
              <img
                src={`http://localhost:9000${profilePicture}`}
                alt="Profile"
                className="rounded-circle border border-light"
                width="120"
                height="120"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
  
          <div className="text-center">
            <button type="submit" className="btn btn-outline-light px-5">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default Profilesetting;


