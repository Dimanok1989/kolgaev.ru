import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import axios from '../../../Utils/axios'

import { Loader, Item } from 'semantic-ui-react'
import './../../../css/fuel.css'

import NotFound from './../../NotFound'
import FuelRow from './FuelRow'
import AddFuelRow from './AddFuelRow'
// import Image from 'react-bootstrap/Image'

class FuelsCar extends React.Component {

    state = {
        car: {},
        loading: true,
        redirect: null,
        notFound: null,
        page: 1,
        fuels: [],
    }

    componentDidMount() {
        this.getFuelsCar();
    }

    getFuelsCar = () => {

        let formdata = {
            id: this.props.match.params.id,
            page: this.state.page,
        }

        axios.post('fuel/getFuelsCar', formdata).then(({ data }) => {

            this.setState({
                car: data.car,
                fuels: data.fuels
            });

        }).catch(error => {

            if (error.response) {
                if (error.response.status === 401)
                    this.setState({ redirect: "login" });
                else if (error.response.status === 403)
                    this.setState({ notFound: true });
            }

        }).then(() => {
            this.setState({ loading: false });
        });

    }

    addFuel = refuel => {

        let index = null,
            fuels = this.state.fuels;

        fuels.forEach((fuel, idx) => {
            if (Number(fuel.mileage) > Number(refuel.mileage))
                index = idx;
        });

        if (index === null)
            fuels.unshift(refuel);
        else
            fuels.splice(index + 1, 0, refuel);

        this.setState({ fuels });

    }

    render() {

        if (this.state.notFound === true)
            return <NotFound />

        if (this.state.redirect === "login")
            return <Redirect to="/login" />

        const loading = this.state.loading
            ? <Loader className="mt-3" active inline="centered" />
            : null

        const addFuel = !this.state.loading && this.state.car.user === window.user.id
            ? <div className="text-center">
                <AddFuelRow addFuel={this.addFuel} />
            </div>
            : null

        const fuels = this.state.fuels.map(fuel => <FuelRow key={fuel.id} fuel={fuel} />)

        return <div className="my-content">

            <div className="car-content">

                {addFuel}

                <Item.Group>{fuels}</Item.Group>

            </div>

            {loading}

        </div>;

    }

}

export default withRouter(FuelsCar);