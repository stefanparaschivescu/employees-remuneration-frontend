import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import FunctionService from "../services/function.service";

function FunctionAdd(props) {
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required("*A name for the function is required.")
    });

    const initialSchema = {
        name: ""
    };

    const handleSubmit = (values) => {
        const userObject = {
            ...values.name && {name: values.name},
        };

        FunctionService.createFunction(userObject)
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
                    Add new function
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialSchema}
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
                        <Form className="w-50" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Function name"
                                    isInvalid={!!errors.name}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
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


export default FunctionAdd;