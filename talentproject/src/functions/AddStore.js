import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddStore extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:7027/api/Stores', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: event.target.Name.value,
        Address: event.target.Address.value,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to create Store.');
        }
      })
      .then(data => {
        if (data && data.errors) {
          console.log('Validation errors:', data.errors);
          alert('Validation errors occurred. Please check your input.');
        } else {

          setTimeout(() => {
            alert('Store created successfully.');
          }, 200);
        }
      })
      .catch(error => {
        console.error('Error creating store:', error);
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
              Create Store
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Store">
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control type="text" name="Name"
                      placeholder="Store Name" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="Address"
                      placeholder="Address" />
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
