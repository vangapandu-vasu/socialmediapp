import sug1 from "./images/sug1.jpg"
import sug2 from "./images/sug2.jpg"
import sug3 from "./images/sug3.jpg"
import sug4 from "./images/sug4.jpg"
import sug5 from "./images/sug5.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons"


function Card(){
    return(
        <>
            <div className="suggestedpro">
                <div className="suggest1" id="im">
                    <FontAwesomeIcon icon={faXmark} className="iconx"/>
                    <img src={sug1} alt="image" width="100" height="50" className="img" id="s1"/>
                    <h6 id="head">name...</h6>
                    <p id="head">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                </div>
                <div className="suggest2" id="im">
                    <FontAwesomeIcon icon={faXmark} className="iconx"/>
                    <img src={sug2} alt="image" width="100" height="50" className="img" id="s2"/>
                    <h6 id="head">name...</h6>
                    <p id="head">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="suggest3" id="im">
                    <FontAwesomeIcon icon={faXmark} className="iconx"/>
                    <img src={sug3} alt="image" width="100" height="50" className="img" id="s2"/>
                    <h6 id="head">name...</h6>
                    <p id="head">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="suggest4" id="im">
                    <FontAwesomeIcon icon={faXmark} className="iconx"/>
                    <img src={sug4} alt="image" width="100" height="50" className="img" id="s2"/>
                    <h6 id="head">name...</h6>
                    <p id="head">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="suggest5" id="im">
                    <FontAwesomeIcon icon={faXmark} className="iconx"/>
                    <img src={sug5} alt="image" width="100" height="50"className="img"id="s2"/>
                    <h6 id="head">name...</h6>
                    <p id="head">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </>
    )
}

export default Card;