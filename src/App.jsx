import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from './Utils/axios';
import { Spinner } from 'react-bootstrap';

import NotFound from './Components/NotFound';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            isLogin: false,
        };

    }

    componentDidMount() {

        this.checkLogin(); // Проверка авторизации

    }

    loginClick = e => {

        this.setState({ isLogin: !this.state.isLogin });

    }

    logined = login => {

        this.setState({ isLogin: login });

    }

    /**
     * Метод проверки авторизации
     */
    checkLogin = () => {

        axios.post(`auth/user`).then(({ data }) => {

            this.setState({ isLogin: true });
            window.user = data;

        }).catch(error => {

        }).then(() => {

            this.setState({ loading: false });

        });

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
                    <Header isLogin={this.state.isLogin} logout={() => this.setState({ isLogin: false })} logined={() => this.setState({ isLogin: true })} />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )

    }

}

export default App;
