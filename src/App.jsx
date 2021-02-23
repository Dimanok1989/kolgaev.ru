import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from './Utils/axios';
import { Spinner } from 'react-bootstrap';
import { YMInitializer } from 'react-yandex-metrika';

import NotFound from './Components/NotFound';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

import Profile from './Components/App/Users/Profile';
import Fuel from './Components/App/Fuel/Fuel';
import FuelsCar from './Components/App/Fuel/FuelsCar';

import Echo from 'laravel-echo';
window.io = require('socket.io-client');

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            isLogin: false,
            online: [],
            menu: [],
        };

    }

    componentDidMount() {

        this.checkLogin(); // Проверка авторизации

    }

    /**
     * Завершение авторизации
     */
    logined = async () => {

        await this.connectEcho(); // Подключение к широковещанию
        await this.updateMenuPoints(); // Получение списка меню

        this.setState({ isLogin: true });

    }

    /**
     * Деавторизация пользователя
     */
    logout = () => {

        this.setState({
            isLogin: false,
            menu: [],
        });

    }

    /**
     * Метод проверки авторизации
     */
    checkLogin = async () => {

        await axios.post(`auth/user`, { menu: true }).then(({ data }) => {

            window.user = data.user;
            window.menu = data.menu;

            this.setState({
                isLogin: true,
                menu: data.menu
            });

            this.connectEcho();

        }).catch(error => {

        }).then(() => {
            this.setState({ loading: false });
        });

    }

    /**
     * Обновление пунктов меню
     */
    updateMenuPoints = async () => {

        await axios.post('auth/getMenu').then(({ data }) => {

            this.setState({ menu: data.menu });

        });

    }

    /**
     * Подключение к серверу широковещения
     */
    connectEcho = async () => {

        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: process.env.REACT_APP_SOCKET_IO_URL,
            path: '/ws/socket.io',
            auth: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            },
        });

        window.Echo.join('App.Main')
            .here(users => {
                let online = [];
                users.forEach(user => online.push(user.id));
                this.setState({ online });
                window.online = online;
            })
            .joining(user => {
                let online = this.state.online;
                online.push(user.id);
                this.setState({ online });
                window.online = online;
            })
            .leaving(user => {

                let online = this.state.online,
                    indexOf = online.indexOf(user.id);

                if (indexOf >= 0) {
                    online.splice(indexOf, 1);
                    this.setState({ online });
                    window.online = online;
                }

            })

    }

    render() {

        const metrika = process.env.REACT_APP_METRIKA === "true"
            ? <YMInitializer accounts={[44940325]} options={{webvisor: true}} version="2" />
            : null

        const body = this.state.loading
            ? <div className="d-flex justify-content-center align-items-center position-absolute loading-app">
                <Spinner animation="border" variant="dark" />
            </div>
            : <div>
                <Header isLogin={this.state.isLogin} logout={this.logout} logined={this.logined} menu={this.state.menu} />
                <Switch>
                    <Route exact path="/" component={() => <Main menu={this.state.menu} />} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/fuel" component={Fuel} />
                    <Route exact path="/fuel/:id" component={FuelsCar} />
                    <Route component={NotFound} />
                </Switch>
            </div>

        return (
            <BrowserRouter>
                {body}
                {metrika}
            </BrowserRouter>
        )

    }

}

export default App;
