import {useContext, useEffect, useState} from "react";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {UserContext} from "../App";
import LoadingScreen from "./LoadingScreen";
import dateUtil from "../util/date.util";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function GenerateBankReport(props) {
    const currentUser = useContext(UserContext);

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [sourceAccount, setSourceAccount] = useState(undefined);
    const [paymentReference, setPaymentReference] = useState(undefined);
    const [isUrgentPayment, setIsUrgentPayment] = useState(false);
    const [selectedYear, setSelectedYear] = useState(undefined);
    const [selectedMonth, setSelectedMonth] = useState(undefined);
    const [selectedDay, setSelectedDay] = useState(27);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);

            const creationDate = currentUser.companyId.createdAt;
            const year = parseInt(creationDate.split("-")[0]);
            const month = parseInt(creationDate.split("-")[1]);

            const result = dateUtil.getDate(year, month, selectedYear);

            setYears(result.years);
            setMonths(result.months);

            setIsLoading(false)
        }
    }, [currentUser, selectedYear]);

    const handleSubmit = () => {
        window.open("http://localhost:3000/api/csv/bankReport/" +
            sourceAccount + "/" + paymentReference + "/" +
            isUrgentPayment + "/" + selectedYear + "-" + selectedMonth + "-" + selectedDay);
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
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Day for the transaction"
                            >
                                <Form.Control
                                    type="number"
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(parseInt(e.target.value))}/>
                            </FloatingLabel>
                        )}
                        {selectedMonth !== undefined && (
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Source Account IBAN"
                            >
                                <Form.Control
                                    type="text"
                                    value={sourceAccount !== undefined ? String(sourceAccount) : ""}
                                    onChange={(e) => setSourceAccount(e.target.value)}/>
                            </FloatingLabel>
                        )}
                        {sourceAccount !== undefined && (
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Payment reference"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    value={paymentReference !== undefined ? String(paymentReference) : ""}
                                    onChange={(e) => setPaymentReference(e.target.value)}/>
                            </FloatingLabel>
                        )}
                        {paymentReference !== undefined && (
                            <Form.Check
                                type="switch"
                                label="Check if transactions are URGENT"
                                className="mb-3"
                                checked={isUrgentPayment}
                                onChange={() => setIsUrgentPayment(!isUrgentPayment)}
                            />
                        )}
                        {paymentReference !== undefined && (
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

export default GenerateBankReport;