import {Container, Spinner} from "react-bootstrap";

function LoadingScreen() {
    return (
        <Container className="align-items-center text-center">
            <div><Spinner animation="grow"/></div>
            Loading..
        </Container>
    );
}

export default LoadingScreen;