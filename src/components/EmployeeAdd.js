import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {DatePicker} from "react-rainbow-components";
import {useState} from "react";
import UserService from "../services/user.service";

function EmployeeAdd(props) {
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [dateOfBirth, setDateOfBirth] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [gender, setGender] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [married, setMarried] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [salary, setSalary] = useState(undefined);
    const [internalNumber, setInternalNumber] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = {
            companyId: props.company.id,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            gender: gender,
            address: address,
            married: married,
            passwordToken: password,
            emailAddress: email,
            salary: salary,
            internalNumber: internalNumber
        };

        UserService.createEmployee(userObject)
            .then(() => {
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    console.log(resMessage);
                })
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                value={firstName !== undefined ? String(firstName) : ""}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Steven"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                value={lastName !== undefined ? String(lastName) : ""}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Johnson"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridBirthday">
                            <Form.Label>Date of birth</Form.Label>
                            <DatePicker
                                locale="en-US"
                                value={dateOfBirth !== undefined ?
                                    new Date(String(dateOfBirth)) : new Date()}
                                onChange={value => setDateOfBirth(value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                value={phoneNumber !== undefined ? String(phoneNumber) : ""}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+40..."/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                value={gender !== undefined ?
                                    String(gender) : ""}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled hidden>Choose...</option>
                                <option value="true">Male</option>
                                <option value="false">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                value={address !== undefined ? String(address) : ""}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Street, 4, City, State"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMarriage">
                            <Form.Label>Married</Form.Label>
                            <Form.Select
                                value={married !== undefined ?
                                    String(married) : ""}
                                onChange={(e) => setMarried(e.target.value)}>
                                <option value="" disabled hidden>Choose...</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Default Password</Form.Label>
                            <Form.Control
                                placeholder="Introduce a password"
                                value={password !== undefined ? String(password) : ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                value={email !== undefined ? String(email) : ""}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCompanySalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                value={salary !== undefined ? String(salary) : ""}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="2000"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridInternalCode">
                            <Form.Label>Internal Number</Form.Label>
                            <Form.Control
                                placeholder="128521"
                                value={internalNumber !== undefined ? String(internalNumber) : ""}
                                onChange={(e) => setInternalNumber(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default EmployeeAdd;