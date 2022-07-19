import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/functions/";

const createFunction = (Function) => {
    return axios.post(API_URL, Function,{
        headers: authHeader()
    }).catch((err) => {
        alert(err.toString());
    });
}

const getFunctions = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getFunctionById = (id) => {
    return axios.get(
        API_URL + "id/" + id, { headers: authHeader() });
};

const updateFunctionById = (id, body) => {
    return axios.put(
        API_URL + "id/" + id, body,{ headers: authHeader() });
};

const deleteFunctionById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, { headers: authHeader() });
};

const FunctionService = {
    createFunction,
    getFunctions,
    getFunctionById,
    updateFunctionById,
    deleteFunctionById
};

export default FunctionService;