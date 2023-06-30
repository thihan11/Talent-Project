import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
        customers: [], products:[], stores:[],
        selectCustomer:'', selectProduct:'',selectStore:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCustomer = this.handleCustomer.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleStore = this.handleStore.bind(this);

  }

  componentDidMount(){
    this.fetchCustomers();
    this.fetchProducts();
    this.fetchStores();
  }

  fetchCustomers() {
    fetch('https://localhost:7027/api/Customers')
      .then(response => response.json())
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }

  fetchStores() {
    fetch('https://localhost:7027/api/Stores')
      .then(response => response.json())
      .then(data => {
        this.setState({ stores: data });
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  }

  fetchProducts() {
    fetch('https://localhost:7027/api/Products')
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  handleCustomer(event){
    this.setState({selectCustomer: event.target.value});
  }
  
  handleProduct(event){
    this.setState({selectProduct: event.target.value});
  }
  
  handleStore(event){
    this.setState({selectStore: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    const { selectCustomer, selectProduct, selectStore } = this.state;
    const sale = {
      customerId: selectCustomer,
      productId: selectProduct,
      storeId: selectStore,
      dateSold: new Date().toISOString() // Set the current date as the sold date
    };

    fetch('https://localhost:7027/api/Sales',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(sale)
    }) .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to create Sale.');
      }
    })
    .then(data => {
      if (data && data.errors) {
        console.log('Validation errors:', data.errors);
        alert('Validation errors occurred. Please check your input.');
      } else {

        setTimeout(() => {
          alert('Sale created successfully.');
        }, 200);
      }
    })
    .catch(error => {
      console.error('Error creating sale:', error);
      if (error instanceof TypeError) {
        alert('Network error occurred. Please check your connection.');
      } else {
        alert('An error occurred. Please try again.');
      }
    });
  }
  
  render() {
    const {customers, products, stores} = this.state;
    return (
      <div className="container">

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Sale
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="CustomerName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.selectCustomer}
                      onChange={this.handleCustomer}
                    >
                      <option value="">Select customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="ProductName">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.selectProduct}
                      onChange={this.handleProduct}
                    >
                      <option value="">Select product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="StoreName">
                    <Form.Label>Store</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.selectStore}
                      onChange={this.handleStore}
                    >
                      <option value="">Select store</option>
                      {stores.map(store => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Button variant="dark" type="submit">
                      Create
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>

        </Modal>

      </div>
    )
  }
}