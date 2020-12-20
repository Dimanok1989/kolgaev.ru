import React from 'react';
import { Link } from 'react-router-dom';

import './../../css/main.css';
import BackGround from './../../images/header.jpg';
import BackGroundGradient from './../../images/gradient.png';

import { Icon } from 'semantic-ui-react'

class Main extends React.Component {

    componentDidMount = () => {

        let block = document.getElementById('header-image');
        block.style.background = `url(${BackGround}) 50% 20%`;

        let gradient = document.getElementById('header-gradient');
        gradient.style.background = `url(${BackGroundGradient}) repeat-x`;
        gradient.style.backgroundSize = `auto 600px`;

    }

    render() {

        const date = new Date();
        let year = date.getFullYear()

        return (
            <>

                <div id="header-image" className="main-header position-relative">

                    <div id="header-gradient" className="position-absolute w-100 h-100 main-header-bg-grd"></div>

                    <div className="position-absolute w-100 h-100 text-center text-light d-flex justify-content-center align-items-center flex-column">

                        <div className="header-title-in-bg d-flex align-items-center">
                            <img src="/logo192.jpg" width="46" height="46" className="image-logo rounded" alt="Kolgaev.ru" />
                            <span className="welcome-title">Кolgaev.ru</span>
                        </div>

                        <div className="sub-title-head">Развивающийся портал для своих</div>

                    </div>

                </div>

                {/* <div className="text-center my-4">
                    <h3 className="font-weight-bold">Добро пожаловать!</h3>
                    <div>
                        <span></span>
                    </div>
                </div> */}

                <div className="main-block auto-expenses">
                    <div className="main-block-content text-center">
                        <h5 className="main-block-title">Авто расходы</h5>
                        <p className="max-sm mx-auto">Раздел, позволяющий отслеживать Ваши траты на бензин. Записывайте каждую заправку и наблюдайте за графиком расходов. Статистика покажет стоимость одного километра пути, средний расход топлива на 100 км, сколько потрачено денег и тд...</p>

                        {this.props.menu.indexOf('menu.fuel') >= 0 ? <div><Link to="/fuel" className="btn btn-outline-light">Перейти а раздел...</Link></div> : null}

                    </div>
                </div>

                {this.props.menu.indexOf('menu.disk') >= 0 ? <div className="main-block disk">
                    <div className="main-block-content text-center">
                        <h5 className="main-block-title">Диск</h5>
                        <p className="max-lg mx-auto">Это только наш диск. Если ты видишь этот текст, то тебе повезло, доступ к диску открыт. Можно оставить файлы для хранения или обмена между собой, но нужно понимать, что диск не резиновый...</p>

                        <div><a href="https://disk.kolgaev.ru" className="btn btn-outline-dark">Открыть диск...</a></div>

                    </div>
                </div> : null}

                <div className="main-block footer py-3">

                    <div className="text-center my-3">
                        <a className="footer-link" href="https://github.com/Dimanok1989" target="_kolgaev"><Icon name="github square" size="big" /></a>
                        <a className="footer-link" href="https://www.instagram.com/dimanok1989/" target="_kolgaev"><Icon name="instagram" size="big" /></a>
                        <a className="footer-link" href="https://www.youtube.com/channel/UCAiealqjaAckQ4KJ22dO1GQ?view_as=subscriber" target="_kolgaev"><Icon name="youtube" size="big" /></a>
                        <a className="footer-link" href="https://vk.com/kolgaev89" target="_kolgaev"><Icon name="vk" size="big" /></a>
                    </div>
                    
                    <div className="text-center">
                        <small>©{year} Дмитрий Колгаев</small>
                    </div>

                </div>

            </>
        )

    }

}

export default Main;