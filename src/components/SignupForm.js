import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import AuthService from "../services/auth.service";
import CompanyService from "../services/company.service";
import {useNavigate} from "react-router-dom";

function SignupForm(props) {
    let navigate = useNavigate();

    const [CUI, setCUI] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    let companyId = "";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeCUI = (e) => {
        const cui = e.target.value;
        setCUI(cui);
    };

    const onChangeName = (e) => setName(e.target.value);
    const onChangeAddress = (e) => setAddress(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const handleRegister = (e) => {
        e.preventDefault();

        CompanyService.createCompany({
            CUI: CUI,
            name: name,
            address: address
        }).then((res) => {
            companyId = res.data.id;

            AuthService.register(companyId, email, password, "admin")
                .then(response => {
                        navigate("/profile");
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
                    }
                );
        });
    };

    return (
        <Form onSubmit={handleRegister} className={props.className}>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <h5>Details about the company</h5>
                        <Form.Group className="mb-3" controlId="formGridCompany">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={onChangeName}
                                placeholder="Enter company name"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCui">
                            <Form.Label>CUI (Unique Code of Registration)</Form.Label>
                            <Form.Control
                                value={CUI}
                                onChange={onChangeCUI}
                                placeholder="Enter unique code"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                value={address}
                                onChange={onChangeAddress}
                                placeholder="Street, 4, City, State"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <h5>Details about administrator</h5>
                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="Enter email address"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder="Enter password"/>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button className="w-50" variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Container>
        </Form>

    );
}

export default SignupForm;