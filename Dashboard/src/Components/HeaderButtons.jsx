import { FaRegClock } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import './Allstyle.css'



function HeaderButtons(){
    return(
        <>
        <div className="fullheaderbuttonsection">
         <div  className="firstsectionbuttons">
            <button className="firstsectionbuttontag"><FaRegClock className="firstsectionicon"/>Real Time</button>
            <button className="firstsectionbuttontag"><FaHistory className="firstsectionicon"/>Live</button>
        </div>

        <div className="secondsectionbuttons">
            <button className="secondsectionbuttontag button1">Initialize</button>
            {/* <button className="secondsectionbuttontag button2">Stop</button> */}
            {/* <button className="secondsectionbuttontag button3">Block</button> */}
        </div>   
        </div>
        
        
        </>
    )
}

export default HeaderButtons;