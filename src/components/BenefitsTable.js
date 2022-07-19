import {Button, Container, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import RequestService from "../services/request.service";
import LoadingScreen from "./LoadingScreen";
import BenefitAdd from "./BenefitAdd";
import {MdDoneOutline} from "react-icons/md";
import {FcCancel} from "react-icons/fc";
import {BsHourglassSplit} from "react-icons/bs";
import BenefitRequest from "./BenefitRequest";

function BenefitsTable(props) {
    const currentUser = useContext(UserContext);

    const id = currentUser?.id;
    const [addModal, setAddModal] = useState(false);
    const [requestModal, setRequestModal] = useState(false);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        RequestService.getBenefitsByUserId(id)
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
                <Container className="overflow-auto">
                    <div className="mb-3">
                        <Button className="me-2" onClick={() => setAddModal(true)} variant="success">
                            Add new benefit
                        </Button>
                        <Button onClick={() => setRequestModal(true)}>
                            Request a benefit
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Benefit name</th>
                            <th>Cost</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request) => (<tr key={request.id}>
                            <td>{requests.indexOf(request) + 1}</td>
                            <td>{request.benefitId.name}</td>
                            <td>{request.benefitId.cost}</td>
                            <td>{(request.accepted && request.message === "") && <MdDoneOutline/>}
                                {(!request.accepted && request.message === "") && <BsHourglassSplit/>}
                                {(!request.accepted && request.message !== "") && (<><FcCancel/> {"              " +
                                    request.message}</>)}
                            </td>
                        </tr>))}
                        </tbody>
                    </Table>
                    <BenefitAdd new={true} company={currentUser?.companyId} show={addModal}
                                onHide={() => setAddModal(false)}/>
                    <BenefitRequest employeeId={id} requests={requests} show={requestModal}
                                onHide={() => setRequestModal(false)}/>
                </Container>
            ) : (<LoadingScreen/>)}
        </>
    )
}

export default BenefitsTable;