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
        grossSalary: yup.number()
            .min(2000, "*Gross salary must be at least 2000 RON")
            .required(),
        netSalary: yup.number()
            .min(1000, "*Net salary must be at least 1000 RON"),
        mealTicketValue: yup.number()
            .min(10, "*Meal ticket value must be at least 10 RON")
            .required(),
        taxExempt: yup.boolean(),
        internalNumber: yup.number()
            .required()
    });

    const initialSchema = {
        companyName: "",
        email: "",
        grossSalary: "",
        netSalary: "",
        mealTicketValue: "",
        taxExempt: false,
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
                        grossSalary: user.grossSalary ? user.grossSalary : "",
                        netSalary: user.netSalary ? user.netSalary : "",
                        mealTicketValue: user.mealTicketValue ? user.mealTicketValue : "",
                        taxExempt: user.hasOwnProperty("taxExempt") ? user.taxExempt : false,
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
            ...values.grossSalary && {grossSalary: values.grossSalary},
            ...values.netSalary && {netSalary: values.netSalary},
            ...values.mealTicketValue && {mealTicketValue: values.mealTicketValue},
            taxExempt: values.taxExempt,
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
                                        <Form.Label>Total Salary</Form.Label>
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

                                    {/*<Form.Group as={Col} controlId="formGridFunction">*/}
                                    {/*    <Form.Label>Function</Form.Label>*/}
                                    {/*    <Form.Select disabled={!isAdmin}>*/}
                                    {/*        <option value="" disabled hidden>Choose...</option>*/}
                                    {/*        <option value="1">Option1</option>*/}
                                    {/*        <option value="2">Option2</option>*/}
                                    {/*    </Form.Select>*/}
                                    {/*</Form.Group>*/}
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridyNetSalary">
                                        <Form.Label>Net Salary</Form.Label>
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
                </Container>) : (<LoadingScreen/>)}
        </>

    );
}

export default FunctionData;