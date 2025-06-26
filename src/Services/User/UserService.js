import axios from "axios";

const API_URL = "http://localhost:8080/user";

export const UserService = {
    
    createUser: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/create`, userData);
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    getUserByEmail: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/email`,data);
            return response.data;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            return error
        }
    }
};