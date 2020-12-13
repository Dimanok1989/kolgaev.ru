import React from 'react'

import axios from '../../../Utils/axios'
import { messageError, errors } from '../../../Utils/axioserror'

import { Form, Row, Col, Modal, Button } from 'react-bootstrap'
import { Loader, Dimmer } from 'semantic-ui-react'

class AddCar extends React.Component {

    state = {
        loading: false,
        error: null,
        errors: {},
    }

    saveNewCar = () => {

        this.setState({ loading: true });

        let form = document.getElementById('add-new-car');
        let formdata = new FormData(form);

        axios.post('fuel/addNewCar', formdata).then(({ data }) => {

            this.props.hideAddCar(data.car);

        }).catch(error => {

            this.setState({
                loading: false,
                error: messageError(error),
                errors: errors(error)
            });

        });

    }

    render() {

        const loading = this.state.loading ? <Dimmer active inverted className="rounded">
            <Loader size="small" />
        </Dimmer> : null;

        const error = this.state.error ? <div className="text-danger font-weight-bold">{this.state.error}</div> : null;

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.hideAddCar}
                animation={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Добавить машину</Modal.Title>
                </Modal.Header>

                <Modal.Body className="position-relative">

                    <Form id="add-new-car">

                        <Form.Group controlId="add-car-brand">
                            <Form.Label className="mb-1">Марка машины <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите марку..."
                                name="brand"
                                required
                                isInvalid={this.state.errors.brand ? true : false}
                            />
                        </Form.Group>

                        <Form.Group controlId="add-car-brand">
                            <Form.Label className="mb-1">Модель <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите модель..."
                                name="model"
                                required
                                isInvalid={this.state.errors.model ? true : false}
                            />
                        </Form.Group>

                        <Form.Group controlId="add-car-modification">
                            <Form.Label className="mb-1">Модификация</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Опишите модификацию..."
                                name="modification"
                            />
                            <Form.Text className="text-muted">Например 1.8Т, 2.7T или V8 4.2...</Form.Text>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="add-car-year">
                                    <Form.Label className="mb-1">Год выпуска</Form.Label>
                                    <Form.Control type="number" placeholder="Укажите год выпуска..." name="year" max="2999" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="add-car-volume">
                                    <Form.Label className="mb-1">Объём двигателя</Form.Label>
                                    <Form.Control type="number" placeholder="Укажите объём..." name="volume" step="0.1" max="36" />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                    {error}

                    <div className="d-flex justify-content-end mt-3">
                        <Button className="mx-1" variant="success" onClick={this.saveNewCar}>Сохранить</Button>
                    </div>

                    {loading}

                </Modal.Body>

            </Modal>
        )

    }

}

export default AddCar