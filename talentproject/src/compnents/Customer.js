import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddCustomer } from '../functions/AddCustomer';
import { EditCustomer } from '../functions/EditCustomer';
import { Button, ButtonToolbar } from 'react-bootstrap';


export class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = { custs: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('https://localhost:7027/api/Customers')
            .then(response => response.json())
            .then(data => {
                this.setState({ custs: data });
            })
            .catch(error => {
                console.error('Error fetching datat', error);
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deletCust(custid) {
        if (window.confirm("Proceed to DELETE ?")) {
            fetch('https://localhost:7027/api/Customers/' + custid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { custs, custid, name, address } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <br></br>
                <ButtonToolbar>
                    <Button variant='dark'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Create Customer</Button>

                    <AddCustomer show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr width={'auto'}>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Adress</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {custs.map(cust =>
                            <tr key={cust.id}>
                                <td>{cust.id}</td>
                                <td>{cust.name}</td>
                                <td>{cust.address}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='dark'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                custid: cust.id, name: cust.name, address: cust.address
                                            })}>
                                            Edit
                                        </Button>


                                    </ButtonToolbar>
                                </td>

                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.deletCust(cust.id)}>
                                            Delete
                                        </Button>


                                    </ButtonToolbar>
                                </td>
                            </tr>)}

                    </tbody>

                </Table>

                <EditCustomer show={this.state.editModalShow}
                    onHide={editModalClose}
                    id={custid}
                    name={name}
                    address={address} />
            </div>
        )
    }
}

export default Customer;