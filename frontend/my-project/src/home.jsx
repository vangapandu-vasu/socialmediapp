import 'bootstrap/dist/css/bootstrap.min.css';
import './designing/home.css'
import {  NavLink, useNavigate,  } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,
    faUpload,faPlay,faRetweet,faChartLine,faUser,faMessage,faUsers,faMagnifyingGlass,faRepeat,faGears,faCircleInfo,faPhone,faHouseUser,faBars, faHeart} from '@fortawesome/free-solid-svg-icons'
import image from './profiledemo.jpg'
import Card from "./suggestedcontent/card1"
import axios from "axios";
import { useEffect, useState } from 'react';

function  Home(){
    const [username,setUsername] = useState("");
    const [search,setSearch] = useState("");
    const navigate=useNavigate();
    


    let handlesearch=()=>{

        if (!search.trim()) return;
        
        axios.get(`http://localhost:9000/search?userdetails=${search}`,{withCredentials:true},)
        .then(Response=>{
            if(Response.data==="there exists no user"){
                alert("no user found");
                setSearch("no user found");
                
            }
            else{
                navigate("/usersearch",{state:{user:Response.data}});
            }
        })
       
    }




    useEffect(()=>{
        axios.get("http://localhost:9000/profile",{withCredentials:true})
        .then(Response=>{
            if(Response.data.username==="no token"){
                navigate("/login");
            }
            else{
                setUsername(Response.data.username);
            }
        })
        .catch((Error)=>{
            console.log("error while fetching username thankyou",Error);
        });
        });

    return(
        <>
            <div className='container-fluid' id='actual'>
                <div className='userandmedia'>
                    <div className='user'>
                         <NavLink to={`/profile/${username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className='user-item'><FontAwesomeIcon icon={faUser} /><h5>profile</h5></div>
                        </NavLink>
                        <div className='user-item'><FontAwesomeIcon icon={faMagnifyingGlass} /><h5>explore</h5></div>
                        <div className='user-item'><FontAwesomeIcon icon={faRepeat} /><h5>switch user</h5></div>
                        <div className='user-item'><FontAwesomeIcon icon={faChartLine} /><h5>activity</h5></div>
                        <div className='user-item'><FontAwesomeIcon icon={faGears} /><h5>settings</h5></div>
                        <div className='user-item'><FontAwesomeIcon icon={faCircleInfo} /><h5>help</h5></div>
                    </div>
                        <div className='media'>
                        <div className='media-item'><FontAwesomeIcon icon={faPhone} /><h5>contact</h5></div>
                        <div className='media-item'><FontAwesomeIcon icon={faHouseUser} /><h5>about</h5></div>
                        <div className='media-item'><FontAwesomeIcon icon={faBars} /><h5>More</h5></div>
                    </div>
                </div>
                <div className='main'>
                    <div className='top'>
                        
                        <div className='main-item'><img src={image} alt='profile' id='pic' width="150"/></div>
                        <div className='main-item' id='quote-con'>
                            <input type='text' placeholder='quotation' className='quote-input'/>
                        </div>
                        <div className='main-item' id='search'>
                            <button onClick={handlesearch}><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/></button>
                            <input placeholder='search' type='text' className='search-input' onChange={(e)=>setSearch(e.target.value)}/>
                        </div>
                    </div>  
                    <div className='mid'>
                        <div className='midmain-item'><FontAwesomeIcon icon={faUser} /><h5>following</h5></div>
                        <div className='midmain-item'><FontAwesomeIcon icon={faUsers} /><h5>followers</h5></div>
                        <div className='midmain-item'><FontAwesomeIcon icon={faHeart} /><h5>activity</h5></div>
                    </div>
                    <div className='sugg'>
                        <div className='suggmain-item'><Card/></div>
                    </div>
                    <div className='bottom'>
                        <div className='botmain-item'><FontAwesomeIcon icon={faMessage} /><h5>chats</h5></div>
                        <div className='botmain-item'><FontAwesomeIcon icon={faRetweet} /><h5>tweets</h5></div>
                        <div className='botmain-item'><FontAwesomeIcon icon={faPlay} /><h5>videos</h5></div>
                        <div className='botmain-item'><FontAwesomeIcon icon={faUpload} /><h5>upload</h5></div>
                    </div>
                </div>
                <div className='category'>
                    <div className='cate'><h6>category 1</h6> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.amet consectetur adipisicing elit.</p></div>
                    <div className='cate'> <h6>category 2</h6> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.amet consectetur adipisicing elit.</p>.</div>
                    <div className='cate'><h6>category 3</h6>  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.amet consectetur adipisicing elit.</p></div>
                    <div className='cate' id='catee'>
                        <FontAwesomeIcon icon={faList} />
                        <h6>choose category</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;