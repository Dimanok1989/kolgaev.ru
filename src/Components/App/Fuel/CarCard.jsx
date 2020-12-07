import React from 'react'
import { NavLink } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react'
// import Icon from './../../../Utils/FontAwesomeIcon'

import NoPhoto from './../../../images/image.png'

class CarCard extends React.Component {

    render() {

        const car = this.props.car;

        let model = car.model || "";
        model += car.modification ? " " + car.modification : "";
        model += car.year ? " " + car.year : "";

        const image = car.image || NoPhoto;

        return (
            <NavLink
                className="car-card-link m-1"
                to={`/fuel/${car.id}`}
            >
                <Card
                    className="car-card"
                >
                    <Image src={image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{car.brand}</Card.Header>
                        {model ? <Card.Meta>{model}</Card.Meta> : null}
                    </Card.Content>

                    <div className="hover-row"></div>

                </Card>

            </NavLink>
        )

    }

}

export default CarCard;