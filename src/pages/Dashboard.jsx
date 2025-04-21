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

  useEffect(() => {
    if (!currentUser) return;

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

    const fetchClientJobs = async () => {
      if (currentUser.accType === "Client") {
        const res = await fetch(
          `http://localhost:4000/api/v1/jobs/client/${currentUser.userID}`
        );
        const data = await res.json();
        setJobsCount(data.length);
      }
    };

    const fetchUnreadMessages = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/dashboard/unread-messages/${currentUser.userID}`
      );
      const data = await res.json();
      setMessagesCount(data.count || 0);
    };

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
    <div className="bg-gray-900 text-white p-8">
      <main>
        {currentUser ? (
          <>
            <section className="mb-8">
              <h1 className="text-3xl font-bold">
                Welcome back, {currentUser.name} 👋
              </h1>
              <h2 className="text-xl mt-2 text-gray-400">
                Here’s a quick summary of your activity
              </h2>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentUser.accType === "Freelancer" && (
                <div
                  className="bg-purple-600 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => navigate("/connects")}
                >
                  <h3 className="text-xl">Connects</h3>
                  <p>{connects} Available</p>
                </div>
              )}

              <div
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => navigate("/messages")}
              >
                <h3 className="text-xl">Messages</h3>
                <p>{messagesCount} Unread</p>
              </div>

              <div
                className="bg-teal-500 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => navigate("/transactions")}
              >
                <h3 className="text-xl">
                  {currentUser.accType === "Client" ? "Spent" : "Earnings"}
                </h3>
                <p>${earnings}</p>
              </div>

              <div
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() =>
                  navigate(
                    currentUser.accType === "Client" ? "/post-job" : "/jobs"
                  )
                }
              >
                <h3 className="text-xl">
                  {currentUser.accType === "Client"
                    ? "Active Proposals"
                    : "Applied Jobs"}
                </h3>
                <p>
                  {jobsCount}{" "}
                  {currentUser.accType === "Client" ? "Active" : "Applied"}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                {currentUser.accType === "Freelancer"
                  ? "Recent Proposals"
                  : "Recent Jobs"}
              </h2>
              {proposals.length > 0 ? (
                proposals.slice(0, 2).map((p, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl"
                  >
                    <div>
                      <h4 className="text-xl text-white">{p.title}</h4>
                      <p className="text-gray-400">
                        <strong>Status:</strong> {p.pStatus} |{" "}
                        <strong>Bid:</strong> $
                        {parseFloat(p.bidAmount).toFixed(2)} |{" "}
                        <strong>Submitted:</strong>{" "}
                        {new Date(p.submittedOn).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 space-x-4">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => navigate(`/proposals/${p.proposalID}`)}
                      >
                        View
                      </button>
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() =>
                          navigate(`/messages?receiverID=${p.clientID}`)
                        }
                      >
                        Message
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
                <p className="text-gray-400">No recent activity found.</p>
              )}
            </section>

            <section className="mt-8">
              {currentUser.accType === "Client" ? (
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  onClick={() => navigate("/post-job")}
                >
                  Post a Job
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </button>
              )}
            </section>
          </>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center">
                Welcome to SkillLink!
              </h1>
              <p className="text-center text-gray-400">
                Connect with top professionals or find your next opportunity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl text-white">For Freelancers</h3>
                <p className="text-gray-400">
                  Find exciting projects that match your skills
                </p>
                <button
                  onClick={() => navigate("/register?type=Freelancer")}
                  className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700"
                >
                  Join as Freelancer
                </button>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl text-white">For Clients</h3>
                <p className="text-gray-400">
                  Hire skilled professionals for your projects
                </p>
                <button
                  onClick={() => navigate("/register?type=Client")}
                  className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700"
                >
                  {" "}
                  Join as Client{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </main>{" "}
    </div>
  );
};

export default Dashboard;
