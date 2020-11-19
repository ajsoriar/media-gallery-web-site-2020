import React from 'react'

function checkColorValue(value) {
    if ( value >= 0  && value <= 255 ) return true;
    return false;
}

// <SafeFrame frameWidth="27" opacity={0.7}></SafeFrame>
const SafeFrame = ({ frameWidth, opacity, r, g, b, w, h }) => {

    var _w = 1920;
    var _h = 1080;
    var _opacity = 1;
    var col = "rgba(0,0,0,0.5)";
    var _frameWidth = 27;

    if ( opacity != null ) _opacity = opacity;
    if ( frameWidth != null ) _frameWidth = frameWidth;

    if ( checkColorValue( r ) && checkColorValue( g ) && checkColorValue( b ) ) {
        col = "rgba("+ r +","+ g +","+ b +","+ opacity +")";
    }

    if ( w != null ) _w = w; 
    if ( h != null ) _h = h;

    var cssString1 = {
        "top": 0,
        "left": 0,
        "width": _w - _frameWidth + 'px',
        "height": _frameWidth + 'px',
        "backgroundColor": col,
        "opacity": _opacity,
        position: "fixed",
        display: "inline-block"
    };

    var cssString2 = {
        "top": 0,
        "left": _w - _frameWidth + 'px',
        "width": _frameWidth + 'px',
        "height": _h - frameWidth + 'px',
        "backgroundColor": col,
        "opacity": _opacity,
        position: "fixed",
        display: "inline-block"
    };

    var cssString3 = {
        "top":  _h - _frameWidth + 'px',
        "left": _frameWidth + 'px',
        "width": _w - _frameWidth + 'px',
        "height": _frameWidth + 'px',
        "backgroundColor": col,
        "opacity": _opacity,
        position: "fixed",
        display: "inline-block"
    };

    var cssString4 = {
        "top": _frameWidth + 'px',
        "left": 0,
        "width": _frameWidth + 'px',
        "height": _h - frameWidth + 'px',
        "backgroundColor": col,
        "opacity": _opacity,
        position: "fixed",
        display: "inline-block"
    };

    return <>
        <div style={cssString1} />
        <div style={cssString2} />
        <div style={cssString3} />
        <div style={cssString4} />
    </>
}

export default SafeFrame;