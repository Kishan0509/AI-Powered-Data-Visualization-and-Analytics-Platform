import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import PageWrapper from "../components/PageWrapper";
import "../styles/UploadExcel.css";

function UploadExcel() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [manualMode, setManualMode] = useState(false);
  const [manualData, setManualData] = useState([{ name: "", value: "" }]);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    setLoading(true); 
    try {
      if (manualMode) {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:5000/api/dataset/manual",
          { data: manualData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data.data);
        alert("Manual data uploaded!");
      } else {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("excel", file);

        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:5000/api/dataset/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data.data);
        alert("File upload successful!");
      }
    } catch (err) {
      console.error("Error uploading file:", err); 
      alert("File upload failed!");
    } finally {
      setLoading(false); 
    }
  };

  const handleManualChange = (index, field, value) => {
    const updated = [...manualData];
    updated[index][field] = value;
    setManualData(updated);
  };

  const addManualRow = () => {
    setManualData([...manualData, { name: "", value: "" }]);
  };

  return (
    <PageWrapper>
      <div className="upload-container">
        <h2>📤 Upload Your Data</h2>
        <button onClick={() => setManualMode(!manualMode)} className="toggleButton">
          {manualMode ? "Switch to File Upload" : "Switch to Manual Entry"}
        </button>

        {manualMode ? (
          <div className="formContainer">
            {manualData.map((row, index) => (
              <div key={index} className="inputRow">
                <input
                  type="text"
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => handleManualChange(index, "name", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => handleManualChange(index, "value", e.target.value)}
                  className="input"
                />
              </div>
            ))}
            <button onClick={addManualRow} className="addRowButton">
              + Add Row
            </button>
          </div>
        ) : (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>📂 Drag and drop Excel file here, or click to select</p>
          </div>
        )}
        <button onClick={handleUpload} className="uploadButton">
          {manualMode ? "Submit Data" : "Upload File"}
        </button>

        {loading && <div className="loading-indicator">Uploading...</div>} {/* Loading indicator */}

        <div className="previewContainer">
          {data.length > 0 && (
            <>
              <h3 className="previewHeading">Preview Data</h3>
              <div className="previewTable">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, index) => (
                          <td key={index}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default UploadExcel;
