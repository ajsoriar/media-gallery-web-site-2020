import React from 'react'
import './index.css'
import { Component } from 'react'
//import FooterDataHandler from './footerDataHandler'

class ItemFooter extends Component {

    render() {
        console.log("[ItemFooter] RENDER: ");
        var myObject = this.props.footerData;
        var frameData = this.props.frameData;
        var footerH = this.props.footerH; //FooterDataHandler.getFooterHeight(footerData);

        const items = Object.keys(myObject).map(function(key, index) {
            var classNameString = "footerRow";
            if(key === "title") classNameString += " title";
            if(key === "date") classNameString += " date";
            if(key === "author") classNameString += " author";
            var str = myObject[key];
            return <div 
                key={key}
                className={classNameString}
                style={{
                    "width": frameData.w + 0 + "px",
                    "height": window.DEFAULTS.FOOTER_ROW_HEIGHT + 0 + "px",
                    "lineHeight": window.DEFAULTS.FOOTER_ROW_HEIGHT + 0 + "px",
                }}>{str}</div>
            });
          
        return <div className="itemFooter" style={{
                    "top": frameData.h + 10 + "px", 
                    "height": footerH + 0 + "px", 
                    "width": frameData.w + 0 + "px"
                }}>
                    {items}
        </div>;
    }
}

export default ItemFooter;