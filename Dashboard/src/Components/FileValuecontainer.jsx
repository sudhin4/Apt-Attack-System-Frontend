import { FaFile } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { FiClock } from "react-icons/fi";

import "./Allstyle.css";

function Filevaluecontainer({
  files = "0",
  status = "Null",
  time = "00.00 AM",
  whichcont,
  color
}) {
  return (
    <>
      {whichcont ? (
        <div className="filevaluecontainerdiv">
          <div className="firstbox">
            <FaFile className="iconstyle" />
            <h2 className="statuss">{files}</h2>
            <h3 className="nameofthecontainer">Files</h3>
          </div>
          <div className="firstbox">
            <IoIosInformationCircle className="iconstyle" />
            <h2 className="statuss">{status}</h2>
            <h3 className="nameofthecontainer">Status</h3>
          </div>
          <div className="firstbox">
            <FiClock className="iconstyle" />
            <h2 className="statuss">{time}</h2>
            <h3 className="nameofthecontainer">Time</h3>
          </div>
        </div>
      ) : (
        <div className="filevaluecontainerdiv">
          <div className="firstbox">
            <FaFile className="iconstyle" />
            <h2 className= {color?"statuss greenstatus": "statuss redstatus"}>{files}</h2>
            <h3 className="nameofthecontainer">Changes</h3>
          </div>
          <div className="firstbox">
            <IoIosInformationCircle className="iconstyle" />
            <h2 className={color?"statuss greenstatus": "statuss redstatus"}>{status}</h2>
            <h3 className="nameofthecontainer">Status</h3>
          </div>
          <div className="firstbox">
            <FiClock className="iconstyle" />
            <h2 className="statuss">{time}</h2>
            <h3 className="nameofthecontainer">Time</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default Filevaluecontainer;
