import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RiskScoreBarChart() {
  const [isdata, setdata] = useState([]);
  const [chartdata, setchartdata] = useState([]);

  const gettingdata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/graph/metrics_graph",
      );
      setdata(response.data.metrics);
      console.log(isdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingdata(); // immediate API call

    const interval = setInterval(() => {
      gettingdata();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  console.log(isdata,"Chartdata")

  useEffect(() => {
  if (isdata.length > 0) {

    const formatted = isdata.map((item) => ({
      time: new Date(item.timestamp).toLocaleTimeString(),
      risk_score: item.network_packets
    }));

    setchartdata(formatted);
  }
}, [isdata]);

  const dataset = [
    { time: "10:00", risk_score: 10 },
    { time: "10:05", risk_score: 30 },
    { time: "10:10", risk_score: 50 },
    { time: "10:15", risk_score: 20 },
    { time: "10:20", risk_score: 70 },
  ];

  return (
    <BarChart
      dataset={chartdata}
      xAxis={[{ dataKey: "time", scaleType: "band" }]}
      series={[{ dataKey: "risk_score", label: "DataPackets" }]}
      height={300}
      width={500}
    />
  );
}
