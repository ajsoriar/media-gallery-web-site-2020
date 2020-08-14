import React from 'react';
import './index.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from './../../mediaViewer/imageItem';
import ItemFooter from './../itemFooter';
import ItemOverlapDetail from './../itemOverlapDetail';

class GridItem extends Component {

    render() {

        console.log("[GridItem] RENDER: ");
        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;

        return <div 
            key={imgDat.name} 
            className={'gridItem'} 
            // onClick={ this.props.clickFunc? () => this.props.clickFunc(imgDat) : (()=>{ console.log("CLICK ON ELEMENT!")})}
            onClick={ ()=>{ console.log("CLICK ON ELEMENT!")} }
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
                debug={false}
                cropStrategy={GridDataHandler.getImageData(imgDat, "cropStrategy") || 'DEFAULT'}>
            </ImageItem>
        { this.props.debug && <><div className={"arrIndex"}>{imgDat.index}</div><div className={"debug " + (imgDat.parent?' is-children':'')}>{imgDat.id}<br/>
            {imgDat.type}{imgDat.children && <><br/><div className="debug children">{imgDat.children.map((id) => <div key={id} className="id">{id}</div>)}</div></>}</div></>}
            { (itemCal.headerOverlap && imgDat.header) && <ItemOverlapDetail position={'TOP'} itemData={imgDat.header} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}
            { (itemCal.footerOverlap && imgDat.footer) && <ItemOverlapDetail position={'BOTTOM'} itemData={imgDat.footer} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}
            { (itemCal.showFooter && imgDat.footer) && <ItemFooter footerData={imgDat.footer} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} /> }
        </div>;
    }
}

export default GridItem;