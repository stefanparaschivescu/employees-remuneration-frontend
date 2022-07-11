import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/benefits/";

const createBenefit = (benefit) => {
    return axios.post(API_URL, benefit,{
        headers: authHeader()
    }).catch((err) => {
        alert(err.toString());
    });
}

const getBenefits = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getBenefitById = (id) => {
    return axios.get(
        API_URL + "id/" + id, { headers: authHeader() });
};

const updateBenefitById = (id, body) => {
    return axios.put(
        API_URL + "id/" + id, body,{ headers: authHeader() });
};

const deleteBenefitById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, { headers: authHeader() });
};

const BenefitService = {
    createBenefit,
    getBenefits,
    getBenefitById,
    updateBenefitById,
    deleteBenefitById
};

export default BenefitService;