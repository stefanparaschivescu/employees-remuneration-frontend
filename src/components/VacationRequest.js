import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import VacationService from "../services/vacation.service";
import RequestService from "../services/request.service";
import {DatePicker} from "react-rainbow-components";
import moment from "moment";

function calculateRemainingDays(totalDays, vacationRequests) {
    let days = 0;
    for (let i = 0; i < vacationRequests.length; i++) {
        if (vacationRequests[i].vacationId.vacationType === "paid" && vacationRequests[i].accepted === true)
            days += vacationRequests[i].vacationId.days;
    }
    return totalDays - days;
}

function VacationRequest(props) {
    const [vacationRequests, setVacationRequests] = useState([]);
    const [remainingVacationDays, setRemainingVacationDays] = useState();
    const [startingDate, setStartingDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [days, setDays] = useState(0);
    const [vacationType, setVacationType] = useState("paid");

    useEffect(() => {
        RequestService.getVacationsByUserId(props.employeeId)
            .then(object => {
                let vacationsArray = []
                for (let i = 0; i < object.data.length; i++) {
                    vacationsArray.push(object.data[i]);
                }

                setVacationRequests(vacationsArray);
                const remainingDays = calculateRemainingDays(props.vacationDays, vacationRequests);
                setRemainingVacationDays(remainingDays);
            })
    }, [props.employeeId, props.vacationDays, vacationRequests]);

    const handleSubmit = (e) => {
        e.preventDefault();

        VacationService.createVacation({
            startingDate: startingDate,
            days: days,
            vacationType: vacationType
        }).then(response => {
            RequestService.createRequest({
                employeeId: props.employeeId,
                vacationId: response.data.id
            })
                .then((response) => {
                    window.location.reload();
                }, (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);
                })
        }).catch(err => {
            alert(err);
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
                    Add new vacation request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Remaining days no. : {remainingVacationDays}</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDays">
                            <Form.Label>Days</Form.Label>
                            <Form.Control
                                type="number" value={days}
                                min={"0"} max={String(remainingVacationDays)}
                                onChange={(e) =>
                                    setDays(parseInt(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridVacationType">
                            <Form.Label>Vacation type</Form.Label>
                            <Form.Select
                                value={vacationType}
                                onChange={(e) => setVacationType(e.target.value)}
                            >
                                <option value="" disabled hidden>Choose vacation type...</option>
                                <option value="paid">PAID</option>
                                <option value="unpaid">UNPAID</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridStartingDate">
                        <Form.Label>Starting date</Form.Label>
                        <DatePicker
                            value={startingDate}
                            onChange={value => setStartingDate(moment(value).format("YYYY-MM-DD"))}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Initialize request
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default VacationRequest;