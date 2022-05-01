import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import EmployeeData from "./components/EmployeeData";
import SignupForm from "./components/SignupForm";
import {createContext, useEffect, useState} from "react";
import AuthService from "./services/auth.service";
import EmployeesTable from "./components/EmployeesTable";

export const UserContext = createContext(undefined);

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <UserContext.Provider value={currentUser}>
            <BrowserRouter>
                <Menu logOut={logOut}/>
                <Routes>
                    <Route path="/"
                           element={<Home/>}/>
                    <Route path="/profile"
                           element={<EmployeeData/>}/>
                    <Route path="/login"
                           element={<LoginForm/>}/>
                    <Route path="/signup"
                           element={<SignupForm/>}/>
                    <Route path="/table"
                           element={<EmployeesTable/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
