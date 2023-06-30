import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditStore extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { id } = this.props;

        fetch(`https://localhost:7027/api/Stores/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.id.value,
                name: event.target.name.value,
                address: event.target.address.value
            })
        }).then(res => {
            if (res.ok) {
              alert('store updated successfully')
            } else {
              throw new Error('Failed to create store.');
            }
          })
          .catch(error => {
            console.error('Error creating store:', error);
            console.log('Response:',error.response);
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
                            Edit Customer Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Customer Name">

                                        <Form.Label>Store ID</Form.Label>
                                        <Form.Control type="text" name="id" required disabled
                                            defaultValue={this.props.id}
                                            placeholder="Customer ID" />

                                        <Form.Label>Store Name</Form.Label>
                                        <Form.Control type="text" name="name" required
                                            defaultValue={this.props.name}
                                            placeholder="Customer Name" />
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" required
                                            defaultValue={this.props.address}
                                            placeholder="Address" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="dark" type="submit">
                                            Update
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
