import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

const getUsers = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const getUserById = (id) => {
    return axios.get(
        API_URL + "id/" + id, {headers: authHeader()});
};

const updateUserById = (id, body) => {
    console.log(id);
    console.log(body);
    return axios.put(
        API_URL + "id/" + id, body,{
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
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
};

export default UserService;