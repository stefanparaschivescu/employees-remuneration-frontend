import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import RequestService from "../services/request.service";
import {Button, Container, Table} from "react-bootstrap";
import {FiCheck} from "react-icons/fi";
import {AiFillCloseCircle} from "react-icons/ai";
import RejectMessage from "./RejectMessage";
import LoadingScreen from "./LoadingScreen";

function BenefitRequests(props) {
    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser?.role.name === "admin");
    const [statusModal, setStatusModal] = useState(false);
    const [benefits, setBenefits] = useState([]);
    const [selectedBenefitId, setSelectedBenefitId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        RequestService.getBenefits()
            .then((response) => {
                let benefitsArray = []
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].accepted === false && response.data[i].message === "") {
                        benefitsArray.push(response.data[i]);
                    }
                }

                setBenefits(benefitsArray);
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
                    {benefits.length !== 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Benefit name</th>
                                <th>Benefit cost</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {benefits.map((benefit) => (<tr key={benefit.id}>
                                <td>{benefits.indexOf(benefit) + 1}</td>
                                <td>{benefit.employeeId.firstName}</td>
                                <td>{benefit.employeeId.lastName}</td>
                                <td>{benefit.benefitId.name}</td>
                                <td>{benefit.benefitId.cost}</td>
                                <td>
                                    <Button className="me-2" variant="success"
                                            onClick={() => {
                                                handleAccept(benefit.id);
                                            }}>
                                        <FiCheck/>
                                    </Button>
                                    <Button className="me-2" variant="danger"
                                            onClick={() => {
                                                setSelectedBenefitId(benefit.id);
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
                            <p>There are no new benefit requests. Check again later.</p>
                        </>
                    )}
                    <RejectMessage requestid={selectedBenefitId}
                                   show={statusModal}
                                   onHide={() => setStatusModal(false)}/>
                </> : <h1>You don't have admin rights.</h1>}
            </Container>) : (<LoadingScreen/>)}</>
    );
}

export default BenefitRequests;