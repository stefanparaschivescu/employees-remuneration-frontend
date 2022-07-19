import {useContext, useState} from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import PersonalData from "./PersonalData";
import FunctionData from "./FunctionData";
import {UserContext} from "../App";

function EmployeeData(props) {
    const [key, setKey] = useState("personal");
    const currentUser = useContext(UserContext);

    return (
        <Container>
            {currentUser !== undefined ?
                (<Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="personal" title="Personal Data">
                        <PersonalData insideModal={props.insideModal} id={props.userid}/>
                    </Tab>
                    <Tab eventKey="function" title="Function-related Data">
                        <FunctionData id={props.userid}/>
                    </Tab>
                </Tabs>) : (<h1>You are not logged in. Please login after registration.</h1>)}
        </Container>
    );
}

export default EmployeeData;