import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PageWrapper from "../components/PageWrapper";
import "../styles/AIInsights.css";

function AIInsights() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [insights, setInsights] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dataset", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDatasets(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDatasets();
  }, [token]);

  const handleDownloadPDF = () => {
    const input = document.getElementById("insights-grid");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("insights.pdf");
    });
  };

  const handleGenerateInsights = async () => {
    if (!selectedDataset) {
      alert("Please select a dataset");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/insight/generate",
        { data: selectedDataset.data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInsights(res.data.insights);
    } catch (error) {
      console.error(error);
      alert("Failed to generate insights");
    }
  };

  return (
    <PageWrapper>

    <div className="ai-container">
      <h2 className="ai-heading">AI Insights</h2>

      <div className="ai-selection">
        <select
          onChange={(e) => {
              const dataset = datasets.find((d) => d._id === e.target.value);
              setSelectedDataset(dataset);
              setInsights(null);
            }}
            >
          <option value="">Select Dataset</option>
          {datasets.map((ds) => (
            <option key={ds._id} value={ds._id}>
              {ds.datasetName}
            </option>
          ))}
        </select>

        <button onClick={handleGenerateInsights} className="btn-primary" style={{ marginLeft: "20px" }}> Generate Insights </button>
      </div>

      {insights && (
          <div id="insights-grid" className="insights-grid">
          {Object.keys(insights).map((key) => (
              <div className="insight-card" key={key}>
              <h3>{key}</h3>
              <p>
                <strong>Mean:</strong>
                <span
                  className={
                      insights[key].mean >= 0
                      ? "value-positive"
                      : "value-negative"
                    }
                    >
                  <CountUp end={insights[key].mean} duration={2} />
                </span>
              </p>
              <p>
                <strong>Mean:</strong>{" "}
                <CountUp end={insights[key].mean} duration={2} />
              </p>
              <p>
                <strong>Min:</strong>{" "}
                <CountUp end={insights[key].min} duration={2} />
              </p>
              <p>
                <strong>Max:</strong>{" "}
                <CountUp end={insights[key].max} duration={2} />
              </p>
            </div>
          ))}
        </div>
      )}

      {insights && (
          <button onClick={handleDownloadPDF} className="btn-primary" style={{ marginTop: "20px" }}> Download Insights as PDF </button>
      )}
    </div>
      </PageWrapper>
  );
}

export default AIInsights;
