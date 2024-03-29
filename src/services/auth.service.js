import axios from "axios";
const API_URL = "http://localhost:3000/api/auth/";

const register = (companyId, email, password, role) => {
    return axios.post(API_URL + "signup", {
        companyId,
        email,
        password,
        role
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;