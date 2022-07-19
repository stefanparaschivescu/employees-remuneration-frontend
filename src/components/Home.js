import {Col, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {UserContext} from "../App";
import SalaryBarChart from "./SalaryBarChart";
import SeniorityDoughnutChart from "./SeniorityDoughnutChart";
import {Link} from "react-router-dom";
import VacationRequests from "./VacationRequests";
import VacationsTable from "./VacationsTable";
import BenefitsTable from "./BenefitsTable";


function Home(props) {
    const currentUser = useContext(UserContext);
    const isAdmin = (currentUser?.role.name === "admin");

    return (
        <Container className={props.className}>
            {currentUser ?
                (
                    <>
                        <h3 className="mb-5">Welcome {(currentUser.firstName && currentUser.lastName) ?
                            currentUser.firstName + " " + currentUser.lastName : currentUser.emailAddress} !</h3>
                        {isAdmin ? (
                            <>
                                <Row className="mb-5">
                                    <Col><SalaryBarChart/></Col>
                                    <Col><SeniorityDoughnutChart/></Col>
                                </Row>
                                <h4 className="mt-5 mb-3">Quick check for PENDING vacation requests</h4>
                                <VacationRequests/>
                            </>
                        ) : (
                            <>
                                <h3 className="mb-3">Vacation requests</h3>
                                <VacationsTable className="mb-5"/>
                                <h3 className="mb-3">Active or pending benefits</h3>
                                <BenefitsTable/>
                            </>
                        )}
                    </>
                )
                :
                (<>
                    <h3>Welcome on SalaryApp! Here you can manage your company
                        and all the financial expenses.</h3>
                    <h5>Please{" "}
                        <Link to="/signup">signup</Link> or{" "}
                        <Link to="/login">login</Link>
                    </h5>
                </>)}
        </Container>
    );
}

export default Home;