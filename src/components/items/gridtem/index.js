import React from 'react';
import './index.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from './../../mediaViewer/imageItem';
import ItemFooter from './../itemFooter';
import ItemOverlapDetail from './../itemOverlapDetail';
//import FooterDataHandler from './../itemFooter/dataHandler';
import ForeverBrandBanner from './../../banners/foreverBrandBanner';

class GridItem extends Component {

    render() {

        console.log("[GridItem] RENDER: ");
        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;

        return <div 
            key={imgDat.name} 
            className={'gridItem'} 
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

            <ForeverBrandBanner 
                className="brandBanner" 
                src="josesoriarodriguez.svg" 
                paneSize={{ 
                    w: itemCal.frmW, 
                    h: itemCal.frmH - 10
                }} 
                top={ itemCal.imageCenter.y - 53 / 2}  
                w={513}
                h={53} 
            />

            { window.WEB_DEBUG.imageIndexes && <><div className={"arrIndex"}>{imgDat.index}</div><div className={"debug " + (imgDat.parent?' is-children':'')}>{imgDat.id}<br/>
                {imgDat.type}{imgDat.children && <><br/><div className="debug children">{imgDat.children.map((id) => <div key={id} className="id">{id}</div>)}</div></>}</div></>}
            { (window.WEB_DEBUG.gridImagesTags && imgDat.tags) && <div className="tagsDebug">{imgDat.tags.map( (label) => <>{label}<br/></> )}</div>}
            { (window.WEB_DEBUG.gridImagesTags && (!imgDat.tags || imgDat.tags.length == 0)) && <div className="tagsDebug noTags">No tags!</div>}
            { (itemCal.headerOverlap && imgDat.header) && <ItemOverlapDetail position={'TOP'} itemData={imgDat.header} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}
            { (itemCal.footerOverlap && imgDat.footer) && <ItemOverlapDetail position={'BOTTOM'} itemData={imgDat.footer} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}

            { (itemCal.showFooter && imgDat.footer) && <ItemFooter 
                footerData={imgDat.footer} 
                frameData={{ w: itemCal.frmW, h: itemCal.frmH }} 
                footerH={itemCal.myFooterHeight} //{100} 
                // = this.props.footerH; //FooterDataHandler.getFooterHeight(footerData);
            /> }
        </div>;
    }
}

export default GridItem;