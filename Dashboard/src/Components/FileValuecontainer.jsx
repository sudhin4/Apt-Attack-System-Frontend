import { FaFile } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { FiClock } from "react-icons/fi";


import './Allstyle.css'


function Filevaluecontainer(){
    return(
        <>
        <div className="filevaluecontainerdiv">
            <div className="firstbox">
                  <FaFile className="iconstyle"/>
            <h2 className="status">3</h2>
            <h3 className="nameofthecontainer">Files</h3> 
            </div>
            <div className="firstbox">
                <IoIosInformationCircle className="iconstyle"/>
                <h2 className="status">Initialized</h2>
                <h3 className="nameofthecontainer">Status</h3>
            </div>
            <div className="firstbox">
                <FiClock className="iconstyle"/>
                <h2 className="status">03:00 PM</h2>
                <h3 className="nameofthecontainer">Time</h3>
            </div>
         
        </div>
        
        </>
    )
}

export default Filevaluecontainer;