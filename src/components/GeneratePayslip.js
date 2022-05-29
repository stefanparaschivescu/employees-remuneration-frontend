import {useState, useEffect, useContext} from "react";
import {Button, Container, Form} from "react-bootstrap";
import UserService from "../services/user.service";
import {UserContext} from "../App";
import LoadingScreen from "./LoadingScreen";
import PDFService from "../services/pdf.service";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function GeneratePayslip(props) {
    const currentUser = useContext(UserContext);

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [userId, setUserId] = useState(undefined);
    const [selectedYear, setSelectedYear] = useState(undefined);
    const [selectedMonth, setSelectedMonth] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser.id);
        }

        if (userId) {
            setIsLoading(true);
            UserService.getUserById(currentUser.id)
                .then(response => {
                    const hireDate = response.data.hasOwnProperty("createdAt") ? response.data.createdAt : "";
                    const year = parseInt(hireDate.split("-")[0]);
                    const month = parseInt(hireDate.split("-")[1]);

                    let years = [];
                    for (let i = year; i <= new Date().getFullYear(); i++) {
                        years.push(i);
                    }
                    setYears(years);

                    let months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

                    if (selectedYear === years[0]) {
                        for (let i = 0; i < month; i++) {
                            months.shift();
                            console.log("shift");
                        }
                    }

                    if (selectedYear === new Date().getFullYear()) {
                        for (let i = 12; i > new Date().getMonth(); i--) {
                            months.pop();
                            console.log("test");
                        }
                    }
                    setMonths(months);

                    setIsLoading(false)
                })
                .catch(err => console.log(err));
        }
    }, [currentUser, userId, selectedYear]);

    const handleSubmit = () => {
       window.open("http://localhost:3000/api/pdf/");
    }

    return (
        <>
            {!isLoading ? (
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Select value={String(selectedYear)}
                                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                     aria-label="Year select">
                            <option>Select a year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Form.Select>
                        {selectedYear !== undefined && (
                            <Form.Select
                                value={String(selectedMonth)}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                aria-label="Month select">
                                <option>Select a month</option>
                                {months.map((month) => (
                                    <option key={month} value={monthNames.indexOf(month) + 1}>{month}</option>
                                ))}
                            </Form.Select>
                        )}
                        {selectedMonth !== undefined && (
                            <Button variant="success" type="submit">
                                Generate payslip for {monthNames[selectedMonth - 1]} {String(selectedYear)}
                            </Button>
                        )}
                    </Form>
                </Container>
            ) : (<LoadingScreen/>)}
        </>
    )
}

export default GeneratePayslip;