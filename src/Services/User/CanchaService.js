import axios from "axios";

const API_URL = "http://localhost:8080/cancha"

export const CanchaService = {

    createCancha: async (canchaData) => {
        try {
            const response = await axios.post(API_URL, canchaData);
            return response.data;
        } catch (error) {
            console.error("Error creating cancha:", error);
            throw error;
        }
    },

    getCanchas: async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching canchas:", error);
            throw error;
        }
    },

    updateCancha: async (id, canchaData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, canchaData);
            return response.data;
        } catch (error) {
            console.error("Error updating cancha:", error);
            throw error;
        }
    },

    deleteCancha: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting cancha:", error);
            throw error;
        }
    }
};
