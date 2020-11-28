import React from 'react';

import './../../css/main.css';
import BackGround from './../../images/header.jpg';
import BackGroundGradient from './../../images/gradient.png';

class Main extends React.Component {

    componentDidMount = () => {

        let block = document.getElementById('header-image');
        block.style.background = `url(${BackGround}) 50% 20%`;

        let gradient = document.getElementById('header-gradient');
        gradient.style.background = `url(${BackGroundGradient}) repeat-x`;
        gradient.style.backgroundSize = `auto 600px`;

    }

    render() {

        return (
            <>

                <div id="header-image" className="main-header position-relative">

                    <div id="header-gradient" className="position-absolute w-100 h-100 main-header-bg-grd"></div>

                    <div className="position-absolute w-100 h-100 text-center text-light d-flex justify-content-center align-items-center">

                        <div className="header-title-in-bg d-flex align-items-center">
                            <img src="/logo192.jpg" width="46" height="46" className="image-logo rounded shadow" alt="Kolgaev.ru" />
                            <span className="welcome-title">Кolgaev.ru</span>
                        </div>

                    </div>

                </div>

                {/* <div className="text-center my-4">
                    <h3 className="font-weight-bold">Добро пожаловать!</h3>
                    <div>
                        <span></span>
                    </div>
                </div> */}

            </>
        )

    }

}

export default Main;