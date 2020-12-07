import React from 'react';

import MenuPoint from './MenuPoint'
import { Dropdown, Icon } from 'semantic-ui-react'

class MenuComponent extends React.Component {

    state = {
        activeItem: null,
    }

    handleItemClick = (e, { icon }) => this.setState({ activeItem: icon })

    render() {

        let points = [
            { to: "/", icon: "home", text: "Главная страница" }
        ];

        if (this.props.menu.indexOf("menu.admin") >= 0)
            points.push({ href: "//admin.kolgaev.ru", icon: "shield", text: "Админ-панель" });

        if (this.props.menu.indexOf("menu.fuel") >= 0)
            points.push({ to: "/fuel", icon: "car", text: "Авторасходы", exact: false });

        if (this.props.menu.indexOf("menu.disk") >= 0)
            points.push({ href: "//disk.kolgaev.ru", icon: "disk", text: "Диск" });

        const items = points.map((item, key) => <MenuPoint key={key} {...item} />)

        return (
            <Dropdown
                icon={null}
                trigger={<Icon name="bars" className="mr-2 item-hover" size="large" />}
            >
                <Dropdown.Menu>
                    <Dropdown.Header content="Главное меню" />
                    <Dropdown.Divider />
                    {items}
                    {/* <Dropdown.Item icon="conversation" text="Discussion" /> */}
                </Dropdown.Menu>
            </Dropdown>
        )

    }

}

export default MenuComponent;