import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadExcel from "./components/UploadExcel";
import Dashboard from "./pages/Dashboard";
import GraphViewer from "./components/GraphViewer";
import MainLayout from "./layouts/MainLayout";
import AIInsights from "./pages/AIInsights";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/upload" element={<MainLayout><UploadExcel /></MainLayout>} />
        <Route path="/graphs" element={<MainLayout><GraphViewer /></MainLayout>} />
        <Route path="/insights" element={<MainLayout><AIInsights /></MainLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
