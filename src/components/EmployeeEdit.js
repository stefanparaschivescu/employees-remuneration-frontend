import {Modal} from "react-bootstrap";
import EmployeeData from "./EmployeeData";

function EmployeeEdit(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmployeeData insideModal={true} userid={props.userid}/>
            </Modal.Body>
        </Modal>
    );
}

export default EmployeeEdit;
