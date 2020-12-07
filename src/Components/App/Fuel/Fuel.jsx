import React from 'react'
import { Redirect } from 'react-router-dom'

import axios from '../../../Utils/axios'

import { Loader, Card, Icon } from 'semantic-ui-react'
import './../../../css/fuel.css'

import CarCard from './CarCard'
import AddCar from './AddCar'

class Fuel extends React.Component {

    state = {
        loading: true,
        redirect: null,
        cars: [],
        fuels: [],
        addCar: false,
    }

    componentDidMount() {
        this.getMainData();
    }

    getMainData = () => {

        axios.post('fuel/getMainData').then(({ data }) => {

            this.setState({
                cars: data.cars,
                fuels: data.fuels,
            });

        }).catch(error => {

            if (error.response)
                if (error.response.status === 401)
                    this.setState({ redirect: "login" });

        }).then(() => {
            this.setState({ loading: false });
        });

    }

    showAddCar = () => this.setState({ addCar: true })
    hideAddCar = (car = false) => {

        let cars = this.state.cars;

        if (car)
            cars.push(car);

        this.setState({ addCar: false, cars })
        
    }

    render() {

        if (this.state.redirect === "login")
            return <Redirect to="/login" />

        const loading = this.state.loading
            ? <Loader className="mt-3" active inline="centered" />
            : null

        const cars = this.state.cars
            ? this.state.cars.map((car, key) => <CarCard key={key} car={car} />)
            : <div>Нужно создать машину</div>

        return <div className="my-content">

            <AddCar show={this.state.addCar} hideAddCar={this.hideAddCar} />

            <Card.Group
                className="mt-3 mx-auto px-3"
                itemsPerRow={3}
                centered
            >

                {cars}

                {!this.state.loading ? <Card
                    as="div"
                    onClick={this.showAddCar}
                    className="car-card m-1 cursor-pointer"
                >
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                        <Icon name="plus circle" size="huge" color="grey" />
                        <small className="mt-2">Добавить машину</small>
                    </div>
                    <div className="hover-row"></div>
                </Card> : null}

            </Card.Group>
            {loading}
        </div>;

    }

}

export default Fuel;