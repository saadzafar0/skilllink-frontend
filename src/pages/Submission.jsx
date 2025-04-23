import React, { useState, useEffect } from "react";     
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Submission = () =>{
    return (
        <div>
            <h1>Submission</h1>
            <p>This is the submission page.</p>
        </div>
    )
} 

export default Submission;
