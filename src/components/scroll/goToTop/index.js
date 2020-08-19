import React, { Component } from "react";
import './index.css';

class GoToTop extends Component {
    render() {
        return (<div className="goToTopbutton" onClick={ () => {
            console.log("GO TO TOP!");
            document.getElementById("root").scrollTop = 0
        }}>top</div>);
    }
}

export default GoToTop;