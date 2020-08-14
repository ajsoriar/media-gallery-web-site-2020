import React from 'react'
import './index.css'
import { Component } from 'react'
import FooterDataHandler from './dataHandler'

class ItemFooter extends Component {

    render() {
        console.log("[ItemFooter] RENDER: ");
        var footerData = this.props.footerData;
        var frameData = this.props.frameData;
        var footerH = FooterDataHandler.getFooterHeight(footerData);

        return <div className="itemFooter" style={{
                    "top": frameData.h + 10 + "px", 
                    "height": footerH + 0 + "px", 
                    "width": frameData.w + 0 + "px"
                }}>
                    {/* {d.footer}, {frmH}, {d.type} */}
                    {/* {d.name} */}
                    <div className="title" style={{"width": frameData.w + 0 + "px" }}>{footerData.title}</div>
                    {/* {d.tags} */}
                    <div className="date" style={{"width": frameData.w + 0 + "px" }}>{footerData.date}</div>
        </div>;
    }
}

export default ItemFooter;