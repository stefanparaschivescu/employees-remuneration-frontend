import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import BenefitService from "../services/benefit.service";
import RemoveFromArrayUtil from "../util/remove.util";
import RequestService from "../services/request.service";

function BenefitRequest(props) {
    const employeeId = props.employeeId;

    const [benefits, setBenefits] = useState([]);
    const [selectedBenefit, setSelectedBenefit] = useState(undefined);

    useEffect(() => {
        BenefitService.getBenefits()
            .then(object => {
                let benefitsArray = []
                for (let i = 0; i < object.data.length; i++) {
                    benefitsArray.push(object.data[i]);
                }
                for (let i = 0; i < props.requests.length; i++) {
                    if (props.requests[i].accepted === true ||
                        (props.requests[i].accepted === false && props.requests[i].message === "")) {
                        benefitsArray = RemoveFromArrayUtil
                            .remove(benefitsArray, "id", props.requests[i].benefitId._id);
                    }
                }

                setBenefits(benefitsArray);
            })
    }, [props.requests])

    const handleSubmit = () => {
        RequestService.createRequest({
            employeeId: employeeId,
            benefitId: selectedBenefit
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
                    Add new benefit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select a benefit from the list">
                        <Form.Select aria-label="Floating label select"
                                     value={String(selectedBenefit)}
                                     onChange={(e) => setSelectedBenefit(e.target.value)}
                        >
                            <option value="">Choose a benefit...</option>
                            {benefits.map((benefit) => (
                                <option key={benefit.id} value={benefit.id}>{benefit.name +
                                    " - Cost: " + benefit.cost}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>

                    <Button variant="primary" type="submit">
                        Initialize request
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default BenefitRequest;