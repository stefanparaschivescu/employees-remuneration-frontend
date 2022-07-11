import {Table} from "react-bootstrap";

function NetSalaryTable(props) {
    return (
        <>
            <h3 hidden={props.hidden}>Net salary components</h3>
            <Table hidden={props.hidden} striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Percent</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>CAS</td>
                    <td>25%</td>
                    <td>{props.cas}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>CASS</td>
                    <td>10%</td>
                    <td>{props.cass}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Taxes</td>
                    <td>{props.taxesPercent}</td>
                    <td>{props.taxes}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Meal tickets</td>
                    <td>{props.ticketsNumber}</td>
                    <td>{props.ticketsValue}</td>
                </tr>
                {props.employerTax &&
                    <tr>
                        <td>5</td>
                        <td>Employer taxes</td>
                        <td>2.25%</td>
                        <td>{props.employerTax}</td>
                    </tr>
                }
                <tr>
                    {props.employerTax === undefined ?
                    <td>5</td> : <td>6</td>}
                    <td colSpan={2}>Net salary</td>
                    <td>{props.netSalary}</td>
                </tr>
                </tbody>
            </Table>
        </>
    )
}

export default NetSalaryTable;