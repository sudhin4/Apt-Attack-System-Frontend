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
import { useState, useEffect } from "react";
import Filevaluecontainer from "./Components/FileValuecontainer";
import HeaderButtons from "./Components/HeaderButtons";

function App() {
  const [backendvaluegetter, setbackendvaluegetter] = useState([]); // Apt attack value api usestate

  const [Anamolyscore, setanamoly] = useState([]);
  const [Connectionno, setconnectionno] = useState([]);
  const [cpuusage, setcpuusage] = useState([]);
  const [Memoryusage, setmemoryusage] = useState([]);
  const [Networkpackets, setnetworkpackets] = useState([]);
  const [Attackscore, setattackscore] = useState([]);
  const [Status, setstatus] = useState([]);
  const [noofipconnection, setnoofipconnection] = useState([]);

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/detection/detect/realtime",
      );
      setbackendvaluegetter(response.data);
    } catch (err) {
      console.log("Error feteching Data :", err);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  useEffect(() => {
    if (backendvaluegetter) {
      const ml = backendvaluegetter?.ml_detection;
      const features = ml?.realtime_features;
      const suspicious = backendvaluegetter?.ml_detection?.suspicious_ip;
      console.log(suspicious, "Inside if");

      setanamoly(ml?.anomaly);
      setattackscore(ml?.confidence_score);

      setconnectionno(features?.connection_count);
      setcpuusage(features?.cpu);
      setmemoryusage(features?.memory);
      setnetworkpackets(features?.network_packets);

      setstatus(backendvaluegetter?.ml_detection?.suspicious_ip?.status);
      setnoofipconnection(suspicious?.ports_accessed?.length);
    } else {
      console.log("Problem in API call");
    }
  }, [backendvaluegetter]);

  const [containerstatusstate, setcontainerstatusstate] = useState({});

  useEffect(() => {
    const Containerstatus = {
      anomaly: Anamolyscore === true,
      connection: Connectionno <= 100,
      cpu: cpuusage <= 80,
      memory: Memoryusage <= 80,
      packets: Networkpackets <= 10000,
      attack: Attackscore <= 1,
      ports: noofipconnection <= 5,
    };
    setcontainerstatusstate(Containerstatus);
  }, [backendvaluegetter]);

  //   console.log(backendvaluegetter);
  //   console.log(Anamolyscore)
  //   console.log(Connectionno)
  //   console.log(cpuusage)
  //   console.log(Networkpackets)
  //   console.log(Attackscore)
  //   console.log(Status)
  //   console.log(noofipconnection)

  // console.log(backendvaluegetter?.ml_detection?.suspicious_ip?.ports_accessed?.length)

  // file activity file getter

  const [fileactivityintilize, setfileactivityintilize] = useState([]);

  const fetchfiledata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin-folder/initialize",
      );
      setfileactivityintilize(response.data);
    } catch (err) {
      console.log("Problem in file initilize", err);
    }
  };

  // useEffect(()=>{
  //   fetchfiledata();
  // },[])

  // console.log(fileactivityintilize, "FIle changes value")

  return (
    <>
      <div className="parentapppsection">
        <HeaderButtons />
        <div className="fulldashboarddiv">
          <div className="containersinapp">
            <div className="leftcontainers">
              <Containers
                icon={BiError}
                name="Anamoly"
                value={Anamolyscore}
                color={containerstatusstate.anomaly}
              />
              <Containers
                icon={FaLink}
                name="Connection"
                value={Connectionno}
                color={containerstatusstate.connection}
              />
              <Containers
                icon={BsCpuFill}
                name="Cpu"
                value={cpuusage}
                color={containerstatusstate.cpu}
              />
            </div>
            <div className="containerdivv">
              <Containers
                icon={BiSolidMemoryCard}
                name="Memory"
                value={Memoryusage}
                color={containerstatusstate.memory}
              />
              <Containers
                icon={RiFileChartLine}
                name="Packets"
                value={Networkpackets}
                color={containerstatusstate.packets}
              />
              <Containers
                icon={GrScorecard}
                name="Score"
                value={Attackscore}
                color={containerstatusstate.attack}
              />
              <Containers icon={TbReportSearch} name="Status" value={Status} />
              <Containers
                icon={FiMapPin}
                name="IP"
                value={noofipconnection}
                color={containerstatusstate.ports}
              />
            </div>
          </div>
          <div className="filemonitoringsection">
            <Filevaluecontainer />
            <Filevaluecontainer />
          </div>

          <div className="rightcontainers">
            <Graph />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
