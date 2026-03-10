import React, { useState, useEffect } from "react";
import "./Allstyle.css";
import axios from "axios";

const SuspiciousIPTable = () => {
  const [Getsuspeciousdata, setgetsuspeciousdata] = useState([]);

  // store blocked rows
  const [blockedRows, setBlockedRows] = useState(() => {
    const saved = localStorage.getItem("blockedRows");
    return saved ? JSON.parse(saved) : [];
  });

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/getvalue/metrics_history",
      );

      setgetsuspeciousdata(response.data.history);
    } catch (error) {
      console.log("Error getting backend data", error);
    }
  };

  useEffect(() => {
    getdata();

    const interval = setInterval(() => {
      getdata();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleBlock = (index) => {
    if (!blockedRows.includes(index)) {
      const updated = [...blockedRows, index];

      setBlockedRows(updated);

      localStorage.setItem("blockedRows", JSON.stringify(updated));
    }
  };

  return (
    <div className="ip-container">
      <h2 className="title">SUSPICIOUS IP MONITORING</h2>

      <table className="ip-table">
        <thead>
          <tr>
            <th>IP ADDRESS</th>
            <th>DATA PACKETS</th>
            <th>RISK SCORE</th>
            <th>STATE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {Getsuspeciousdata.map((item, index) => {
            const isBlocked = blockedRows.includes(index);

            return (
              <tr key={index}>
                <td className="ip valuetable">{item.suspicious_ip}</td>

                <td className="valuetable">{item.network_packets}</td>

                <td className="score valuetable">{item.risk_score}</td>

                <td className="StatusFromtable valuetable">{item.status}</td>

                <td>
                  <span
                    className={
                      isBlocked
                        ? "blockingstatus blocked"
                        : "blockingstatus suspicious"
                    }
                  >
                    {isBlocked ? "Blocked" : "Suspicious"}
                  </span>
                </td>

                <td>
                  {!isBlocked && (
                    <button
                      className="block-btn"
                      onClick={() => handleBlock(index)}
                    >
                      BLOCK
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuspiciousIPTable;
