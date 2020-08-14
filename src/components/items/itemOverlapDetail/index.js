import React from 'react'
import './index.css'
import { Component } from 'react'
//import FooterDataHandler from './dataHandler'

class ItemOverlapDetail extends Component {

    render() {
        console.log("[ItemOverlapDetail] RENDER: ");
        var itemData = this.props.itemData;
        var frameData = this.props.frameData;

        var styleObj = {
            //"bottom": -100 +"px", 
            
            "left": 7 +"px", 
            "width": frameData.w - 14 +"px",
            "height": "fit-content"            
        };

        if ( this.props.position === 'BOTTOM') {
            styleObj.top =  7+ frameData.h - 50 +"px";
        } else {
            styleObj.top =  7+"px";
        }

        return <div className="itemOverlapDetail" style={styleObj}>
                    {/* {d.footer}, {frmH}, {d.type} */}
                    {/* {d.name} */}
                    <div className="title" style={{"width": frameData.w - 14 + "px" }}>{itemData.title}</div>
                    {/* {d.tags} */}
                    <div className="date" style={{"width": frameData.w - 14 + "px" }}>{itemData.date}</div>
        </div>;
    }
}

export default ItemOverlapDetail;