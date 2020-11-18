import React from 'react'
import './index.css'
import { Component } from 'react'

class ForeverBrandBanner extends Component {

    render() {

        var src = window.WEB_CONFIG.hoverEffects.bannerSrc;

        const frameStyleString = {
            width: this.props.paneSize.w,
            height:  this.props.h,
            top: this.props.top,
            backgroundSize: 'cover',
            backgroundImage: 'url('+ src +')'
        };

        return <div className="bb2 foreverBrandBanner about-move-bg" style={frameStyleString} />;
    }
}

export default ForeverBrandBanner;