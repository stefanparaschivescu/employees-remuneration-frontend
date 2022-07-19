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
import LoadingScreen from "./components/LoadingScreen";
import VacationRequests from "./components/VacationRequests";
import GeneratePayslip from "./components/GeneratePayslip";
import SalaryCalculator from "./components/SalaryCalculator";
import GenerateBankReport from "./components/GenerateBankReport";
import BenefitsTable from "./components/BenefitsTable";
import BenefitRequests from "./components/BenefitRequests";
import VacationsTable from "./components/VacationsTable";

export const UserContext = createContext(undefined);

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.onbeforeunload = function () {
            setLoading(true);
        };

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
                {loading ? (<LoadingScreen/>) :
                    (<Routes>
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
                        <Route path="/vacations"
                               element={<VacationsTable/>}/>
                        <Route path="/vacationRequests"
                               element={<VacationRequests/>}/>
                        <Route path="/benefits"
                               element={<BenefitsTable/>}/>
                        <Route path="/benefitRequests"
                               element={<BenefitRequests/>}/>
                        <Route path="/payslip"
                               element={<GeneratePayslip/>}/>
                        <Route path="report"
                               element={<GenerateBankReport/>}/>
                        <Route path="/calculator"
                               element={<SalaryCalculator/>}/>
                    </Routes>)}
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
