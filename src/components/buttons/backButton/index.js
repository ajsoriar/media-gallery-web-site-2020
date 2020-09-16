import React, { Component } from "react"
import Icon from './../../icon'
import './index.css'

class BackButton extends Component {
    render() {
        return (
            <div 
                className="backButton" 
                onClick={ this.props.clickFunc? () => this.props.clickFunc() : (()=>{ console.log("Click on button!") }) }>
                    <Icon width={30} name={'arrow-left'}/>Go back</div>
        );
    }
}

export default BackButton;
