import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//import { AddCustomer } from '../functions/AddCustomer';
// import { EditCustomer } from '../functions/EditCustomer';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSale } from '../functions/AddSale';
import { EditSale } from '../functions/EditSale';

export class Sale extends Component {


    constructor(props) {
        super(props);
        this.state = { sales: [] }
    }

    refreshList() {
        fetch('https://localhost:7027/api/Sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
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

    deleteSale(saleid) {
        if (window.confirm("Proceed to DELETE ?")) {
            fetch('https://localhost:7027/api/Sales/' + saleid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { sales, saleid, custname, productname,storename} = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <br></br>
                {<ButtonToolbar>
                    <Button variant='dark'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Create Sale</Button>

                    <AddSale show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>}

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr width={'auto'}>
                            <th>Store ID</th>
                            <th>Customer Name</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale =>
                            <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.product.name}</td>
                                <td>{sale.store.name}</td>
                                <td>{new Date(sale.dateSold).toLocaleDateString()}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='dark'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                saleid: sale.id, custname: sale.customer.name, productname: sale.product.name,storename: sale.store.name})}
                                        >
                                            Edit
                                        </Button>


                                    </ButtonToolbar>
                                </td>

                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='danger'
                                        onClick={() => this.deleteSale(sale.id)}>
                                            Delete
                                        </Button>


                                    </ButtonToolbar>
                                </td>
                            </tr>)}

                    </tbody>

                </Table>

                {<EditSale show={this.state.editModalShow}
                    onHide={editModalClose}
                    id={saleid}
                    custname={custname}
                    productname={productname}
                    storename={storename} />}
            </div>
        )
    }
}


export default Sale;