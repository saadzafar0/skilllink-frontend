// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import Proposals from "./pages/Proposals";
import ActiveJobs from "./pages/ActiveJobs";
import JobProposals from "./pages/JobProposals";
// import NotFound from "./pages/NotFound";
import './App.css';

const App = () => {
  return (
    <>
      <div className="app-background">
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobID" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/active-jobs" element={<ActiveJobs />} />
          <Route path="/jobProposals/:jobId" element={<JobProposals />} />


        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
