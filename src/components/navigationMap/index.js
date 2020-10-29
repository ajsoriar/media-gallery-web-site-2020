import React, { Component } from "react"
import Icon from './../icon'
import './index.css'

class NavigationMap extends Component {
    render() {
        var arr = this.props.data;
        const listItems = arr.map((item, index) => <div
            className={'navItem'}
            key={index}
            index = { index }
            item = { item }
            onClick = { this.props.clickFunc? () => this.props.clickFunc(index) : ((index)=>{ console.log("Click on NavigationMap Item ", index, "!") }) }
        >
            <Icon width={28} name={'folder-icon'} margin={'0 5px 0 0'}/>
                {item.title}
                {/* <br/><div>{item.galleryFile}</div> */}
            <Icon width={30} name={'arrow-right'}/></div>);
        
        return (
            <div className="navigationMap">{ listItems }</div>
        );
    }
}

export default NavigationMap;
