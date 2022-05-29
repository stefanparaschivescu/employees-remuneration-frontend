import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/vacations/";

const createVacation = (vacation) => {
    console.log(vacation);
    return axios.post(API_URL, vacation,{
        headers: authHeader()
    }).catch((err) => {
        alert(err.toString());
    });
}

const getVacations = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getVacationById = (id) => {
    return axios.get(
        API_URL + "id/" + id, { headers: authHeader() });
};

const updateVacationById = (id, body) => {
    return axios.put(
        API_URL + "id/" + id, body,{ headers: authHeader() });
};

const deleteVacationById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, { headers: authHeader() });
};

const VacationService = {
    createVacation,
    getVacations,
    getVacationById,
    updateVacationById,
    deleteVacationById
};

export default VacationService;