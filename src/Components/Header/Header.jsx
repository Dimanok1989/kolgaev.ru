import React from 'react';
import { Link } from 'react-router-dom';

import Login from './Login';
import User from './User';

import './../../css/header.css';

class Header extends React.Component {

    render() {

        const user = this.props.isLogin ? <User logout={() => this.props.logout()} /> : <Login  logined={() => this.props.logined()} />;

        return (
            <div className="bg-my-header text-light p-3">

                <div className="header-menu mx-auto d-flex justify-content-between align-items-center">

                    <div className="d-flex">
                        <Link className="header-link font-weight-bold" to="/">Kolgaev.ru</Link>
                    </div>

                    {user}

                </div>

            </div>
        )

    }

}

export default Header;