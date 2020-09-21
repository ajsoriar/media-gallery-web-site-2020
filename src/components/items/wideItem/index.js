import React from 'react';
import './index.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from './../../mediaViewer/imageItem';

class WideItem extends Component {

    render() {

        console.log("[WideItem] RENDER: ");
        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;

        return <div 
            onClick={ this.props.clickFunc? () => this.props.clickFunc(imgDat) : (()=>{ console.log("CLICK ON ELEMENT!")})}
            style={{
                "width": itemCal.frmW + 0 + "px", 
                "height": itemCal.totalComponetH +"px", 
                "backgroundColor": itemCal.imgBgColor || "gray", 
                "position": "absolute",
                "top": itemCal.top +"px",
                "left": itemCal.left +"px"
            }}
        >

            <ImageItem 
                frameSize={{ w: itemCal.frmW, h: itemCal.frmH }}
                imageSize={{ w: itemCal.imgW, h: itemCal.imgH }}
                imageSource={GridDataHandler.getImageData(imgDat, "SOURCE")}
                antialiasing={true}
                debug={window.WEB_DEBUG.gridImages}
                cropStrategy={GridDataHandler.getImageData(imgDat, "cropStrategy") || 'DEFAULT'}>
            </ImageItem>

        </div>;
    }
}

export default WideItem;