import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import BenefitService from "../services/benefit.service";

function BenefitAdd(props) {
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required("*A name for the benefit is required."),
        cost: yup.number()
            .min(0, "*Benefit should have a cost of at least 0.")
            .max(500, "*Benefit should have a cost of maximum 500.")
            .required()
    });

    const initialSchema = {
        name: "",
        cost: ""
    };

    const [initialValues, setInitialValues] = useState(initialSchema);

    const handleSubmit = (values) => {
        const userObject = {
            ...values.name && {name: values.name},
            ...values.cost && {cost: values.cost}
        };

        BenefitService.createBenefit(userObject)
            .then(() => {
                    window.location.reload();
                },
                (error) => {
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
                <Formik initialValues={initialValues}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}>
                    {({
                          values,
                          errors,
                          handleChange,
                          handleBlur,
                          handleSubmit
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Name"
                                    isInvalid={!!errors.name}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridCost">
                                <Form.Label>Cost of the benefit</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cost"
                                    value={values.cost}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="100"
                                    isInvalid={!!errors.cost}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cost}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save changes
                            </Button>
                        </Form>)}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}


export default BenefitAdd;