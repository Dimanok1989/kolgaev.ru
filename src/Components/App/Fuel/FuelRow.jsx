import React from 'react'

import { Item, Statistic } from 'semantic-ui-react'
import FontIcon from './../../../Utils/FontAwesomeIcon'

class FuelRow extends React.Component {

    render() {

        const fuel = this.props.fuel;

        let color = fuel.full === 1 ? "#3ccc18" : "#a0afbd";

        return (
            <Item className="mb-5 px-3">

                <div className="ui tiny image">
                    <FontIcon icon={['fas', 'gas-pump']} size="4x" color={color} className="mx-auto" />
                    <div className="text-center mt-2">{fuel.type}</div>
                </div>

                <Item.Content>

                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 font-weight-bold">{fuel.gas_station}</h5>
                        <small className="text-muted">{fuel.date}</small>
                    </div>

                    <Statistic.Group className="justify-content-center flex-wrap" size="mini">

                        <Statistic>
                            <Statistic.Value>{fuel.mileage}</Statistic.Value>
                            <Statistic.Label>Пробег</Statistic.Label>
                        </Statistic>

                        <Statistic>
                            <Statistic.Value>{fuel.liters}</Statistic.Value>
                            <Statistic.Label>Литры</Statistic.Label>
                        </Statistic>

                        <Statistic>
                            <Statistic.Value>{fuel.price}</Statistic.Value>
                            <Statistic.Label>Цена</Statistic.Label>
                        </Statistic>

                        <Statistic>
                            <Statistic.Value>{(fuel.liters * fuel.price).toFixed(2)}</Statistic.Value>
                            <Statistic.Label>Стоимость</Statistic.Label>
                        </Statistic>

                    </Statistic.Group>

                </Item.Content>

            </Item>
        )

    }

}

export default FuelRow;