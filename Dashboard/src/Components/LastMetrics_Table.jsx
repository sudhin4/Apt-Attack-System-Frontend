import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import './Allstyle.css'

export default function MetricsTable() {

  const [metrics, setMetrics] = useState([]);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/Last/Last_metrics"
      );

      setMetrics(response.data.metrics);

    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {

    fetchMetrics();

    const interval = setInterval(() => {
      fetchMetrics();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const timeTemplate = (rowData) => {
    return new Date(rowData.time).toLocaleTimeString();
  };

  const riskTemplate = (rowData) => {

    let color = "green";

    if (rowData.risk_score > 60) {
      color = "red";
    } else if (rowData.risk_score > 30) {
      color = "orange";
    }

    return (
      <span
        style={{
          color: "white",
          backgroundColor: color,
          padding: "4px 10px",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        {rowData.risk_score}
      </span>
    );
  };

  return (
    <div className="card">

      <h3>Last Network Metrics</h3>

      <DataTable
        value={metrics}
        scrollable
        scrollHeight="350px"
        stripedRows
        showGridlines
        className="Lastmetrictablee"
        tableStyle={{ width: "100%" }}
      >

        <Column field="time" header="Time" body={timeTemplate}></Column>

        <Column field="packets" header="Packets"></Column>

        <Column field="risk_score" header="Risk Score" body={riskTemplate}></Column>

        <Column field="cpu" header="CPU %"></Column>

        <Column field="memory" header="Memory %"></Column>

        <Column field="port" header="Port"></Column>

      </DataTable>

    </div>
  );
}