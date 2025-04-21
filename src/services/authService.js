import axios from "axios";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/auth/login", {
            email,
            password,
        });
        return response.data;
    }
    catch (error) {
        console.error("Login error:", error);
        throw error.response ? error.response.data : new Error("Network error");
    };
}