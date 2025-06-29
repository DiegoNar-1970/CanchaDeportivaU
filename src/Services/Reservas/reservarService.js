import axios from "axios";
import { delReserva } from "../../Helpers/FunctiosActions";

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

    getReservasByUsuario: async (id_user) => {
        try {
            const response = await axios.get(`${API_URL}/usuario/${id_user}`);
            return response
        } catch (error) {
            console.error("Error fetching canchas:", error);
            throw error;
        }
    },
    updateReserva: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/update-reserva`,data);
            return response
        } catch (error) {
            console.error("Error fetching canchas:", error);
            throw error;
        }
    },

    delReserva: async (data) => {
        const {id_reserva} = data
        console.log('deeleting',data)
        try {
            const response = await axios.delete(`${API_URL}/delete/${id_reserva}`);
            return response
        } catch (error) {
            console.error("Error fetching canchas:", error);
            throw error;
        }
    },
}