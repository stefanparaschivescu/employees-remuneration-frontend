import {Container} from "react-bootstrap";
import {useContext} from "react";
import {UserContext} from "../App";

function Home(props) {
    const currentUser = useContext(UserContext);

    return (
        <Container className={props.className}>
            <h3>{currentUser ?
                (<>Welcome {currentUser.emailAddress} !</>) :
                (<>Welcome on SalaryApp! Here you can manage your company
                    and all the financial expenses.</>)}</h3>
        </Container>
    );
}

export default Home;