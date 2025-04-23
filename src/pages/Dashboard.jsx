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
        setJobsCount(data.length);
      }
    };

    // Fetch jobs posted by client
    const fetchClientJobs = async () => {
      if (currentUser.accType === "Client") {
        const res = await fetch(
          `http://localhost:4000/api/v1/jobs/client/${currentUser.userID}`
        );
        const data = await res.json();
        setJobsCount(data.length);
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

    // Fetch earnings and connects
    const fetchEarnings = async () => {
      if (currentUser.accType === "Freelancer") {
        const [earningsRes, connectsRes] = await Promise.all([
          fetch(`http://localhost:4000/api/v1/freelancer/earnings/${currentUser.userID}`),
          fetch(`http://localhost:4000/api/v1/freelancer/totalConnects/${currentUser.userID}`)
        ]);
        const earningsData = await earningsRes.json();
        const connectsData = await connectsRes.json();
        setEarnings(earningsData.earned || 0);
        setConnects(connectsData.totalConnects || 0);
      } else {
        const res = await fetch(
          `http://localhost:4000/api/v1/client/spent/${currentUser.userID}`
        );
        const data = await res.json();
        setEarnings(data.spent || 0);
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
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1abc9c] rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-[#1abc9c]">Welcome back, {currentUser.name} 👋</h1>
              <h2 className="text-xl text-[#c1faff]">Here's a quick summary of your activity</h2>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentUser.accType === "Freelancer" && (
                <>
                  <div
                    className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                    onClick={() => navigate("/connects")}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                        <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1abc9c]">Connects</h3>
                        <p className="text-[#c1faff]">{connects} Available</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                    onClick={() => navigate("/withdraw-funds")}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                        <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1abc9c]">Withdraw Funds</h3>
                        <p className="text-[#c1faff]">Withdraw your earnings</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                    onClick={() => navigate("/buy-connects")}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                        <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1abc9c]">Buy Connects</h3>
                        <p className="text-[#c1faff]">Get more connects</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentUser.accType === "Client" && (
                <div
                  className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                  onClick={() => navigate("/add-funds")}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                      <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1abc9c]">Add Funds</h3>
                      <p className="text-[#c1faff]">Add money to your account</p>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                onClick={() => navigate("/messages")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1abc9c]">Messages</h3>
                <p className="text-[#c1faff]">{messagesCount} Unread</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                onClick={() => navigate("/transactions")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1abc9c]">
                  {currentUser.accType === "Client" ? "Spent" : "Earnings"}
                </h3>
                <p className="text-[#c1faff]">${earnings}</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-[#2c3e50] rounded-lg p-6 cursor-pointer hover:bg-[#34495e] transition-colors duration-300 group"
                onClick={() =>
                  navigate(
                    currentUser.accType === "Client"
                      ? "/active-jobs"
                      : "/proposals"
                  )
                }
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1abc9c]/20 rounded-full flex items-center justify-center group-hover:bg-[#1abc9c]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#1abc9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1abc9c]">
                  {currentUser.accType === "Client"
                    ? "Active Jobs"
                    : "Applied Proposals"}
                </h3>
                <p className="text-[#c1faff]">
                  {jobsCount}{" "}
                  {currentUser.accType === "Client" ? "Active" : "Applied"}
                </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              {currentUser.accType === "Freelancer" && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#1abc9c]">Recent Proposals</h2>
                    <button
                      onClick={() => navigate("/proposals")}
                      className="text-[#1abc9c] hover:text-[#16a085] transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  {proposals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proposals.slice(0, 2).map((p, i) => (
                        <div key={i} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg hover:border-[#1abc9c]/50 transition-colors">
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-[#1abc9c] mb-2">{p.title}</h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                {p.pStatus}
                              </span>
                              <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                ${parseFloat(p.bidAmount).toFixed(2)}
                              </span>
                            </div>
                            <p className="text-[#c1faff] text-sm">
                              Submitted: {new Date(p.submittedOn).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button
                              className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                              onClick={() => navigate(`/proposals/${p.proposalID}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] text-center">
                      <p className="text-[#c1faff]">No recent proposals found.</p>
                    </div>
                  )}
                </section>
              )}

              {currentUser.accType === "Client" && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#1abc9c]">Recent Active Jobs</h2>
                    <button
                      onClick={() => navigate("/active-jobs")}
                      className="text-[#1abc9c] hover:text-[#16a085] transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  {activeJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeJobs.slice(0, 3).map((job, i) => (
                        <div key={i} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg hover:border-[#1abc9c]/50 transition-colors">
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-[#1abc9c] mb-2">{job.title}</h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                {job.level || 'Intermediate'}
                              </span>
                              <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                🔗 {job.connectsRequired}
                              </span>
                            </div>
                            <p className="text-[#c1faff] text-sm">
                              Posted: {new Date(job.postedOn).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button
                              className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                              onClick={() => navigate(`/jobDetails/${job.jobID}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] text-center">
                      <p className="text-[#c1faff]">No active jobs found.</p>
                    </div>
                  )}
                </section>
              )}
            </section>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#c1faff] text-xl">Please log in to view your dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
