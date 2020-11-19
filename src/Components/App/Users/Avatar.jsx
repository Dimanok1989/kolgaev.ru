import React from 'react';

class Avatar extends React.Component {

    render() {

        if (this.props.img)
            return <span>
                <img src={this.props.img} className="avatar" alt="Аватар" />
            </span>

        let name = "";

        if (this.props.name)
            name += String(this.props.name)[0].toUpperCase();

        if (this.props.surname)
            name += String(this.props.surname)[0].toUpperCase();

        if (name !== "")
            name = <small><b>{name}</b></small>

        return <span className="avatar-no-image d-flex justify-content-center align-items-center">
            {name}
        </span>;

    }

}

export default Avatar;