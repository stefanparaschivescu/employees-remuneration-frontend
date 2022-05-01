import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import UserService from "../services/user.service";

function FunctionData(props) {
    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser.role.name === "admin");
    const [userId, setUserId] = useState(undefined);
    const [companyName, setCompanyName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [salary, setSalary] = useState(undefined);
    const [internalNumber, setInternalNumber] = useState(undefined);


    useEffect(() => {
        (props.id) ? setUserId(props.id) : setUserId(currentUser.id);

        if (userId) {
            UserService.getUserById(userId)
                .then(response => {
                    setCompanyName(response.data.companyId.name);
                    setEmail(response.data.emailAddress);
                    setSalary(response.data.salary);
                    setInternalNumber(response.data.internalNumber);
                })
                .catch(err => console.log(err));
        }

    }, [currentUser.id, props.id, userId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = {
            ...email && {emailAddress: email},
            ...salary && {salary: salary},
            ...internalNumber && {internalNumber: internalNumber}
        };

        UserService.updateUserById(userId, userObject)
            .then(() => {
                    console.log(currentUser);
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
        <Container className={props.className}>
            {companyName ? (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCompanyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                defaultValue={companyName !== undefined ? String(companyName) : ""}
                                disabled
                                placeholder="Company Ltd."/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                disabled={!isAdmin}
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
                                disabled={!isAdmin}
                                value={salary !== undefined ? String(salary) : ""}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="2000"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridInternalCode">
                            <Form.Label>Internal Number</Form.Label>
                            <Form.Control
                                disabled={!isAdmin}
                                placeholder="128521"
                                value={internalNumber !== undefined ? String(internalNumber) : ""}
                                onChange={(e) => setInternalNumber(e.target.value)}
                            />
                        </Form.Group>

                        {/*<Form.Group as={Col} controlId="formGridFunction">*/}
                        {/*    <Form.Label>Function</Form.Label>*/}
                        {/*    <Form.Select disabled={!isAdmin}>*/}
                        {/*        <option value="" disabled hidden>Choose...</option>*/}
                        {/*        <option value="1">Option1</option>*/}
                        {/*        <option value="2">Option2</option>*/}
                        {/*    </Form.Select>*/}
                        {/*</Form.Group>*/}
                    </Row>

                    <Button hidden={!isAdmin} variant="primary" type="submit">
                        Save changes
                    </Button>
                </Form>) : (<><h1>Please contact support@salaryapp.com and provide
                your email address that you were registered with.</h1>
                <h2>Sorry for the inconvenience.</h2></>)}

        </Container>
    );
}

export default FunctionData;