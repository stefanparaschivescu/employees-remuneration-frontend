import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {UserContext} from "../App";
import UserService from "../services/user.service";
import * as yup from "yup";
import {Formik} from "formik";
import LoadingScreen from "./LoadingScreen";
import FunctionService from "../services/function.service";
import FunctionAdd from "./FunctionAdd";

function FunctionData(props) {
    const validationSchema = yup.object().shape({
        companyName: yup.string(),
        email: yup.string()
            .email("*Must be a valid email address")
            .max(50, "*Email must be less than 50 characters")
            .required("*Email is required"),
        grossSalary: yup.number()
            .min(2100, "*Gross salary must be at least 2100 RON")
            .required(),
        netSalary: yup.number()
            .min(1000, "*Net salary must be at least 1000 RON"),
        mealTicketValue: yup.number()
            .min(10, "*Meal ticket value must be at least 10 RON")
            .required(),
        vacationDays: yup.number()
            .min(21, "*Vacation days must be at least 21")
            .required(),
        taxExempt: yup.boolean(),
        internalNumber: yup.number()
            .required(),
        functionId: yup.string()
    });

    const initialSchema = {
        companyName: "",
        email: "",
        grossSalary: "",
        netSalary: "",
        mealTicketValue: "",
        vacationDays: "",
        taxExempt: false,
        internalNumber: "",
        functionId: ""
    };

    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser.role.name === "admin");
    const [addModal, setAddModal] = useState(false);
    const [userId, setUserId] = useState(undefined);
    const [functions, setFunctions] = useState([]);
    const [initialValues, setInitialValues] = useState(initialSchema);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (props.id) ? setUserId(props.id) : setUserId(currentUser.id);

        if (userId) {
            setIsLoading(true);
            UserService.getUserById(userId)
                .then(response => {
                    FunctionService.getFunctions()
                        .then(response => setFunctions(response.data))
                        .catch(err => alert(err))

                    const user = response.data;
                    const userObject = {
                        companyName: user.companyId.name ? user.companyId.name : "",
                        email: user.emailAddress ? user.emailAddress : "",
                        grossSalary: user.grossSalary ? user.grossSalary : "",
                        netSalary: user.netSalary ? user.netSalary : "",
                        mealTicketValue: user.mealTicketValue ? user.mealTicketValue : "",
                        vacationDays: user.vacationDays ? user.vacationDays : "",
                        taxExempt: user.hasOwnProperty("taxExempt") ? user.taxExempt : false,
                        internalNumber: user.internalNumber ? user.internalNumber : "",
                        functionId: user.hasOwnProperty("functionId") ? user.functionId._id : ""
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
            ...values.grossSalary && {grossSalary: values.grossSalary},
            ...values.netSalary && {netSalary: values.netSalary},
            ...values.mealTicketValue && {mealTicketValue: values.mealTicketValue},
            ...values.vacationDays && {vacationDays: values.vacationDays},
            taxExempt: values.taxExempt,
            ...values.internalNumber && {internalNumber: values.internalNumber},
            ...values.functionId && {functionId: values.functionId}
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
                              setFieldValue,
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
                                    <Form.Group as={Col} controlId="formGridGrossSalary">
                                        <Form.Label>Gross Salary</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="number"
                                            name="grossSalary"
                                            value={values.grossSalary}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="2000"
                                            isInvalid={!!errors.grossSalary}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.grossSalary}
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

                                    <Form.Group as={Col} controlId="formGridFunction">
                                        <Form.Label>Function</Form.Label>
                                        <Row>
                                            <Col md={10} className="pe-0">
                                                <Form.Select
                                                    disabled={!isAdmin}
                                                    name="functionId"
                                                    value={values.functionId}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    {functions.length === 0 ? (
                                                        <option value="" disabled hidden>
                                                            Add a new function (empty list)
                                                        </option>
                                                    ) : (
                                                        <option value="" disabled hidden>
                                                            Choose a function...
                                                        </option>
                                                    )}
                                                    {functions.map((func) => (
                                                        <option key={func.id} value={func.id}>{func.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            {isAdmin &&
                                                <Col md={2} className="text-end">
                                                    <Button onClick={() => setAddModal(true)} variant="success">
                                                        +
                                                    </Button>
                                                </Col>}
                                        </Row>

                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridyNetSalary">
                                        <Form.Label>Net Salary (no meal)</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            name="netSalary"
                                            value={values.netSalary}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="unavailable"
                                            isInvalid={!!errors.netSalary}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.netSalary}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridMealTicketValue">
                                        <Form.Label>Meal Ticket Value</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="number"
                                            name="mealTicketValue"
                                            value={values.mealTicketValue}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="30"
                                            isInvalid={!!errors.mealTicketValue}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.mealTicketValue}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridVacationDays">
                                        <Form.Label>Vacation days</Form.Label>
                                        <Form.Control
                                            disabled={!isAdmin}
                                            type="number"
                                            name="vacationDays"
                                            value={values.vacationDays}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="21"
                                            isInvalid={!!errors.vacationDays}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.vacationDays}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridTaxExempt">
                                    <Form.Check
                                        disabled={!isAdmin}
                                        type="switch"
                                        label="Tax exempt"
                                        name="taxExempt"
                                        checked={values.taxExempt}
                                        value={values.taxExempt}
                                        onChange={() => setFieldValue('taxExempt', !values.taxExempt)}
                                        onBlur={handleBlur}>
                                    </Form.Check>
                                </Form.Group>

                                <Button hidden={!isAdmin} variant="primary" type="submit">
                                    Save changes
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <FunctionAdd show={addModal} onHide={() => setAddModal(false)}/>
                </Container>) : (<LoadingScreen/>)}
        </>

    );
}

export default FunctionData;