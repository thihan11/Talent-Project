import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddProdcut extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:7027/api/Products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: event.target.Name.value,
        Price: event.target.Price.value,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to create products.');
        }
      })
      .then(data => {
        if (data && data.errors) {
          console.log('Validation errors:', data.errors);
          alert('Validation errors occurred. Please check your input.');
        } else {

          setTimeout(() => {
            alert('Product created successfully.');
          }, 200);
        }
      })
      .catch(error => {
        console.error('Error creating product:', error);
        if (error instanceof TypeError) {
          alert('Network error occurred. Please check your connection.');
        } else {
          alert('An error occurred. Please try again.');
        }
      });
  }
  render() {
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
              Create Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="CustomerName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="Name"
                      placeholder="Product Name" />
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="Price"
                      placeholder="Price" />
                  </Form.Group>
                  <br />

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
