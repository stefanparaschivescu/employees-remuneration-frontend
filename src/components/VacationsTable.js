import {Button, Container, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import RequestService from "../services/request.service";
import LoadingScreen from "./LoadingScreen";
import {MdDoneOutline} from "react-icons/md";
import {FcCancel} from "react-icons/fc";
import {BsHourglassSplit} from "react-icons/bs";
import VacationRequest from "./VacationRequest";

function BenefitsTable(props) {
    const currentUser = useContext(UserContext);

    const id = currentUser?.id;
    const vacationDays = currentUser?.vacationDays;
    const [requestModal, setRequestModal] = useState(false);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        RequestService.getVacationsByUserId(id)
            .then((response) => {
                let requests = [];

                for (let i = 0; i < response.data.length; i++) {
                    requests.push(response.data[i]);
                }
                setRequests(requests);
                setIsLoading(false);
            })
    }, [id]);

    return (
        <>
            {!isLoading ? (
                <Container className={"overflow-auto " + props.className}>
                    <div className="mb-3">
                        <Button onClick={() => setRequestModal(true)}>
                            Request new vacation
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Starting date</th>
                            <th>Type</th>
                            <th>Days</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request) => (<tr key={request.id}>
                            <td>{requests.indexOf(request) + 1}</td>
                            <td>{request.vacationId.startingDate.split("T")[0]}</td>
                            <td>{request.vacationId.vacationType}</td>
                            <td>{request.vacationId.days}</td>
                            <td>{(request.accepted && request.message === "") && <MdDoneOutline/>}
                                {(!request.accepted && request.message === "") && <BsHourglassSplit/>}
                                {(!request.accepted && request.message !== "") && (<><FcCancel/> "{request.message}"</>)}
                            </td>
                        </tr>))}
                        </tbody>
                    </Table>
                    <VacationRequest employeeId={id} vacationDays={vacationDays}
                                     requests={requests} show={requestModal}
                                     onHide={() => setRequestModal(false)}/>
                </Container>
            ) : (<LoadingScreen/>)}
        </>
    )
}

export default BenefitsTable;