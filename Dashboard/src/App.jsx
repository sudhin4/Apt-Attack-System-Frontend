import "./App.css";
import Buttons from "./Components/Buttons";
import Containers from "./Components/Containers";
import Graph from "./Components/Graph";

// icons for the containers
import { BiError } from "react-icons/bi"; // Anamloy icons
import { FaLink } from "react-icons/fa6"; // Connection icons
import { BsCpuFill } from "react-icons/bs"; // Cpu icons
import { BiSolidMemoryCard } from "react-icons/bi"; //Memory
import { RiFileChartLine } from "react-icons/ri"; // Data packets
import { GrScorecard } from "react-icons/gr"; // Connection Score
import { TbReportSearch } from "react-icons/tb"; // status
import { FiMapPin } from "react-icons/fi"; // suspecious ip


import axios from "axios";
import { useState,useEffect } from "react";





function App() {

  const [backendvaluegetter,setbackendvaluegetter] = useState([]);

  const fetchuser = async () =>{
    try{
      const response = await axios.get("http://127.0.0.1:5000/api/detection/detect/realtime")
      setbackendvaluegetter(response.data)
    }
    catch(err){
      console.log("Error feteching Data :",err)
    }
  }

  useEffect(()=>{
    fetchuser();
  },[])


  setTimeout(() => {
      console.log(backendvaluegetter.ml_detection.suspicious_ip)
  }, 3000);


  return (
    <>
      <div className="parentapppsection">
        <div className="fulldashboarddiv">
          <div className="containersinapp">
            <div className="leftcontainers">
            <Containers icon={BiError} name="Anamoly" /> 
            <Containers icon={FaLink} name="Connection" />
            <Containers icon={BsCpuFill} name="Cpu" />
          </div>
          <div className="containerdivv">
            <Containers icon={BiSolidMemoryCard} name="Memory" />
            <Containers icon={RiFileChartLine} name="Packets" />
            <Containers  icon={GrScorecard} name="Score"/>
            <Containers icon={TbReportSearch} name="Status" />
            <Containers icon={FiMapPin} name="IP" />
          </div>
          </div>
          
          <div className="rightcontainers">
            <Graph />
          </div>
        </div>
        <div className="buttondivinapp">
          <Buttons color={"green"} fname="Start" />
          <Buttons color={"red"} fname="Stop" />
          <Buttons color={"black"} fname="Block" />
        </div>
      </div>
    </>
  );
}

export default App;
