import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BrowseJobs from "./pages/BrowseJobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import Proposals from "./pages/Proposals";
import ActiveJobs from "./pages/ActiveJobs";
import JobProposals from "./pages/JobProposals";
import OngoingJobs from "./pages/OngoingJobs";
import OngoingFreelancerJobs from "./pages/OngoingFreelancerJobs";
import Submissions from "./pages/Submissions";
import MakeSubmission from "./pages/MakeSubmission";
import Transactions from "./pages/Transactions";
import WithdrawFunds from "./pages/WithdrawFunds";
import BuyConnects from "./pages/BuyConnects";
import AddFunds from "./pages/AddFunds";
import Profile from "./pages/Profile";
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <>
          <div className="app-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/browse-jobs" element={<BrowseJobs />} />
              <Route path="/jobDetails/:jobID" element={<JobDetails />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/active-jobs" element={<ActiveJobs />} />
              <Route path="/jobProposals/:jobId" element={<JobProposals />} />
              <Route path="/ongoingJobs" element={<OngoingJobs />} />
              <Route path="/ongoingFreelancerJobs" element={<OngoingFreelancerJobs />} />
              <Route path="/submissions/:jobId" element={<Submissions />} />
              <Route path="/make-submission/:jobId" element={<MakeSubmission />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/submission/:jobId" element={<Transactions />} />
              <Route path="/withdraw-funds" element={<WithdrawFunds />} />
              <Route path="/buy-connects" element={<BuyConnects />} />
              <Route path="/add-funds" element={<AddFunds />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
        </>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
