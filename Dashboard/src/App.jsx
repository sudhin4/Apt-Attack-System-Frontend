import "./App.css";
import Buttons from "./Components/Buttons";
import Containers from "./Components/Containers";
import Graph from "./Components/Graph";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
import SuspiciousIPTable from "./Components/ResponseAction";
import RiskScoreBarChart from "./Components/Chart";
import RiskScoreBarChart2 from "./Components/Riskscore_chart";
import MetricsTable from "./Components/LastMetrics_Table";

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

  //color of status box
  const [statuscolor, setstatuscolor] = useState();

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
    fetchuser(); // immediate API call

    const interval = setInterval(() => {
      fetchuser();
    }, 2000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (backendvaluegetter) {
      const ml = backendvaluegetter?.ml_detection;
      const features = ml?.realtime_features;
      const suspicious = backendvaluegetter?.ml_detection?.suspicious_ip;

      console.log(suspicious, "Inside if");
      console.log(ml, "Inside if");
      console.log(features, "Inside if");

      setanamoly(ml?.anomaly);
      setattackscore(ml?.risk_score);

      setconnectionno(features?.connection_count);
      setcpuusage(features?.cpu);
      setmemoryusage(features?.memory);
      setnetworkpackets(features?.network_packets);

      setstatus(backendvaluegetter?.ml_detection?.suspicious_ip?.threat_level);

      setnoofipconnection(
        backendvaluegetter?.ml_detection?.suspicious_ip?.ports_accessed?.length,
      );
    } else {
      console.log("Problem in API call");
    }
  }, [backendvaluegetter]);

  const [containerstatusstate, setcontainerstatusstate] = useState({});

  useEffect(() => {
    const Containerstatus = {
      anomaly: !Anamolyscore,
      connection: Connectionno <= 180,
      cpu: cpuusage <= 70,
      memory: Memoryusage <= 70,
      packets: Networkpackets <= 10000,
      attack: Attackscore,
      ports: noofipconnection <= 5,
    };
    setcontainerstatusstate(Containerstatus);
  }, [backendvaluegetter]);

  // file activity file getter for initilize

  const [fileactivityintilize, setfileactivityintilize] = useState([]);

  const fetchfiledata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin-folder/initialize",
      );
      console.log("Initilize the data");
      setfileactivityintilize(response.data);
    } catch (err) {
      console.log("Problem in file initilize", err);
    }
  };

  useEffect(() => {
    fetchfiledata();
  }, []);

  const [isfile, setfile] = useState();
  const [isfilestatus, setfilestatus] = useState();
  const [istime, settime] = useState();

  useEffect(() => {
    if (fileactivityintilize) {
      setfile(fileactivityintilize.files_saved);
      setfilestatus(fileactivityintilize.status);
      const timeOnly = fileactivityintilize?.created_at?.split(" ")[4];
      settime(timeOnly);
    }
  }, [fileactivityintilize]);

  // This is for checking scan

  const [ischeckdata, setcheckdata] = useState();

  const fetchcheckfilestatus = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin-folder/scan",
      );
      setcheckdata(response.data);
    } catch (err) {
      console.log("Problem in file scan", err);
    }
  };

  useEffect(() => {
    fetchcheckfilestatus(); // immediate API call

    const interval = setInterval(() => {
      fetchcheckfilestatus();
    }, 2000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const [isfilecheckno, setfilecheckno] = useState();
  const [isfilecheckstatus, setfileschecktatus] = useState();
  const [isfilechecktime, setfilechecktime] = useState();
  const [iscolor, setcolor] = useState(true);

  useEffect(() => {
    if (ischeckdata) {
      setfileschecktatus(ischeckdata.status);

      if (ischeckdata.status === "alert") {
        setfilecheckno(ischeckdata?.alerts?.[0]?.activity);
        setcolor(false);
      } else {
        setfilecheckno(ischeckdata.message);
        setcolor(true);
      }

      const timeOnly = ischeckdata.created_at.split(" ")[4];
      setfilechecktime(timeOnly);
    }
  }, [ischeckdata]);

  // gettind suspecious data from database

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
              <Containers
                icon={TbReportSearch}
                name="Status"
                value={Status}
                color={containerstatusstate.attack}
              />
              <Containers
                icon={FiMapPin}
                name="IP"
                value={noofipconnection}
                color={containerstatusstate.ports}
              />
            </div>
          </div>

          <div className="Reponseactiondivv">
            <SuspiciousIPTable />
          </div>
          <div className="filemonitoringsection">
            <Filevaluecontainer
              files={isfile}
              status={isfilestatus}
              time={istime}
              whichcont={true}
            />
            <Filevaluecontainer
              whichcont={false}
              files={isfilecheckno}
              status={isfilecheckstatus}
              time={isfilechecktime}
              color={iscolor}
            />
          </div>

          <div className="Barchartsectioninapp">
            <div className="barchart1">
              <RiskScoreBarChart />
            </div>
            <div className="barchart1">
              <RiskScoreBarChart2/>
            </div>

            
            
            
          </div>
          <div className="allmetrictablesection">
              <MetricsTable/>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
