import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import RequestService from "../services/request.service";

function RejectMessage(props) {
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        RequestService.updateRequestById(props.requestid, {
            message: reason,
            accepted: "false"
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
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a reason for refusing the request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control as="textarea" rows={3}
                                      onChange={(e) => setReason(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Refuse request and save reason
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default RejectMessage