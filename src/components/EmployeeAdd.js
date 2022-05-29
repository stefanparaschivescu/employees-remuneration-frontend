import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {DatePicker} from "react-rainbow-components";
import {useState} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import UserService from "../services/user.service";

function EmployeeAdd(props) {
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const validationSchema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        dateOfBirth: yup.date()
            .max(new Date()),
        phoneNumber: yup.string()
            .matches(phoneRegExp, "*Phone number is not valid"),
        gender: yup.boolean(),
        address: yup.string()
            .required("*Address is required"),
        married: yup.boolean(),
        email: yup.string()
            .email("*Must be a valid email address")
            .max(50, "*Email must be less than 50 characters")
            .required("*Email is required"),
        password: yup.string()
            .required("*A default password is required in order to add a new employee"),
        salary: yup.number()
            .min(2000)
            .required(),
        internalNumber: yup.number()
            .required()
    });

    const initialSchema = {
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        phoneNumber: "",
        gender: "",
        address: "",
        married: "",
        email: "",
        password: "",
        salary: "",
        internalNumber: ""
    };

    const [initialValues, setInitialValues] = useState(initialSchema);

    const handleSubmit = (values) => {
        const userObject = {
            ...values.firstName && {firstName: values.firstName},
            ...values.lastName && {lastName: values.lastName},
            ...values.dateOfBirth && {dateOfBirth: values.dateOfBirth},
            ...values.phoneNumber && {phoneNumber: values.phoneNumber},
            ...values.gender && {gender: values.gender},
            ...values.address && {address: values.address},
            ...values.married && {married: values.married},
            ...values.email && {emailAddress: values.email},
            ...values.salary && {salary: values.salary},
            ...values.internalNumber && {internalNumber: values.internalNumber}
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
                                    <DatePicker
                                        name="dateOfBirth"
                                        value={values.dateOfBirth}
                                        onChange={(value) => setFieldValue("dateOfBirth", new Date(value))}
                                        error={errors.dateOfBirth && errors.dateOfBirth.split("T")[0]}/>
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
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Default Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                        isInvalid={!!errors.password}/>
                                    <Form.Control.Feedback
                                        type="invalid">{errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange = {handleChange}
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
                            </Row>

                            <Button variant="primary" type="submit">
                                Save changes
                            </Button>
                        </Form>)}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}


export default EmployeeAdd;