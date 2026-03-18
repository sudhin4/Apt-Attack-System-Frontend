import { FaRegClock } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import "./Allstyle.css";
import { useState } from "react";

function HeaderButtons({ Livevalue ,sendintitlizevalue}) {
    const islivevalue = Livevalue.isbackendlive

    
   
  return (
    <>
      <div className="fullheaderbuttonsection">
        <div className="firstsectionbuttons">
          <button className={`firstsectionbuttontag ${islivevalue ? "islive" : "isnotlive"}`}>
            {/* <FaHistory className="firstsectionicon" /> */}
            {islivevalue?"Live":"Offline"}
          </button>
        </div>

        <div className="secondsectionbuttons">
          <button className="secondsectionbuttontag button1" onClick={()=>sendintitlizevalue(true)}>Initialize</button>
          {/* <button className="secondsectionbuttontag button2">Stop</button> */}
          {/* <button className="secondsectionbuttontag button3">Block</button> */}
        </div>
      </div>
    </>
  );
}

export default HeaderButtons;
