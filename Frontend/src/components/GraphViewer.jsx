import React, { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";
import {
  Bar, Line, Pie, Scatter
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/graphViewer.css"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function GraphViewer() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [chartType, setChartType] = useState("Bar");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/dataset", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDatasets(res.data);
    };
    fetchData();
  }, [token]);

  const renderChart = () => {
    if (!selectedDataset || !xField || !yField) return null;

    const data = {
      labels: selectedDataset.data.map(row => row[xField]),
      datasets: [{
        label: `${yField} vs ${xField}`,
        data: selectedDataset.data.map(row => row[yField]),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'blue',
        borderWidth: 1
      }]
    };

    const commonProps = { data, options: { responsive: true } };

    switch (chartType) {
      case "Bar": return <Bar {...commonProps} />;
      case "Line": return <Line {...commonProps} />;
      case "Pie": return <Pie {...commonProps} />;
      case "Scatter": {
        const scatterData = {
          datasets: [{
            label: `${yField} vs ${xField}`,
            data : selectedDataset.data.map(row => ({
              x: row[xField],
              y: row[yField]
            })),
            backgroundColor: 'green'
          }]
        };
        return <Scatter data={scatterData} options={{ responsive: true }} />;
      }
      default: return null;
    }
  };

  return (
    <PageWrapper>
    <div className="container">
      <h2>Graph Viewer</h2>

      <label>Select Dataset: </label>
      <select onChange={(e) => {
        const dataset = datasets.find(d => d._id === e.target.value);
        setSelectedDataset(dataset);
        setXField("");
        setYField("");
      }}>
        <option value="">-- Choose Dataset --</option>
        {datasets.map(d => (
          <option key={d._id} value={d._id}>{d.datasetName}</option>
        ))}
      </select>

      {selectedDataset && (
        <>
          <div style={{ marginTop: "10px" }}>
            <label>X-Axis: </label>
            <select onChange={e => setXField(e.target.value)}>
              <option value="">-- Select --</option>
              {Object.keys(selectedDataset.data[0]).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>

            <label style={{ marginLeft: "20px" }}>Y-Axis: </label>
            <select onChange={e => setYField(e.target.value)}>
              <option value="">-- Select --</option>
              {Object.keys(selectedDataset.data[0]).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>

            <label style={{ marginLeft: "20px" }}>Chart Type: </label>
            <select onChange={e => setChartType(e.target.value)} defaultValue="Bar">
              <option>Bar</option>
              <option>Line</option>
              <option>Pie</option>
              <option>Scatter</option>
            </select>
          </div>

          <div className="chartContainer">
            {renderChart()}
          </div>
        </>
      )}
    </div>
      </PageWrapper>
  );
}

export default GraphViewer;