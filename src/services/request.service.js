import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/requests/";

const createRequest = (request) => {
    console.log(request);
    return axios.post(API_URL, request, {
        headers: authHeader()
    }).catch((err) => {
        alert(err.toString());
    });
}

const getRequests = (params) => {
    return axios.get(API_URL, {
        headers: authHeader(),
        params: params
    });
};

const getVacations = () => {
    return axios.get(API_URL + "vacations", {headers: authHeader()});
}

const getBenefits = () => {
    return axios.get(API_URL + "benefits", {headers: authHeader()});
}

const getBenefitsByUserId = (id) => {
    return axios.get(API_URL + "benefitsByUserId/" + id);
}

const getRequestById = (id) => {
    return axios.get(
        API_URL + "id/" + id, {headers: authHeader()});
};

const updateRequestById = (id, body) => {
    return axios.put(
        API_URL + "id/" + id, body, {headers: authHeader()});
};

const deleteRequestById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, {headers: authHeader()});
};

const RequestService = {
    createRequest,
    getRequests,
    getVacations,
    getBenefits,
    getBenefitsByUserId,
    getRequestById,
    updateRequestById,
    deleteRequestById
};

export default RequestService;