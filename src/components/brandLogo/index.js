import React from 'react'
import { Component } from 'react'
import ImageItem from './../../components/mediaViewer/imageItem'
import './index.css'

class BrandLogo extends Component {

    render() {

        var logoSrc =  this.props.brandLogoSrc;
        var brandText = this.props.text || "VOID";

        const frameStyleString = {
            position: 'relative',
            width: window.WEB_CONFIG.brandLogo.size.w,
            height: window.WEB_CONFIG.brandLogo.size.h
        };

        if ( logoSrc != null ) return (
            <div className="brandLogo" style={frameStyleString} onClick={() => { this.props.clickFunc(); } }>
                <ImageItem
                    frameSize={{w: window.WEB_CONFIG.brandLogo.size.w, h: window.WEB_CONFIG.brandLogo.size.h}}
                    imageSize={{w: window.WEB_CONFIG.brandLogo.size.w, h: window.WEB_CONFIG.brandLogo.size.h}}
                    imageSource={ logoSrc }
                    antialiasing={true}
                    cropStrategy={'DEFAULT'}
                    loadingLayer={false}
                    debug={window.false}
                />
            </div>
        );

        return <div className="brandLogo brandText" style={frameStyleString} onClick={() => { this.props.clickFunc(); } } >{!logoSrc && <>{brandText}</>}</div>;
    }
}

export default BrandLogo;