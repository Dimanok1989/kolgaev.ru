import React from 'react';

import axios from './../../Utils/axios';
import Cookies from 'js-cookie';

import Avatar from './../App/Users/Avatar';

// import Icon from './../../Utils/FontAwesomeIcon'
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'

class User extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
        }

    }

    logout = () => {

        this.setState({ loading: true });

        axios.post('auth/logout').then(({ data }) => {

            Cookies.remove('token', {
                domain: '.' + window.location.host,
            });

            localStorage.removeItem('token');
            window.user = {};

            this.props.logout();

        }).catch(error => {

            this.setState({ loading: false });

        });

    }

    render() {

        // let img = "https://avatars.mds.yandex.net/get-yapic/20706/enc-1d94fda50e8ba60b08a31bb78a41166798eee9008467e0d4eb455d6405be2647/islands-34";

        const avatar = <Avatar name={window.user.name} surname={window.user.surname} img={window.user.avatar || null} />

        return (
            <div className="position-absolute mr-3 logined-header cursor-pointer">
                <Dimmer active={this.state.loading} className="loading-header-dimmer">
                    <Loader size="mini" />
                </Dimmer>

                <Dropdown trigger={avatar} icon={null} pointing='top right'>

                    <Dropdown.Menu>
                        <Dropdown.Item icon="sign out" text='Выход' onClick={this.logout} />
                    </Dropdown.Menu>

                </Dropdown>

            </div>
        )


    }

}

export default User;