import React from 'react';

import axios from './../../Utils/axios';
import echoerror from './../../Utils/echoerror'
import Cookies from 'js-cookie';

import Icon from './../../Utils/FontAwesomeIcon'
import { Dropdown, Dimmer, Loader, Input } from 'semantic-ui-react'
import { Modal, Button } from 'react-bootstrap'

class Login extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            process: false,
            auth: false,
            registration: false,
            error: null,
        }

    }

    auth = () => {

        this.setState({
            auth: true,
            process: false,
            registration: false,
            error: null,
        });

    }

    login = () => {

        this.setState({ process: true });

        let form = document.getElementById('auth-form');
        let formdata = new FormData(form);

        axios.post('auth/login', formdata).then(({ data }) => {

            // Запись куков на все поддомены
            Cookies.set('token', data.token, {
                expires: 365,
                domain: '.' + window.location.host,
            });

            localStorage.setItem('token', data.token);
            window.user = data.user;

            this.props.logined();

        }).catch(error => {

            this.setState({
                error: echoerror(error),
                process: false
            });

        });

    }

    render() {

        const error = this.state.error ? <div className="text-danger mt-2 font-weight-bold">{this.state.error}</div> : null;

        const auth = <div>
            <Modal
                size="sm"
                show={this.state.auth}
                onHide={() => this.setState({ auth: false })}
                centered
            >

                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Dimmer active={this.state.process} className="rounded-bottom" inverted>
                        <Loader />
                    </Dimmer>

                    <form id="auth-form">
                        <Input placeholder="Логин, телефон или e-mail" className="w-100 my-1" name="login" onKeyUp={e => e.keyCode === 13 ? this.login() : null} />
                        <Input placeholder="Пароль" className="w-100 my-1" type="password" name="password" onKeyUp={e => e.keyCode === 13 ? this.login() : null} />
                    </form>

                    <Button variant="success" className="mt-2 btn-block" onClick={this.login}>Войти</Button>

                    {error}

                </Modal.Body>

            </Modal>
        </div>

        const avatar = <span className="avatar d-flex align-items-center justify-content-center">
            <Icon icon={['fas', 'user']} />
        </span>

        return (
            <>
                {auth}
                <div className="position-absolute mr-3 logined-header cursor-pointer">

                    <Dimmer active={this.state.loading} className="loading-header-dimmer">
                        <Loader size="mini" />
                    </Dimmer>

                    <Dropdown trigger={avatar} icon={null} pointing='top right'>

                        <Dropdown.Menu>
                            <Dropdown.Item icon="sign in" text='Авторизация' onClick={this.auth} />
                            <Dropdown.Item icon="user plus" text='Регистрация' />
                        </Dropdown.Menu>

                    </Dropdown>

                </div>
            </>
        )

    }

}

export default Login;