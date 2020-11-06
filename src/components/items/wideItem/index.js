import React from 'react';
import './index.css';
import './debug.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from './../../mediaViewer/imageItem';

class WideItem extends Component {

    render() {

        console.log("[WideItem] RENDER: ");
        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;
        var classNameString = 'gridItem';
        var iw = GridDataHandler.getImageData( imgDat, "WIDTH", true );
        var ih = GridDataHandler.getImageData( imgDat, "HEIGHT", true );

        return <div 
            key={imgDat.name}
            className={ classNameString } 
            onClick={ this.props.clickFunc? () => this.props.clickFunc(imgDat) : (()=>{ console.log("CLICK ON ELEMENT!")})}
            style={{
                "width": itemCal.frmW + 0 + "px", 
                "height": itemCal.totalComponetH +"px", 
                "backgroundColor": itemCal.imgBgColor || "transparent", 
                "position": "absolute",
                "top": itemCal.top +"px",
                "left": itemCal.left +"px"
            }}
        >

            <ImageItem 
                align={GridDataHandler.getImageData( imgDat, "ALIGN")}
                frameSize={{ w: itemCal.frmW, h: itemCal.frmH }}
                imageSize={{w: iw, h: ih}}
                imageSource={GridDataHandler.getImageData(imgDat, "SOURCE")}
                antialiasing={true}
                debug={window.WEB_DEBUG._GUIDES.gridImagesCalculations}
                cropStrategy={GridDataHandler.getImageData(imgDat, "cropStrategy") || 'DEFAULT'}>
            </ImageItem>

            { window.WEB_DEBUG._GUIDES.imageIndexes && <><div className={"arrIndex"}>{imgDat.index}</div><div className={"debug " + (imgDat.parent?' is-children':'')}>{imgDat.id}<br/>
                {imgDat.type}{imgDat.children && <><br/><div className="debug children">{imgDat.children.map((id) => <div key={id} className="id">{id}</div>)}</div></>}</div></>}
            { (window.WEB_DEBUG._GUIDES.gridImagesTags && imgDat.tags) && <div className="tagsDebug">{imgDat.tags.map( (label) => <>{label}<br/></> )}</div>}
            { (window.WEB_DEBUG._GUIDES.gridImagesTags && (!imgDat.tags || imgDat.tags.length == 0)) && <div className="tagsDebug noTags">No tags!</div>}
            
        </div>;
    }
}

export default WideItem;