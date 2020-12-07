import React from 'react';
import { NavLink } from 'react-router-dom';

import { Dropdown, Icon } from 'semantic-ui-react'

class MenuPoint extends React.Component {

    render() {

        const props = this.props;

        if (props.to) {

            let exact = true;
            if (typeof props.exact != "undefined")
                exact = props.exact;

            return <Dropdown.Item
                as={NavLink}
                to={props.to}
                icon={props.icon || null}
                text={props.text || null}
                exact={exact}
                activeClassName="nav-menu-active"
                className="nav-menu-point"
            />

        }
        else if (props.href) {

            return <a
                className="item nav-menu-point"
                href={props.href}
                target="_kolgaev"
            >
                {props.icon ? <Icon name={props.icon} /> : null}
                <span className="text">{props.text}</span>
            </a>

        }

        return null

    }

}

export default MenuPoint;