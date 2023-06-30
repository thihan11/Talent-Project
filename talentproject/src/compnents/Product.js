import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddProdcut } from '../functions/AddProduct';
import { EditProdcut } from '../functions/EditProduct';
import { Button, ButtonToolbar } from 'react-bootstrap';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('https://localhost:7027/api/Products')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
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

    deletProduct(productid) {
        if (window.confirm("Proceed to DELETE ?")) {
            fetch('https://localhost:7027/api/Products/' + productid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { products, productid, name, price } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <br></br>
                <ButtonToolbar>
                    <Button variant='dark'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Create Product</Button>

                    <AddProdcut show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr width={'auto'}>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prodcut =>
                            <tr key={prodcut.id}>
                                <td>{prodcut.id}</td>
                                <td>{prodcut.name}</td>
                                <td>{prodcut.price}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='dark'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                productid: prodcut.id, name: prodcut.name, price: prodcut.price
                                            })}>
                                            Edit
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.deletProduct(prodcut.id)}>
                                            Delete
                                        </Button>


                                    </ButtonToolbar>
                                </td>
                            </tr>)}

                    </tbody>

                </Table>

                <EditProdcut show={this.state.editModalShow}
                    onHide={editModalClose}
                    id={productid}
                    name={name}
                    price={price} />
            </div>
        )
    }
}


export default Product;