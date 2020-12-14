import React from 'react'

import { Item } from 'semantic-ui-react'
import FontIcon from './../../../Utils/FontAwesomeIcon'

class FuelRow extends React.Component {

    render() {

        const fuel = this.props.fuel;
        const lost = fuel.lost === 1
            ? <FontIcon icon={['fas', 'exclamation-circle']} className="text-warning lost-fuel" title="Забыл записать предыдущую заправку" />
            : null

        let color = fuel.full === 1 ? "#3ccc18" : "#a0afbd";


        return (

            <Item className="mb-5 px-3">

                <div className="d-flex align-items-center w-100">

                    <div className="pr-4 d-flex flex-column justify-content-center position-relative">
                        <FontIcon icon={['fas', 'gas-pump']} size="3x" color={color} className="mx-auto" />
                        {lost}
                        <div className="text-center mt-2 title-type-fuel">{fuel.type}</div>
                    </div>

                    <div className="px-2 d-flex flex-column justify-content-center align-items-stretch flex-grow-1">

                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h5 className="mb-0 font-weight-bold">{fuel.gas_station}</h5>
                            <small className="text-muted">{fuel.date}</small>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            
                            <div className="statistic-refuel-row">
                                <div className="statistic-value">{fuel.mileage}</div>
                                <div className="statistic-title">Пробег</div>
                            </div>

                            <div className="statistic-refuel-row">
                                <div className="statistic-value">{fuel.liters}</div>
                                <div className="statistic-title">Литры</div>
                            </div>

                            <div className="statistic-refuel-row">
                                <div className="statistic-value">{fuel.price}</div>
                                <div className="statistic-title">Цена</div>
                            </div>

                            <div className="statistic-refuel-row">
                                <div className="statistic-value">{(fuel.liters * fuel.price).toFixed(2)}</div>
                                <div className="statistic-title">Стоимость</div>
                            </div>

                        </div>
                        
                    </div>

                </div>

            </Item>

        )

    }

}

export default FuelRow;