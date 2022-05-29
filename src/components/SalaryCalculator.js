import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import NetSalaryTable from "./NetSalaryTable";

const calculateSalary = (salary, type, ticketsNumber, ticketValue, payTax) => {
    let cas = Math.round(0.25 * salary);
    let cass = Math.round(0.1 * salary);
    let taxes = Math.round(0.1 * (salary - cas - cass));
    let ticketTaxes = Math.round(0.1 * (ticketValue * ticketsNumber));

    if (!payTax) {
        taxes = 0;
    }

    let netSalary = 0;
    if (type === "gross") {
        netSalary = Math.round(salary - cas - cass - taxes - ticketTaxes);
    }
    else {
        const employerTax = 0.0225 * salary;
        netSalary = Math.round(salary - cas - cass - taxes - ticketTaxes - employerTax);

    }

    return [netSalary, cas, cass, taxes, ticketTaxes];
}

function SalaryCalculator(props) {
    const [grossSalary, setGrossSalary] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const [ticketNumber, setTicketNumber] = useState(0);
    const [ticketValue, setTicketValue] = useState(0);
    const [taxes, setTaxes] = useState(true);
    const [cas, setCas] = useState();
    const [cass, setCass] = useState();
    const [ticketTaxes, setTicketTaxes] = useState();
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
                            setTicketNumber(parseInt(e.target.value))}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTotalMealValue">
                        <Form.Label>Meal ticket value</Form.Label>
                        <Form.Control type="number" placeholder="17"
                        onChange={(e) =>
                            setTicketValue(parseInt(e.target.value))}/>
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
                    netSalary={netSalary}/>
        </Container>
    )
}

export default SalaryCalculator;