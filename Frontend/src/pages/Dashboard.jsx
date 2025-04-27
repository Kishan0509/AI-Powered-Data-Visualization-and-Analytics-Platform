import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import ThreeDGraph from "../components/ThreeDGraph";
import PageWrapper from "../components/PageWrapper";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

import "../styles/Dashboard.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({ userCount: 0, datasetCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

  fetchStats();
}, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dataset/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDatasets(res.data);
      } catch (error) {
        console.error(
          "Error fetching datasets:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [token]);

  const lineData = {
    labels: datasets.map((ds) => new Date(ds.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Records Count",
        data: datasets.map((ds) => ds.data.length),
        borderColor: "#00b4db",
        backgroundColor: "rgba(0,180,219,0.3)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: datasets.map((ds) => ds.datasetName),
    datasets: [
      {
        data: datasets.map((ds) => ds.data.length),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <PageWrapper>
      <div className="dashboard">
        <div className="welcome-card">
          <h1>Welcome Back!</h1>
          <p>Here’s an overview of your datasets 📊</p>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <h4>Total Users 👤</h4>
            <p>{stats.userCount}</p>
          </div>
          <div className="stat-card">
            <h4>Total Datasets 📂</h4>
            <p>{stats.datasetCount}</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-card">
            <h3>Upload Trends 📈</h3>
            <Line data={lineData} options={options} />
          </div>

          <div className="chart-card">
            <h3>Datasets Distribution 🥧</h3>
            <Pie data={pieData} options={options} />
          </div>

          <div className="chart-card">
            <h3>3D Data Visualization 🔥</h3>
            <ThreeDGraph 
              data={datasets.map((ds, i) => ({
                value: ds.data.length,
                label: ds.datasetName,
                color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5],
              }))}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Dashboard;
