import React from 'react'
import './index.css'
import { Component } from 'react'
//import FooterDataHandler from './dataHandler'

class ForeverBrandBanner extends Component {

    render() {

        console.log("[foreverBrandBanner] RENDER!");

        // <ForeverBrandBanner className="foreverBrandBanner" src="josesoriarodriguez.svg" paneSize={{ w: itemCal.imgW, h: itemCal.imgH }}></ForeverBrandBanner>

        const frameStyleString = {
            width: this.props.paneSize.w,
            height:  this.props.h,
            top: this.props.top,
            backgroundSize: 'cover'
        };

        // const animatedBoxStyleString = {
        //     width: this.props.w, //this.props.paneSize.w || '100px',
        //     height: this.props.h, //this.props.paneSize.h || '100px',
        //     top: this.props.top,
        //     backgroundImage: './assets/'+ this.props.src
        // };

        // var footerData = this.props.footerData;
        // var frameData = this.props.frameData;
        // var footerH = FooterDataHandler.getFooterHeight(footerData);
        return <div className="bb2 foreverBrandBanner about-move-bg" style={frameStyleString}>
            {/* <div className="animation" style={animatedBoxStyleString} ></div> */}
        </div>;
    }
}

export default ForeverBrandBanner;