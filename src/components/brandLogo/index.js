import React from 'react'
import { Component } from 'react'
import ImageItem from './../../components/mediaViewer/imageItem'
import './index.css'

class BrandLogo extends Component {

    render() {

        var logoSrc =  this.props.source.src;
        var brandText = this.props.text || "VOID";
        var source = this.props.source;

        const frameStyleString = {
            position: 'relative',
            width: source.size.w,
            height: source.size.h,
            top: source.top + "px",
            left: source.left + "px",
            fill: "#00f"
        };

        if ( logoSrc != null ) return (
            <div className="brandLogo" style={frameStyleString} onClick={() => { this.props.clickFunc(); } }>
                <ImageItem
                    frameSize={{w: source.size.w, h: source.size.h}}
                    imageSize={{w: source.size.w, h: source.size.h}}
                    imageSource={ logoSrc }
                    antialiasing={true}
                    cropStrategy={'DEFAULT'}
                    loadingLayer={false}
                    debug={window.false}
                    hideLoading={true}
                />
            </div>
        );

        return <div className="brandLogo brandText" style={frameStyleString} onClick={() => { this.props.clickFunc(); } } >{!logoSrc && <>{brandText}</>}</div>;
    }
}

export default BrandLogo;