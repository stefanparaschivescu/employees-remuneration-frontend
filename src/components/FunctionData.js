import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import UserService from "../services/user.service";
import * as yup from "yup";
import {Formik} from "formik";
import LoadingScreen from "./LoadingScreen";

function FunctionData(props) {
    const validationSchema = yup.object().shape({
        companyName: yup.string(),
        email: yup.string()
            .email("*Must be a valid email address")
            .max(50, "*Email must be less than 50 characters")
            .required("*Email is required"),
        salary: yup.number()
            .min(2000)
            .required(),
        internalNumber: yup.number()
            .required()
    });

    const initialSchema = {
        companyName: "",
        email: "",
        salary: "",
        internalNumber: ""
    };

    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser.role.name === "admin");
    const [userId, setUserId] = useState(undefined);
    const [initialValues, setInitialValues] = useState(initialSchema);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (props.id) ? setUserId(props.id) : setUserId(currentUser.id);

        if (userId) {
            setIsLoading(true);
            UserService.getUserById(userId)
                .then(response => {
                    const user = response.data;
                    const userObject = {
                        companyName: user.companyId.name ? user.companyId.name : "",
                        email: user.emailAddress ? user.emailAddress : "",
                        salary: user.salary ? user.salary : "",
                        internalNumber: user.internalNumber ? user.internalNumber : ""
                    }
                    setInitialValues(userObject);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    }, [currentUser.id, props.id, userId]);

    const handleSubmit = (values) => {
        const userObject = {
            ...values.email && {emailAddress: values.email},
            ...values.salary && {salary: values.salary},
            ...values.internalNumber && {internalNumber: values.internalNumber},
        };

        UserService.updateUserById(userId, userObject)
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
        <>
            {!isLoading ? (
                <Container className={props.className}>
                    <Formik initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}>
                        {({
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCompanyName">
                                        <Form.Label>Company Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="companyName"
                                            value={values.companyName}
                                            disabled
                                            placeholder="Company Ltd."/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="email@example.com"
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCompanySalary">
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="number"
                                            name="salary"
                                            value={values.salary}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="2000"
                                            isInvalid={!!errors.salary}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.salary}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridInternalCode">
                                        <Form.Label>Internal Number</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="number"
                                            name="internalNumber"
                                            value={values.internalNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="128521"
                                            isInvalid={!!errors.internalNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.internalNumber}
                                        </Form.Control.Feedback>
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
                            </Form>
                        )}
                    </Formik>
                </Container>) : (<LoadingScreen/>)}
        </>

    );
}

export default FunctionData;