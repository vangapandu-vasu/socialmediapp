import 'bootstrap/dist/css/bootstrap.min.css';
import "./designing/slash.css"
import {  useNavigate } from 'react-router';


function Slash(){

    const navigate=useNavigate();

    let handlesign=(e)=>{
        e.preventDefault();
        navigate("/signup");
    }

    let handlelogin=(e)=>{
        e.preventDefault();
        navigate("/login");
    }

    return(
        <div className="slash">
            <h5>Welcome</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, aperiam dicta dolores
                porro eius illo nihil hic quasi excepturi repudiandae voluptates, iste assumenda cupiditate 
                labore rem debitis, voluptatem distinctio vero.
             </p>
            <button type="button" className="btn btn-outline-primary" id='bu' onClick={(e)=>handlesign(e)}>Signup</button><br/>
            <button type="button" className="btn btn-outline-primary" id='bu' onClick={(e)=>handlelogin(e)}>Login</button>
        </div>
    )
}

export default Slash;