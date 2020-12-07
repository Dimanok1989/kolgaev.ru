import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from './Utils/axios';
import { Spinner } from 'react-bootstrap';

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
        this.setState({ isLogin: true });

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

        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center align-items-center position-absolute loading-app">
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        }

        return (
            <BrowserRouter>
                <div>
                    <Header isLogin={this.state.isLogin} logout={() => this.setState({ isLogin: false })} logined={this.logined} menu={this.state.menu} />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/fuel" component={Fuel} />
                        <Route exact path="/fuel/:id" component={FuelsCar} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )

    }

}

export default App;
