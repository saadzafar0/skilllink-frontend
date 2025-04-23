import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // States to hold dynamic data
  const [proposals, setProposals] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [connects, setConnects] = useState(0);
  const [activeJobs, setActiveJobs] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch proposals submitted by freelancer
    const fetchProposals = async () => {
      if (currentUser.accType === "Freelancer") {
        const res = await fetch(
          `http://localhost:4000/api/v1/proposals/freelancer/${currentUser.userID}`
        );
        const data = await res.json();
        setProposals(data || []);
        setJobsCount(data.length); // assuming each proposal = 1 applied job
      }
    };

    // Fetch jobs posted by client
    const fetchClientJobs = async () => {
      if (currentUser.accType === "Client") {
        const res = await fetch(
          `http://localhost:4000/api/v1/jobs/client/${currentUser.userID}`
        );
        const data = await res.json();
        setJobsCount(data.length); // Total number of jobs posted
        setActiveJobs(data || []);
      }
    };

    // Fetch unread messages count
    const fetchUnreadMessages = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/dashboard/unread-messages/${currentUser.userID}`
      );
      const data = await res.json();
      setMessagesCount(data.count || 0);
    };
    // Earnings - Earnings for freelancer or spent for client
    const fetchEarnings = async () => {
      if (currentUser.accType === "Freelancer") {
        const res = await fetch(
          `http://localhost:4000/api/v1/freelancer/earnings/${currentUser.userID}`
        );
        const data = await res.json();
        setEarnings(data.earned || 0);
      }
      if (currentUser.accType === "Client") {
        const res = await fetch(
          `http://localhost:4000/api/v1/client/spent/${currentUser.userID}`
        );
        const data = await res.json();
        setEarnings(data.spent || 0);
      }

      // totalConnects of a Freelancer
      if (currentUser.accType === "Freelancer") {
        const res = await fetch(
          `http://localhost:4000/api/v1/freelancer/totalConnects/${currentUser.userID}`
        );
        const data = await res.json();
        setConnects(data.totalConnects || 0);
      }
    };

    if (currentUser.accType === "Freelancer") fetchProposals();
    else fetchClientJobs();

    fetchUnreadMessages();
    fetchEarnings();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {currentUser ? (
          <>
            <section className="mb-8">
              <h1 className="text-4xl font-bold text-[#1abc9c] mb-2">Welcome back, {currentUser.name} 👋</h1>
              <h2 className="text-xl text-[#c1faff]">Here's a quick summary of your activity</h2>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentUser.accType === "Freelancer" && (
                <div
                  className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300"
                  onClick={() => navigate("/connects")}
                >
                  <h3 className="text-lg font-semibold text-[#1abc9c] mb-2">Connects</h3>
                  <p className="text-[#c1faff]">{connects} Available</p>
                </div>
              )}

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300"
                onClick={() => navigate("/messages")}
              >
                <h3 className="text-lg font-semibold text-[#1abc9c] mb-2">Messages</h3>
                <p className="text-[#c1faff]">{messagesCount} Unread</p>
              </div>

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300"
                onClick={() => navigate("/transactions")}
              >
                <h3 className="text-lg font-semibold text-[#1abc9c] mb-2">
                  {currentUser.accType === "Client" ? "Spent" : "Earnings"}
                </h3>
                <p className="text-[#c1faff]">${earnings}</p>
              </div>

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300"
                onClick={() =>
                  navigate(
                    currentUser.accType === "Client"
                      ? "/active-jobs"
                      : "/proposals"
                  )
                }
              >
                <h3 className="text-lg font-semibold text-[#1abc9c] mb-2">
                  {currentUser.accType === "Client"
                    ? "Active Jobs"
                    : "Applied Proposals"}
                </h3>
                <p className="text-[#c1faff]">
                  {jobsCount}{" "}
                  {currentUser.accType === "Client" ? "Active" : "Applied"}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              {currentUser.accType === "Freelancer" && (
                <section>
                  <h2 className="text-2xl font-bold text-[#1abc9c] mb-4">Recent Proposals</h2>
                  {proposals.length > 0 ? (
                    <div className="space-y-4">
                      {proposals.slice(0, 2).map((p, i) => (
                        <div key={i} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-[#1abc9c] mb-2">{p.title}</h4>
                            <p className="text-[#c1faff]">
                              <span className="font-semibold">Status:</span> {p.pStatus} &nbsp;|&nbsp;
                              <span className="font-semibold">Bid:</span> ${parseFloat(p.bidAmount).toFixed(2)} &nbsp;|&nbsp;
                              <span className="font-semibold">Submitted:</span> {new Date(p.submittedOn).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button
                              className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                              onClick={() => navigate(`/proposals/${p.proposalID}`)}
                            >
                              View
                            </button>
                            
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                              onClick={async () => {
                                const confirmDelete = window.confirm("Delete this proposal?");
                                if (confirmDelete) {
                                  await fetch(
                                    `http://localhost:4000/api/v1/proposals/${p.proposalID}`,
                                    {
                                      method: "DELETE",
                                    }
                                  );
                                  setProposals((prev) =>
                                    prev.filter((prop) => prop.proposalID !== p.proposalID)
                                  );
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#c1faff] text-center py-8">No recent proposals found.</p>
                  )}
                </section>
              )}

              {currentUser.accType === "Client" && (
                <section>
                  <h2 className="text-2xl font-bold text-[#1abc9c] mb-4">Recent Active Jobs</h2>
                  {activeJobs.length > 0 ? (
                    <div className="space-y-4">
                      {activeJobs.slice(0, 3).map((job, i) => (
                        <div key={i} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-[#1abc9c] mb-2">{job.title}</h4>
                            <p className="text-[#c1faff]">
                              <span className="font-semibold">Posted:</span> {new Date(job.postedOn).toLocaleDateString()} &nbsp;|&nbsp;
                              <span className="font-semibold">Est. Time:</span> {job.estTime} &nbsp;|&nbsp;
                              <span className="font-semibold">Connects:</span> {job.connectsRequired}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button
                              className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                              onClick={() => navigate(`/jobDetails/${job.jobID}`)}
                            >
                              View
                            </button>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#c1faff] text-center py-8">No active jobs found.</p>
                  )}
                </section>
              )}
            </section>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#c1faff] text-xl">Please log in to view your dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
