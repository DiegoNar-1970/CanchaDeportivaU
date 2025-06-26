import axios from "axios";

const API_URL = "http://localhost:8080/reserva";

export const  ReservaService = {

    createReserva: async (canchaData) => {
        try {
            const response = await axios.post(`${API_URL}/create`, canchaData);
            return response.data;
        } catch (error) {
            console.error("Error creating cancha:", error);
            return error
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

}