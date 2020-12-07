import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import axios from '../../../Utils/axios'

import { Loader, Item } from 'semantic-ui-react'
import './../../../css/fuel.css'

import NotFound from './../../NotFound'
import FuelRow from './FuelRow'
// import Image from 'react-bootstrap/Image'

class FuelsCar extends React.Component {

    state = {
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

    showAddCar = () => {
        console.log("Добавить машину");
    }

    render() {

        if (this.state.notFound === true)
            return <NotFound />

        if (this.state.redirect === "login")
            return <Redirect to="/login" />

        const loading = this.state.loading
            ? <Loader className="mt-3" active inline="centered" />
            : null

        const fuels = this.state.fuels.map(fuel => <FuelRow key={fuel.id} fuel={fuel} />)

        return <div className="my-content">
            
            <div className="car-content">
                <Item.Group>{fuels}</Item.Group>
            </div>

            {loading}

        </div>;

    }

}

export default withRouter(FuelsCar);