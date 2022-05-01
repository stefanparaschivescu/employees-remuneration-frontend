import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container,
    FloatingLabel, Form, Row} from "react-bootstrap";

import AuthService from "../services/auth.service";

function LoginForm(props) {
    let navigate = useNavigate();

    // const form = useRef();
    // const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // setMessage("");
        // setLoading(true);

        // form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
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
                    // setLoading(false);
                    // setMessage(resMessage);
                }
            );
        // } else {
        //     setLoading(false);
        // }
    };

    return (
        <Container className={props.className}>
            {!props.currentUser ? (
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={handleLogin}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className={"mb-3"}>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"/>
                            </FloatingLabel>
                            {/*<Form.Group controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check type="checkbox" label="I am an administrator"/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group className="mb-2 " controlId="formRegister">*/}
                            {/*    <FormText>Your company isn't registered yet?&nbsp;*/}
                            {/*        <a href="#click" className={"link-primary"}>Click here</a>*/}
                            {/*    </FormText>*/}
                            {/*</Form.Group>*/}
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <h3>You are already logged in!</h3>
            )}
        </Container>
    );
}

export default LoginForm;

