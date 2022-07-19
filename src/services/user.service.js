import axios from "axios";
import authHeader from "./auth-header";
import alert from "bootstrap/js/src/alert";

const API_URL = "http://localhost:3000/api/users/";

const createEmployee = (body) => {
    return axios.post(API_URL + "employee", body, {headers: authHeader()})
        .catch(err => alert(err.toString()));
}

const getUsers = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const getUsersGrossSalaries = () => {
    return axios.get(API_URL + "salaries", {headers: authHeader()});
}

const getUsersHireDates = () => {
    return axios.get(API_URL + "seniority", {headers: authHeader()});
}

const getUserById = (id) => {
    return axios.get(
        API_URL + "id/" + id, {headers: authHeader()});
};

const updateUserById = (id, body) => {
    console.log(id);
    console.log(body);
    return axios.put(
        API_URL + "id/" + id, body, {
            headers: authHeader()
        }).catch((err) => {
        alert(err.toString());
    });
};

const deleteUserById = (id) => {
    return axios.delete(
        API_URL + "id/" + id, {headers: authHeader()});
};

const UserService = {
    createEmployee,
    getUsers,
    getUsersGrossSalaries,
    getUsersHireDates,
    getUserById,
    updateUserById,
    deleteUserById
};

export default UserService;