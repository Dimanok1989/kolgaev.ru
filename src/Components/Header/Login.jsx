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
            valid: {
                email: false,
                password: false,
                password_confirmation: false,
                surname: false,
                name: false,
                patronymic: false,
            }
        }

    }

    /**
     * Открытие модального окна авторизации
     */
    authOpen = () => {

        this.setState({
            auth: true,
            process: false,
            registration: false,
            error: null,
        });

    }

    /**
     * Открытие модального окна регистрации
     */
    registrationOpen = () => {

        this.setState({
            auth: false,
            process: false,
            registration: true,
            error: null,
        });

    }

    /**
     * Авторизация пользователя
     */
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

    /**
     * Регистрация пользователя
     */
    registration = () => {

        this.setState({ process: true });

        let form = document.getElementById('registration-form');
        let formdata = new FormData(form);

        axios.post('auth/registration', formdata).then(({ data }) => {

            // Запись куков на все поддомены
            Cookies.set('token', data.token, {
                expires: 365,
                domain: '.' + window.location.host,
            });

            localStorage.setItem('token', data.token);
            window.user = data.user;

            this.props.logined();

        }).catch(error => {

            let errors = error.response.data.errors || null,
                valid = this.state.valid;

            for (let index in valid)
                valid[index] = false;

            if (typeof errors == "object") {
                for (let index in errors)
                    valid[index] = errors[index].toString();
            }

            this.setState({
                valid,
                process: false
            });

        });

    }

    render() {

        let error = null;

        if (this.state.error && this.state.auth)
            error = <div className="text-danger mt-2 font-weight-bold">{this.state.error}</div>;

        const auth = <div>
            <Modal
                size="sm"
                show={this.state.auth}
                onHide={() => this.setState({ auth: false })}
                centered
                backdrop="static"
            >

                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Dimmer active={this.state.process} className="rounded-bottom" inverted>
                        <Loader />
                    </Dimmer>

                    <form id="auth-form">
                        <Input placeholder="Логин, телефон или e-mail" className="w-100 my-1" name="email" onKeyUp={e => e.keyCode === 13 ? this.login() : null} />
                        <Input placeholder="Пароль" className="w-100 my-1" type="password" name="password" onKeyUp={e => e.keyCode === 13 ? this.login() : null} />
                    </form>

                    <Button variant="success" className="mt-2 btn-block" onClick={this.login}>Войти</Button>

                    {error}

                </Modal.Body>

            </Modal>
        </div>

        const valid = this.state.valid;

        const registration = <div>
            <Modal
                size="sm"
                show={this.state.registration}
                onHide={() => this.setState({ registration: false })}
                centered
                backdrop="static"
            >

                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Dimmer active={this.state.process} className="rounded-bottom" inverted>
                        <Loader />
                    </Dimmer>

                    <form id="registration-form">

                        <label className="mb-0 px-1">Электронная почта</label>
                        <Input
                            placeholder="Введите адрес почты *"
                            className="w-100 mt-1"
                            name="email"
                            onKeyUp={e => e.keyCode === 13 ? this.registration() : null}
                            error={valid.email ? true : false}
                        />
                        {valid.email ? <small className="text-danger valid-message">{valid.email}</small> : ''}

                        <label className="mt-2 mb-0 px-1">Пароль</label>
                        <Input
                            placeholder="Введите пароль *"
                            className="w-100 mt-1"
                            type="password"
                            name="password"
                            onKeyUp={e => e.keyCode === 13 ? this.registration() : null}
                            error={valid.password ? true : false}
                        />
                        {valid.password ? <small className="text-danger valid-message">{valid.password}</small> : ''}
                        <Input
                            placeholder="Подтвердите пароль *"
                            className="w-100 mt-1"
                            type="password"
                            name="password_confirmation"
                            onKeyUp={e => e.keyCode === 13 ? this.registration() : null}
                            error={valid.password_confirmation ? true : false}
                        />
                        {valid.password_confirmation ? <small className="text-danger valid-message">{valid.password_confirmation}</small> : ''}

                        <label className="mt-2 mb-0 px-1">Представьтесь</label>
                        <Input
                            placeholder="Ваше имя *"
                            className="w-100 mt-1"
                            name="name"
                            onKeyUp={e => e.keyCode === 13 ? this.registration() : null}
                            error={valid.name ? true : false}
                        />
                        {valid.name ? <small className="text-danger valid-message">{valid.name}</small> : ''}
                        <Input
                            placeholder="Ваша фамилия"
                            className="w-100 mt-1"
                            name="surname"
                            onKeyUp={e => e.keyCode === 13 ? this.registration() : null}
                        />

                    </form>

                    <Button variant="success" className="mt-3 btn-block" onClick={this.registration}>Зарегистрироваться</Button>

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
                {registration}

                <div className="position-absolute logined-header cursor-pointer">

                    <Dimmer active={this.state.loading} className="loading-header-dimmer">
                        <Loader size="mini" />
                    </Dimmer>

                    <Dropdown trigger={avatar} icon={null} pointing='top right'>

                        <Dropdown.Menu>
                            <Dropdown.Item icon="user plus" text='Регистрация' onClick={this.registrationOpen} />
                            <Dropdown.Item icon="sign in" text='Вход' onClick={this.authOpen} />
                        </Dropdown.Menu>

                    </Dropdown>

                </div>

            </>
        )

    }

}

export default Login;