import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import NetSalaryTable from "./NetSalaryTable";

const calculateSalary = (salary, type, ticketsNumber, ticketValue, payTax) => {
    salary = parseInt(salary);
    ticketsNumber = parseInt(ticketsNumber !== "" ? ticketsNumber : "0");
    ticketValue = parseInt(ticketValue !== "" ? ticketValue : "0");

    const ticketsValue = Math.round(ticketValue * ticketsNumber);
    let employerTax = 0;

    if (type === "total") {
        let gross = (0.0225 * (salary - ticketsValue)) / 1.0225;
        employerTax = Math.round(0.0225 * (salary - ticketsValue - gross));
        salary = Math.round(salary - employerTax - ticketsValue);
    }

    const cas = Math.round(0.25 * salary);
    const cass = Math.round(0.1 * salary);
    let taxes = Math.round(0.1 * (salary + ticketsValue - cas - cass));

    if (!payTax) {
        taxes = 0;
    }

    const taxBases = salary + ticketsValue - cas - cass;
    const netSalary = taxBases - ticketsValue - taxes;
    return [netSalary, cas, cass, taxes, ticketsValue, employerTax];
}

function SalaryCalculator(props) {
    const [grossSalary, setGrossSalary] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const [ticketNumber, setTicketNumber] = useState("0");
    const [ticketValue, setTicketValue] = useState("0");
    const [taxes, setTaxes] = useState(true);
    const [cas, setCas] = useState();
    const [cass, setCass] = useState();
    const [ticketTaxes, setTicketTaxes] = useState();
    const [employerTax, setEmployerTax] = useState();
    const [taxValue, setTaxValue] = useState();
    const [netSalary, setNetSalary] = useState();
    const [hideTable, setHideTable] = useState(true);

    const handleSubmit = () => {
        let values = [];
        if (grossSalary !== "") {
            values = calculateSalary(grossSalary, "gross", ticketNumber, ticketValue, taxes);
        }
        if (totalSalary !== "") {
            values = calculateSalary(totalSalary, "total", ticketNumber, ticketValue, taxes);
        }
        if (values.length) {
            setNetSalary(values[0]);
            setCas(values[1]);
            setCass(values[2]);
            setTaxValue(values[3]);
            setTicketTaxes(values[4]);
            setHideTable(false);
            if (values[5] !== 0) {
                setEmployerTax(values[5]);
            }
        }
        else {
            alert("You didn't add the mandatory parameters")
        }
    }

    return (
        <Container>
            <p>Please input gross salary of the employee or the total salary that the company has to pay.</p>
            <p>Please input if the employee benefits of any meal tickets.</p>
            <Form>
                <h5>Mandatory parameters</h5>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridGrossSalary">
                        <Form.Label>Gross salary</Form.Label>
                        <Form.Control type="number"
                                      hidden={totalSalary !== ""} placeholder="2500"
                                      onChange={(e) =>
                                          setGrossSalary(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTotalSalary">
                        <Form.Label>Total salary</Form.Label>
                        <Form.Control type="number"
                                      hidden={grossSalary !== ""} placeholder="2700"
                                      onChange={(e) =>
                                          setTotalSalary(e.target.value)}/>
                    </Form.Group>
                </Row>

                <h5>Optional parameters</h5>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridGrossMealsNo">
                        <Form.Label>Meal tickets no.</Form.Label>
                        <Form.Control type="number" placeholder="0"
                        onChange={(e) =>
                            setTicketNumber(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTotalMealValue">
                        <Form.Label>Meal ticket value</Form.Label>
                        <Form.Control type="number" placeholder="17"
                        onChange={(e) =>
                            setTicketValue(e.target.value)}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check onChange={(e) => setTaxes(!e.target.checked)}
                        type="checkbox" label="Tax exempt"/>
                </Form.Group>
            </Form>
            <Button className="mb-5" onClick={handleSubmit} variant="primary" type="submit">
                Calculate
            </Button>
            <NetSalaryTable hidden={hideTable} cas={cas} cass={cass}
                    taxesPercent={taxValue === 0 ? "0%" : "10%"}
                    taxes={taxValue} ticketsNumber={ticketNumber} ticketsValue={ticketTaxes}
                    employerTax={employerTax} netSalary={netSalary}/>
        </Container>
    )
}

export default SalaryCalculator;