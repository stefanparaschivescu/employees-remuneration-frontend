import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DatePicker} from "react-rainbow-components";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import UserService from "../services/user.service";

function PersonalData(props) {
    const currentUser = useContext(UserContext);

    const [userId, setUserId] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [dateOfBirth, setDateOfBirth] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [gender, setGender] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [married, setMarried] = useState(undefined);

    useEffect(() => {
        (props.id) ? setUserId(props.id) : setUserId(currentUser.id);

        if (userId) {
            UserService.getUserById(userId)
                .then(response => {
                    const user = response.data;
                    setFirstName(user.hasOwnProperty("firstName") ? user.firstName : undefined);
                    setLastName(user.hasOwnProperty("lastName") ? user.lastName : undefined);
                    setDateOfBirth(user.hasOwnProperty("dateOfBirth") ? user.dateOfBirth : undefined);
                    setPhoneNumber(user.hasOwnProperty("phoneNumber") ? user.phoneNumber : undefined);
                    setGender(user.hasOwnProperty("gender") ? user.gender : undefined);
                    setAddress(user.hasOwnProperty("address") ? user.address : undefined);
                    setMarried(user.hasOwnProperty("married") ? user.married : undefined);
                })
                .catch(err => console.log(err));
        }

    }, [currentUser.id, props.id, userId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = {
            ...firstName && {firstName: firstName},
            ...lastName && {lastName: lastName},
            ...dateOfBirth && {dateOfBirth: dateOfBirth},
            ...phoneNumber && {phoneNumber: phoneNumber},
            ...gender && {gender: gender},
            ...address && {address: address},
            ...married && {married: married}
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
        <Container className={props.className}>
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

                <Button variant="primary" type="submit">
                    Save changes
                </Button>
            </Form>
        </Container>
    );
}

export default PersonalData;