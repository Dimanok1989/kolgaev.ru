import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setFuelAddShow } from './../../../store/fuel/actions'

import axios from '../../../Utils/axios'
import { messageError, errors } from '../../../Utils/axioserror'

import { Alert, Form, Col, Modal, Button } from 'react-bootstrap'
import { Loader, Dimmer } from 'semantic-ui-react'

class AddFuelRow extends React.Component {

    state = {
        car: null,
        show: false,
        loading: false,

        error: null,
        errors: {},

        stantions: [],

        date: null,
        mileage: null,
        liters: null,
        price: null,
        type: null,
        gas_station: null,
        full: null,
        lost: null,

    }

    componentDidMount() {

        this.setState({ car: this.props.match.params.id });

    }

    showAddFuel = el => {

        this.setState({
            show: true,
            loading: true,
            error: null,
            errors: {}
        });

        axios.post('fuel/showAddFuel', { car: this.state.car }).then(({ data }) => {

            this.setState({
                stantions: data.stantions,
                date: data.date,
                mileage: data.mileage,
                type: data.type,
                liters: null,
                price: null,
                gas_station: null,
                full: null,
                lost: null,
            });

        }).catch(error => {

        }).then(() => {
            this.setState({ loading: false });
        });

    }

    hideAddFuel = () => this.setState({ show: false });

    addFuel = el => {

        this.setState({
            loading: true
        });

        axios.post('fuel/addFuel', {
            car: this.state.car,
            date: this.state.date,
            mileage: this.state.mileage,
            liters: this.state.liters,
            price: this.state.price,
            type: this.state.type,
            gas_station: this.state.gas_station,
            full: this.state.full,
            lost: this.state.lost,
        }).then(({ data }) => {

            this.setState({
                loading: false,
                show: false,
            });

            this.props.addFuel(data.refuel);

        }).catch(error => {

            this.setState({
                loading: false,
                error: messageError(error),
                errors: errors(error)
            });

        });

    }

    render() {

        const loading = this.state.loading
            ? <Dimmer active inverted className="rounded">
                <Loader size="small" />
            </Dimmer>
            : null;

        const error = this.state.error
            ? <Alert variant="danger" className="mt-3">{this.state.error}</Alert>
            : null

        const stantions = this.state.stantions.map((stantion, key) => <button type="button" key={key} className="btn btn-link btn-sm" onClick={() => this.setState({ gas_station: stantion })}>{stantion}</button>);

        return <>

            <button className="btn btn-dark" onClick={() => {
                this.showAddFuel();
                this.props.setFuelAddShow(true);
            }}>Добавить заправку</button>

            <Modal
                show={this.state.show}
                onHide={this.hideAddFuel}
                animation={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Добавить заправку</Modal.Title>
                </Modal.Header>

                <Modal.Body className="position-relative">

                    <Form.Row>

                        <Form.Group as={Col} controlId="add-fuel-date">
                            <Form.Label className="mb-1">Дата заправки <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Укажите дату..."
                                defaultValue={this.state.date || ""}
                                onChange={el => this.setState({ date: el.target.value })}
                                required
                                isInvalid={this.state.errors.date ? true : false}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="add-car-mileage">
                            <Form.Label className="mb-1">Киллометраж <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="number"
                                step="1"
                                placeholder="Укажите текущий пробег..."
                                defaultValue={this.state.mileage || ""}
                                onChange={el => this.setState({ mileage: el.target.value })}
                                required
                                isInvalid={this.state.errors.mileage ? true : false}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="add-fuel-price">
                            <Form.Label className="mb-1">Цена за литр <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                placeholder="Укажите стоимость..."
                                onChange={el => this.setState({ price: el.target.value })}
                                required
                                isInvalid={this.state.errors.price ? true : false}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="add-fuel-price">
                            <Form.Label className="mb-1">Количество литров <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Укажите количество литров..."
                                onChange={el => this.setState({ liters: el.target.value })}
                                required
                                isInvalid={this.state.errors.liters ? true : false}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="add-fuel-price">
                            <Form.Label className="mb-1">Вид топлива</Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.type || ""}
                                onChange={el => this.setState({ type: el.target.value })}
                                isInvalid={this.state.errors.type ? true : false}
                            >
                                <option value="">Выберите вид топлива...</option>
                                <option value="АИ 80">АИ 80</option>
                                <option value="АИ 92">АИ 92</option>
                                <option value="АИ 92 Premium">АИ 92 Premium</option>
                                <option value="АИ 95">АИ 95</option>
                                <option value="АИ 95 Premium">АИ 95 Premium</option>
                                <option value="АИ 98">АИ 98</option>
                                <option value="АИ 98 Premium">АИ 98 Premium</option>
                                <option value="АИ 100">АИ 100</option>
                                <option value="АИ 100 Premium">АИ 100 Premium</option>
                                <option value="ДТ">ДТ</option>
                                <option value="ДТ Premium">ДТ Premium</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="add-fuel-price">
                            <Form.Label className="mb-1">Заправка</Form.Label>
                            <Form.Control
                                placeholder="Укажите наименование заправки..."
                                defaultValue={this.state.gas_station || ""}
                                onChange={el => this.setState({ gas_station: el.target.value })}
                                isInvalid={this.state.errors.gas_station ? true : false}
                            />
                        </Form.Group>

                    </Form.Row>

                    {stantions}

                    <Form.Check
                        className="mt-3 my-1"
                        type="switch"
                        id="add-fuel-full"
                        onChange={el => this.setState({ full: el.target.checked ? 1 : 0 })}
                        label="Заправка до полного бака"
                    />

                    <Form.Check
                        className="my-1"
                        type="switch"
                        id="add-fuel-lost"
                        onChange={el => this.setState({ lost: el.target.checked ? 1 : 0 })}
                        label="Забыл записать предыдущую заправку"
                    />

                    {error}

                    <div className="d-flex justify-content-end mt-3">
                        <Button className="mx-1" variant="success" onClick={this.addFuel}>Сохранить</Button>
                    </div>

                    {loading}

                </Modal.Body>

            </Modal>

        </>

    }

}

const mapStateToProps = state => {
    return {
        showAdd: state.fuel.showAdd
    }
}

const mapDispatchToProps = {
    setFuelAddShow,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddFuelRow));