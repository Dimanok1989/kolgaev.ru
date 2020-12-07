import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {

    componentDidMount() {

        let meta = document.createElement('meta');
        meta.name = "robots";
        meta.content = "noindex";
        document.getElementsByTagName('head')[0].appendChild(meta);

    }

    componentWillUnmount() {

        document.querySelector('head meta[name="robots"]').remove();

    }

    render() {

        return <div className="my-content text-center">
            <h3 className="mt-5 mb-1">
                <strong>404</strong>
                <span className="text-muted ml-3">Not Found</span>
            </h3>
            <Link to="/">Главная страница</Link>
        </div>

    }

}

export default NotFound;