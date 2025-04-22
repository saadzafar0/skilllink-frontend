import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

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
    <div className="dashboard-container">
      <main className="dashboard-main">
        {currentUser ? (
          <>
            <section className="dashboard-header">
              <h1>Welcome back, {currentUser.name} 👋</h1>
              <h2 className="activity-summary">
                Here’s a quick summary of your activity
              </h2>
            </section>

            <section className="overview-section">
              {currentUser.accType === "Freelancer" && (
                <div
                  className="overview-card purple"
                  onClick={() => navigate("/connects")}
                  style={{ cursor: "pointer" }}
                >
                  <h3>Connects</h3>
                  <p>{connects} Available</p>
                </div>
              )}

              <div
                className="overview-card dark"
                onClick={() => navigate("/messages")}
                style={{ cursor: "pointer" }}
              >
                <h3>Messages</h3>
                <p>{messagesCount} Unread</p>
              </div>

              <div
                className="overview-card turquoise"
                onClick={() => navigate("/transactions")}
                style={{ cursor: "pointer" }}
              >
                <h3>
                  {currentUser.accType === "Client" ? "Spent" : "Earnings"}{" "}
                </h3>
                <p>${earnings}</p>
              </div>

              <div
                className="overview-card dark"
                onClick={() =>
                  navigate(
                    currentUser.accType === "Client"
                      ? "/active-jobs"
                      : "/proposals"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <h3>
                  {currentUser.accType === "Client"
                    ? "Active Jobs"
                    : "Applied Proposals"}
                </h3>
                <p>
                  {jobsCount}{" "}
                  {currentUser.accType === "Client" ? "Active" : "Applied"}
                </p>
              </div>
            </section>

            <section className="recent-section">
              {currentUser.accType === "Freelancer" && (
                <section className="recent-section">
                  <h2>Recent Proposals</h2>
                  {proposals.length > 0 ? (
                    proposals.slice(0, 2).map((p, i) => (
                      <div key={i} className="recent-card recent-proposal-card">
                        <div className="proposal-info">
                          <h4>{p.title}</h4>
                          <p>
                            <strong>Status:</strong> {p.pStatus} &nbsp;|&nbsp;
                            <strong>Bid:</strong> $
                            {parseFloat(p.bidAmount).toFixed(2)} &nbsp;|&nbsp;
                            <strong>Submitted:</strong>{" "}
                            {new Date(p.submittedOn).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="proposal-actions">
                          <button
                            className="btn-view"
                            onClick={() =>
                              navigate(`/proposals/${p.proposalID}`)
                            }
                          >
                            View
                          </button>
                          <button
                            className="btn-message"
                            onClick={() =>
                              navigate(`/messages?receiverID=${p.clientID}`)
                            }
                          >
                            Message
                          </button>
                          <button
                            className="btn-delete"
                            onClick={async () => {
                              const confirmDelete = window.confirm(
                                "Delete this proposal?"
                              );
                              if (confirmDelete) {
                                await fetch(
                                  `http://localhost:4000/api/v1/proposals/${p.proposalID}`,
                                  {
                                    method: "DELETE",
                                  }
                                );
                                setProposals((prev) =>
                                  prev.filter(
                                    (prop) => prop.proposalID !== p.proposalID
                                  )
                                );
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent proposals found.</p>
                  )}
                </section>
              )}

              {currentUser.accType === "Client" && (
                <section className="recent-section">
                  <h2>Recent Active Jobs</h2>
                  {activeJobs.length > 0 ? (
                    activeJobs.slice(0, 3).map((job, i) => (
                      <div key={i} className="recent-card recent-proposal-card">
                        <div className="proposal-info">
                          <h4>{job.title}</h4>
                          <p>
                            <strong>Posted:</strong>{" "}
                            {new Date(job.postedOn).toLocaleDateString()}{" "}
                            &nbsp;|&nbsp;
                            <strong>Est. Time:</strong> {job.estTime}{" "}
                            &nbsp;|&nbsp;
                            <strong>Connects:</strong> {job.connectsRequired}
                          </p>
                        </div>
                        <div className="proposal-actions">
                          <button
                            className="btn-view"
                            onClick={() => navigate(`/jobs/${job.jobID}`)}
                          >
                            View
                          </button>
                          <button
                            className="btn-message"
                            onClick={() =>
                              navigate(`/messages?receiverID=${job.cID}`)
                            }
                          >
                            Message
                          </button>
                          <button
                            className="btn-delete"
                            onClick={async () => {
                              const confirmDelete =
                                window.confirm("Delete this job?");
                              if (confirmDelete) {
                                await fetch(
                                  `http://localhost:4000/api/v1/jobs/${job.jobID}`,
                                  {
                                    method: "DELETE",
                                  }
                                );
                                setActiveJobs((prev) =>
                                  prev.filter((j) => j.jobID !== job.jobID)
                                );
                                setJobsCount((prev) => prev - 1);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent jobs found.</p>
                  )}
                </section>
              )}
            </section>

            <section className="dashboard-actions">
              {currentUser.accType === "Client" ? (
                <button
                  className="primary-btn"
                  onClick={() => navigate("/post-job")}
                >
                  Post a Job
                </button>
              ) : (
                <button
                  className="primary-btn"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </button>
              )}
            </section>
          </>
        ) : (
          <div className="guest-dashboard">
            <div className="dashboard-header">
              <h1>Welcome to SkillLink!</h1>
              <p>
                Connect with top professionals or find your next opportunity
              </p>
            </div>

            <div className="guest-actions">
              <div className="action-card">
                <h3>For Freelancers</h3>
                <p>Find exciting projects that match your skills</p>
                <button
                  onClick={() => navigate("/register?type=Freelancer")}
                  className="action-button"
                >
                  Join as Freelancer
                </button>
              </div>

              <div className="action-card">
                <h3>For Clients</h3>
                <p>Hire skilled professionals for your projects</p>
                <button
                  onClick={() => navigate("/register?type=Client")}
                  className="action-button"
                >
                  Hire Talent
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
