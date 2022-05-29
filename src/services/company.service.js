import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/companies/";

const createCompany = (company) => {
    console.log(company);
    return axios.post(API_URL, company,{
        headers: authHeader()
    }).catch((err) => {
        alert(err.toString());
    });
}

const getCompanies = () => {
    return axios.get(API_URL, { headers: authHeader() }, );
};

const getCompanyById = (id) => {
    return axios.get(
        API_URL + "id/" + id, { headers: authHeader() });
};

const updateCompanyById = (id, body) => {
    return axios.put(
        API_URL + "id/" + id, body,{ headers: authHeader() });
};

const deleteCompanyById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, { headers: authHeader() });
};

const CompanyService = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById
};

export default CompanyService;