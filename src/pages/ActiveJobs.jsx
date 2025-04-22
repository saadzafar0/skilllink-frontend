import React, { useState, useEffect } from "react";
import Filters from "../components/jobs/Filters";
import JobCard from "../components/jobs/JobCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ActiveJobs = () => {
    const { user } = useAuth();
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        jobLevel: "",
        sortBy: "newest"
    });
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    console.log("ActiveJobs component rendered with user:", user);

    useEffect(() => {
        const fetchClientJobs = async () => {
            console.log("Fetching jobs for user:", user);
            if (!user || user.accType !== "Client") return;

            try {
                setLoading(true);
                const res = await fetch(
                    `http://localhost:4000/api/v1/jobs/client/${user.userID}`
                );
                const data = await res.json();
                setJobs(data || []);
            } catch (err) {
                console.error("Failed to fetch active jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientJobs();
    }, [user]);

    // Filter jobs based on local filters
    const filteredJobs = jobs.filter((job) => {
        const keywordMatch = filters.keyword
            ? job.Title.toLowerCase().includes(filters.keyword.toLowerCase())
            : true;

        const levelMatch = filters.level ? job.jobLevel === filters.level : true;

        const connectsMatch =
            filters.connects != null
                ? job.connectsRequired <= filters.connects
                : true;

        return keywordMatch && levelMatch && connectsMatch;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (filters.sortBy) {
            case "newest":
                return new Date(b.postedOn) - new Date(a.postedOn);
            case "oldest":
                return new Date(a.postedOn) - new Date(b.postedOn);
            case "connectsLow":
                return a.connectsRequired - b.connectsRequired;
            case "connectsHigh":
                return b.connectsRequired - a.connectsRequired;
            default:
                return 0;
        }
    });

    const handleEdit = (jobID) => {
        navigate(`/edit-job/${jobID}`);
    };

    const handleDelete = (jobID) => {
        navigate(`/delete-job/${jobID}`);
    };

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-[#1abc9c] mb-8">My Active Jobs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <Filters filters={filters} onFilterChange={setFilters} />
                    </div>
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
                            </div>
                        ) : sortedJobs.length === 0 ? (
                            <div className="text-[#c1faff] text-center py-8">No active jobs found</div>
                        ) : (
                            <div className="space-y-6">
                                {sortedJobs.map((job) => (
                                    <JobCard
                                        key={job.jobID}
                                        job={job}
                                        showActions={true}
                                        onEdit={() => handleEdit(job.jobID)}
                                        onDelete={() => handleDelete(job.jobID)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveJobs;
