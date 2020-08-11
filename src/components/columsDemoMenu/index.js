import React from 'react'
import './index.css'
import { Component } from 'react'

class ColumsDemoMenu extends Component {

    constructor() {
        super();
    }

    render() {
        const {onChangeCallback} = this.props;

        console.log(onChangeCallback);

        return <div className="columsMenu">
            <ul className="listOfColumTypes">
                <li onClick={()=>onChangeCallback("uno")}>Uno</li>
                <li onClick={()=>onChangeCallback(2)}>Dos</li>
                <li onClick={()=>onChangeCallback(3)}>Tres</li>
                <li onClick={()=>onChangeCallback(4)}>Cuatro</li>
                <li onClick={()=>onChangeCallback("cinco")}>Cinco</li>
                <li onClick={()=>onChangeCallback(6)}>Seis</li>
            </ul>
        </div>
    }
}

export default ColumsDemoMenu;