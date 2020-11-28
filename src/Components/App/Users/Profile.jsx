import React from 'react'
import InputMask from 'react-input-mask';

import axios from './../../../Utils/axios'
import echoerror from './../../../Utils/echoerror'

import { Form, Input, Message, Button } from 'semantic-ui-react'
import './../../../css/profile.css'

class Profile extends React.Component {

    state = {
        loading: true,
        loaded: false,
        user: {},
        formdata: {},
        errors: {},
        error: null,
        nosave: false,
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {

        axios.post(`auth/user`).then(({ data }) => {

            this.setState({
                user: data.user,
                formdata: Object.assign({}, data.user),
                loaded: true,
            });

        }).catch(error => {

            this.setState({
                nosave: true,
                error: echoerror(error),
            })

        }).then(() => {

            this.setState({ loading: false });

        });

    }

    changeform = e => {

        let formdata = this.state.formdata,
            nosave = false;

        let name = e.currentTarget.name,
            value = e.currentTarget.value || null;

        formdata[name] = value;

        let list = document.querySelectorAll('#user-data [required]');
        list.forEach(input => {
            if (!formdata[input.name])
                nosave = true;
        });

        this.setState({
            formdata,
            nosave
        });

    }

    resetData = () => {
        this.setState({ formdata: Object.assign({}, this.state.user) });
    }

    checkKey = e => {

        if (e.keyCode === 13) {
            e.target.blur();
            this.saveUserData();
        }

    }

    saveUserData = () => {

        this.setState({ loading: true });

        axios.post(`auth/saveUserData`, this.state.formdata).then(({ data }) => {

            this.setState({
                user: data.user,
                formdata: Object.assign({}, data.user),
                errors: {},
                error: null,
            });

        }).catch(error => {

            this.setState({ error: null });

            if (typeof error.response == "object")
                if (typeof error.response.data == "object")
                    if (typeof error.response.data.errors == "object")
                        return this.setState({ errors: error.response.data.errors });

            this.setState({ error: echoerror(error) });

        }).then(() => {

            this.setState({ loading: false });

        });

    }

    render() {

        const user = this.state.formdata;
        const errors = this.state.errors;

        const nosave = this.state.nosave;

        const disabled = JSON.stringify(this.state.user) === JSON.stringify(this.state.formdata) || nosave;

        let message = null;

        if (this.state.error)
            message = <Message visible error>{this.state.error}</Message>

        return <div className="my-content profile-content px-3">

            <h3 className="mt-3 mb-0">Личные данные</h3>
            <small>Управляйте настройками Вашей учетной записи</small>

            <Form className="mt-4 mb-3" loading={this.state.loading} id="user-data">

                <Form.Group widths="equal">
                    <Form.Field
                        control={InputMask}
                        label="Имя"
                        placeholder="Имя"
                        name="name"
                        value={user.name || ""}
                        disabled={!this.state.loaded}
                        required
                        onChange={this.changeform}
                        onKeyPress={this.checkKey}
                        error={errors.name || false}
                    />
                    <Form.Field
                        control={InputMask}
                        label="Фамилия"
                        placeholder="Фамилия"
                        name="surname"
                        value={user.surname || ""}
                        disabled={!this.state.loaded}
                        onChange={this.changeform}
                        onKeyPress={this.checkKey}
                        error={errors.surname || false}
                    />
                    <Form.Field
                        control={InputMask}
                        label="Отчество"
                        placeholder="Отчество"
                        name="patronymic"
                        value={user.patronymic || ""}
                        disabled={!this.state.loaded}
                        onChange={this.changeform}
                        onKeyPress={this.checkKey}
                        error={errors.patronymic || false}
                    />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field
                        control={InputMask}
                        label="E-mail"
                        placeholder="E-mail"
                        name="email"
                        value={user.email || ""}
                        disabled={!this.state.loaded}
                        required
                        readOnly
                        onChange={this.changeform}
                        onKeyPress={this.checkKey}
                        error={errors.email || false}
                    />
                    <Form.Field
                        control={InputMask}
                        label="Телефон"
                        placeholder="Телефон"
                        name="phone"
                        value={user.phone || ""}
                        disabled={!this.state.loaded}
                        mask="+7 (999) 999-99-99"
                        onChange={this.changeform}
                        onKeyPress={this.checkKey}
                        error={errors.phone || false}
                    />
                </Form.Group>

                <Form.Group widths="1">

                    <div className={`${!this.state.loaded ? 'disabled' : ''} field w-100`}>
                        <label htmlFor="user-login">Ваш логин, он же адрес ссылки на профиль</label>
                        <Input
                            id="user-login"
                            label={window.location.origin + '/user/'}
                            placeholder={user.id}
                            name="login"
                            value={user.login || ""}
                            disabled={!this.state.loaded}
                            onChange={this.changeform}
                            onKeyPress={this.checkKey}
                            error={errors.login || false}
                        />
                    </div>

                </Form.Group>

                {message}

                <div className="text-center mt-4">
                    <Button
                        primary
                        disabled={disabled}
                        onClick={this.resetData}
                        type="button"
                    >
                        Отмена
                    </Button>
                    <Button
                        color="green"
                        disabled={disabled}
                        onClick={this.saveUserData}
                    >
                        Сохранить
                    </Button>
                </div>

            </Form>

        </div>

    }

}

export default Profile;