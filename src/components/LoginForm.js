import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import AuthService from "../services/auth.service";
import LoadingScreen from "./LoadingScreen";


const validationSchema = yup.object().shape({
    email: yup.string()
        .email("*Must be a valid email address")
        .max(50, "*Email must be less than 50 characters")
        .required("*Email is required"),
    password: yup.string()
        .required("*Password is required to log in")
});

const initialValues = {email: "", password: ""};

function LoginForm(props) {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogin = (email, password) => {
        setLoading(true);

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
                setLoading(false);
            }
        );
    };

    return (
        <>{loading ? (<LoadingScreen/>) : (
            <Container className={props.className}>
                {!props.currentUser ? (
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Formik initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) =>
                                        handleLogin(values.email, values.password)}>
                                {({
                                      values,
                                      errors,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit
                                  }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.email}/>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword"
                                                       label="Password" className={"mb-3"}>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.password}/>
                                            <Form.Control.Feedback
                                                type="invalid">{errors.password}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                        {/*<Form.Group controlId="formBasicCheckbox">*/}
                                        {/*    <Form.Check type="checkbox" label="I am an administrator"/>*/}
                                        {/*</Form.Group>*/}
                                        {/*<Form.Group className="mb-2 " controlId="formRegister">*/}
                                        {/*    <FormText>Your company isn't registered yet?&nbsp;*/}
                                        {/*        <a href="#click" className={"link-primary"}>Click here</a>*/}
                                        {/*    </FormText>*/}
                                        {/*</Form.Group>*/}
                                        <Button variant="primary" type="submit"
                                                disabled={loading}>
                                            {loading ? "Loading..." : "Submit"}
                                        </Button>
                                    </Form>)}
                            </Formik>
                        </Col>
                    </Row>
                ) : (
                    <h3>You are already logged in!</h3>
                )}
            </Container>
        )}
        </>
    );
}

export default LoginForm;

