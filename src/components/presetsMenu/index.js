import React from 'react';
import './index.css';
import { Component } from 'react';

class PresetsMenu extends Component {

    render() {

        //console.log("[PresetsMenu] RENDER");
        var mnuData = this.props.mnuData;

        var menuItems = mnuData.map((item, index) => <li
            onClick={ () => this.props.clickFunction(item) }
            key={index}
            index = { index }>{item.title}
        </li>);

        return <div className={'presetsMenu'}>   
            {this.props.title}
            <ul className={'butonsBox'}>{menuItems}</ul>
        </div>;
    }
}

export default PresetsMenu;