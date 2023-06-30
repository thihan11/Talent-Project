import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddStore } from '../functions/AddStore';
import { EditStore } from '../functions/EditStore';
import { Button, ButtonToolbar } from 'react-bootstrap';

export class Store extends Component {
    constructor(props) {
        super(props);
        this.state = { stores: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('https://localhost:7027/api/Stores')
            .then(response => response.json())
            .then(data => {
                this.setState({ stores: data });
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

    deletStore(storeid) {
        if (window.confirm("Proceed to DELETE ?")) {
            fetch('https://localhost:7027/api/Stores/' + storeid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { stores, storeid, name, address } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <br></br>
                <ButtonToolbar>
                    <Button variant='dark'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Create Store</Button>

                    <AddStore show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Store ID</th>
                            <th>Store Name</th>
                            <th>Adress</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store =>
                            <tr key={store.id}>
                                <td>{store.id}</td>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='dark'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                storeid: store.id, name: store.name, address: store.address
                                            })}>
                                            Edit
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.deletStore(store.id)}>
                                            Delete
                                        </Button>


                                    </ButtonToolbar>
                                </td>
                            </tr>)}

                    </tbody>

                </Table>

                <EditStore show={this.state.editModalShow}
                    onHide={editModalClose}
                    id={storeid}
                    name={name}
                    address={address} />
            </div>
        )
    }
}


export default Store;