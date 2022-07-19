import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DatePicker} from "react-rainbow-components";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {Formik} from "formik";
import * as yup from "yup";
import UserService from "../services/user.service";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";

function PersonalData(props) {
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const validationSchema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        dateOfBirth: yup.date()
            .max(moment(new Date()).format("YYYY-MM-DD")),
        phoneNumber: yup.string()
            .matches(phoneRegExp, "*Phone number is not valid"),
        gender: yup.boolean(),
        address: yup.string()
            .required("*Address is required"),
        married: yup.boolean(),
        IBAN: yup.string(),
        BIC: yup.string()
    });

    const initialSchema = {
        firstName: "",
        lastName: "",
        dateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
        phoneNumber: "",
        gender: "",
        address: "",
        married: "",
        IBAN: "",
        BIC: ""
    }

    const currentUser = useContext(UserContext);

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
                        firstName: user.firstName ? user.firstName : "",
                        lastName: user.lastName ? user.lastName : "",
                        dateOfBirth: user.dateOfBirth !== undefined ?
                            moment(user.dateOfBirth).format("YYYY-MM-DD") :
                            moment(new Date()).format("YYYY-MM-DD"),
                        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                        gender: user.hasOwnProperty("gender") ? user.gender : "",
                        address: user.address ? user.address : "",
                        married: user.hasOwnProperty("married") ? user.married : "",
                        IBAN: user.IBAN ? user.IBAN : "",
                        BIC: user.BIC ? user.BIC : "",
                    }
                    setInitialValues(userObject);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }

    }, [currentUser.id, props.id, userId]);

    const handleSubmit = (values) => {
        const userObject = {
            ...values.firstName && {firstName: values.firstName},
            ...values.lastName && {lastName: values.lastName},
            ...values.dateOfBirth && {dateOfBirth: values.dateOfBirth},
            ...values.phoneNumber && {phoneNumber: values.phoneNumber},
            ...values.gender && {gender: values.gender},
            ...values.address && {address: values.address},
            ...values.married && {married: values.married},
            ...values.IBAN && {IBAN: values.IBAN},
            ...values.BIC && {BIC: values.BIC}
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
                              handleSubmit,
                              setFieldValue,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Firstname"
                                            isInvalid={!!errors.firstName}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Lastname"
                                            isInvalid={!!errors.lastName}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridBirthday">
                                        <Form.Label>Date of birth</Form.Label>
                                        {props.insideModal ? (
                                            <>
                                                <Form.Control
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={values.dateOfBirth}
                                                    onChange={handleChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.dateOfBirth && errors.dateOfBirth.split("T")[0]}
                                                </Form.Control.Feedback>
                                            </>
                                        ) : (
                                            <DatePicker
                                                name="dateOfBirth"
                                                value={values.dateOfBirth}
                                                onChange={(value) =>
                                                    setFieldValue("dateOfBirth", moment(value).format("YYYY-MM-DD"))}
                                                error={errors.dateOfBirth && errors.dateOfBirth.split("T")[0]}/>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="+40..."
                                            isInvalid={!!errors.phoneNumber}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Street, 4, City, State"
                                            isInvalid={!!errors.address}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridMarriage">
                                        <Form.Label>Married</Form.Label>
                                        <Form.Select
                                            name="married"
                                            value={values.married}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="" disabled hidden>Choose...</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridIBAN">
                                        <Form.Label>IBAN</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="IBAN"
                                            value={values.IBAN}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="RO35BTRLRONCRT2952912"
                                            isInvalid={!!errors.IBAN}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.IBAN}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridBIC">
                                        <Form.Label>BIC</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="BIC"
                                            value={values.BIC}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="SWIFT CODE"
                                            isInvalid={!!errors.BIC}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.BIC}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Button variant="primary" type="submit">
                                    Save changes
                                </Button>
                            </Form>)}
                    </Formik>
                </Container>
            ) : (<LoadingScreen/>)}
        </>
    );
}

export default PersonalData;