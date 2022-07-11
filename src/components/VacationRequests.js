import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {UserContext} from "../App";
import {FiCheck} from "react-icons/fi";
import {AiFillCloseCircle} from "react-icons/ai";
import RejectMessage from "./RejectMessage";
import RequestService from "../services/request.service";
import LoadingScreen from "./LoadingScreen";

function VacationRequests(props) {
    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser?.role.name === "admin");
    const [statusModal, setStatusModal] = useState(false);
    const [vacations, setVacations] = useState([]);
    const [selectedVacationId, setSelectedVacationId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        RequestService.getVacations()
            .then((response) => {
                let vacationsArray = []
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].accepted === false && response.data[i].message === "") {
                        vacationsArray.push(response.data[i]);
                    }
                }

                setVacations(vacationsArray);
                setIsLoading(false);
            })
    }, []);

    const handleAccept = (id) => {
        RequestService.updateRequestById(id, {
            accepted: "true",
            message: ""
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
    }

    return (
        <>
            {!isLoading ? (<Container className="overflow-auto">
                {isAdmin ? <>
                    {vacations.length !== 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Vacation type</th>
                                <th>Start date</th>
                                <th>No. of days</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vacations.map((vacation) => (<tr key={vacation.id}>
                                <td>{vacations.indexOf(vacation) + 1}</td>
                                <td>{vacation.employeeId.firstName}</td>
                                <td>{vacation.employeeId.lastName}</td>
                                <td>{vacation.vacationId.vacationType}</td>
                                <td>{vacation.vacationId.startingDate.split("T")[0]}</td>
                                <td>{vacation.vacationId.days}</td>
                                <td>
                                    <Button className="me-2" variant="success"
                                            onClick={() => {
                                                handleAccept(vacation.id);
                                            }}>
                                        <FiCheck/>
                                    </Button>
                                    <Button className="me-2" variant="danger"
                                            onClick={() => {
                                                setSelectedVacationId(vacation.id);
                                                setStatusModal(true);
                                            }}
                                    ><AiFillCloseCircle/></Button>
                                </td>
                            </tr>))}
                            </tbody>
                        </Table>
                    ) : (
                        <>
                            <h2>List of requests is empty.</h2>
                            <p>There are no new vacation requests. Check again later.</p>
                        </>
                    )}
                    <RejectMessage requestid={selectedVacationId}
                                   show={statusModal}
                                   onHide={() => setStatusModal(false)}/>
                </> : <h1>You don't have admin rights.</h1>}
            </Container>) : (<LoadingScreen/>)}</>

    );
}

export default VacationRequests;