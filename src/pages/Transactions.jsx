import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = user.accType === "Client" 
          ? `http://localhost:4000/api/v1/transations/client/${user.userID}/`
          : `http://localhost:4000/api/v1/transations/freelancer/${user.userID}/`;
        
        const response = await axios.get(endpoint);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (user?.userID) {
      fetchTransactions();
    }
  }, [user?.userID]);

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">
          Transaction History
        </h1>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-[#222] text-[#c1faff] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#1abc9c] text-[#111]">
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Job Title</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                  {console.log(transactions)}
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.transactionID}
                    className="border-t border-[#333] hover:bg-[#1abc9c]/10 transition-colors"
                  >
                    <td className="p-4">
                      {new Date(transaction.transactionOn).toLocaleDateString()}
                    </td>
                    <td className="p-4">{transaction.JobTitle}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.tStatus === "Completed"
                            ? "bg-green-900/50 text-[#1abc9c]"
                            : transaction.tStatus === "Pending"
                            ? "bg-yellow-900/50 text-yellow-400"
                            : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {transaction.tStatus}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-right font-medium ${
                        user.accType === "Client"
                          ? "text-red-400" // Red for Clients
                          : "text-[#1abc9c]" // Neon green for Freelancers
                      }`}
                    >
                      {user.accType === "Client" ? "-" : "+"}$
                      {Math.abs(transaction.Amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#c1faff] text-center py-8">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transactions;