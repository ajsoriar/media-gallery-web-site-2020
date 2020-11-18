import React from 'react'
import './index.css';

function checkColorValue(value) {
    if ( value >= 0  && value <= 255 ) return true;
    return false;
}

const FadeInAndOut = ({r, g, b, fade, h}) => {

    var col1 = "rgba(0,0,0,0)";
    var col2 = "rgba(0,0,0,1)";
    var bgCol = "rgba(0,0,0,1)";
    var fadeInOut = "IN"; // OUT
    var he = "100";

    if ( checkColorValue( r ) && checkColorValue( g ) && checkColorValue( b ) ) {
        col1 = "rgba("+ r +","+ g +","+ b +",0)";
        col2 = "rgba("+ r +","+ g +","+ b +",1)";
        bgCol = "rgba("+ r +","+ g +","+ b +",1)";
    }

    if ( fade != null && fade === "OUT") fadeInOut = "OUT"

    if ( fadeInOut === "IN" ) {
        var temp = col2;
        col2 = col1;
        col1 = temp;
    }

    if ( h != null ) he = h; 

    var styleName = "fadeInAndOut "+ fadeInOut;
    var cssString = {
        "backgroundColor": bgCol,
        "background": "linear-gradient(to bottom,  "+ col1 +" 0%, "+ col2 +" 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+ col1 +"', endColorstr='"+ col2 +"',GradientType=0 )",
        "height": he + 'px'
    };
    
    return <div className={styleName} style={cssString} />
}

export default FadeInAndOut;