import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import EmployeeEdit from "./EmployeeEdit";
import UserService from "../services/user.service";
import {UserContext} from "../App";
import EmployeeAdd from "./EmployeeAdd";
import LoadingScreen from "./LoadingScreen";

function EmployeesTable(props) {
    const currentUser = useContext(UserContext);

    const isAdmin = (currentUser?.role.name === "admin");
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        UserService.getUsers()
            .then((response) => {
                setEmployees(response.data);
                setIsLoading(false);
            })
    }, []);

    const handleDelete = (id) => {
        UserService.deleteUserById(id)
            .then((response) => {
                alert(response.data.message);
                window.location.reload();
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                console.log(resMessage);
            })
    }

    return (<>
            {!isLoading ? (
                <Container className="overflow-auto">
                    {isAdmin ? <>
                        <div className="mb-3 text-center">
                            <Button onClick={() => setAddModal(true)} variant="success">
                                Add new employee
                            </Button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Function</th>
                                <th>Gross Salary</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee) => (<tr key={employee.id}>
                                <td>{employees.indexOf(employee) + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.hasOwnProperty("functionId") ? employee.functionId.name : ""}</td>
                                <td>{employee.grossSalary}</td>
                                <td>
                                    <Button className="me-2" variant="primary"
                                            onClick={() => {
                                                setEditModal(true);
                                                setSelectedUserId(employee.id);
                                            }}>
                                        <FaEdit/>
                                    </Button>
                                    <Button className="me-2" variant="danger"
                                            onClick={() => handleDelete(employee.id)}
                                    ><MdDelete/></Button>
                                </td>
                            </tr>))}
                            </tbody>
                        </Table>
                        <EmployeeEdit userid={selectedUserId} show={editModal} onHide={() => setEditModal(false)}/>
                        <EmployeeAdd new={"true"} company={currentUser?.companyId} show={addModal}
                                     onHide={() => setAddModal(false)}/>
                    </> : <h1>You don't have admin rights.</h1>}
                </Container>
            ) : (<LoadingScreen/>)}
        </>
    );
}

export default EmployeesTable;