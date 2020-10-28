import React from 'react';
import './index.css';
import './debug.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from './../../mediaViewer/imageItem';
import ItemFooter from './../itemFooter';
import ItemOverlapDetail from './../itemOverlapDetail';
import ForeverBrandBanner from './../../banners/foreverBrandBanner';
import Icon from './../../icon'

class GridItem extends Component {

    render() {

        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;

        var SHOW_BORDER = window.WEB_CONFIG.ITEMS_HOVER.border.isOn;
        var SHOW_ZOOM = window.WEB_CONFIG.ITEMS_HOVER.zoom.isOn;
        var SHOW_TRANSLUCENT = window.WEB_CONFIG.ITEMS_HOVER.translucent.isOn;
        var SHOW_OVERLAY = window.WEB_CONFIG.ITEMS_HOVER.overlay.isOn;
        var SHOW_ITEM_BANNER = window.WEB_CONFIG.ITEMS_HOVER.banner.isOn;
        var SHOW_ITEM_SHADOW = window.WEB_CONFIG.ITEMS_HOVER.shadow.isOn;
        var SHOW_OVERLAY_TEXT = window.WEB_CONFIG.ITEMS_HOVER.overlayText.isOn;

        if (imgDat.hover != undefined && imgDat.hover.border != undefined ) SHOW_BORDER = imgDat.hover.border;
        if (imgDat.hover != undefined && imgDat.hover.zoom != undefined ) SHOW_ZOOM = imgDat.hover.zoom;
        if (imgDat.hover != undefined && imgDat.hover.translucent != undefined ) SHOW_TRANSLUCENT = imgDat.hover.translucent;
        if (imgDat.hover != undefined && imgDat.hover.overlay != undefined ) SHOW_OVERLAY = imgDat.hover.overlay;
        if (imgDat.hover != undefined && imgDat.hover.banner != undefined ) SHOW_ITEM_BANNER = imgDat.hover.banner;
        if (imgDat.hover != undefined && imgDat.hover.shadow != undefined ) SHOW_ITEM_SHADOW = imgDat.hover.shadow;
        if (imgDat.hover != undefined && imgDat.hover.overlayText != undefined ) SHOW_OVERLAY_TEXT = imgDat.hover.overlayText;

        var classNameString = 'gridItem';
        if ( SHOW_BORDER ) classNameString += ' _show_border';
        if ( SHOW_ZOOM ) classNameString += ' _show_zoom';
        if ( SHOW_OVERLAY ) classNameString += ' _show_overlay';
        if ( SHOW_TRANSLUCENT ) classNameString += ' _show_translucent';
        if ( SHOW_ITEM_SHADOW ) classNameString += ' _show_shadow';
        var overlayBrandText = '';
        if ( SHOW_OVERLAY_TEXT ) {
            classNameString += ' _show_overlay_text';
            overlayBrandText = window.WEB_CONFIG.ITEMS_HOVER.overlayText.brandText || '';
        }

        var imageSrc = GridDataHandler.getImageData(imgDat, "SOURCE");

        return <div 
            key={imgDat.name} 
            className={ classNameString } 
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
            
            {(imgDat.type != 'FOLDER') && <ImageItem 
                loadingLayer={true}
                frameSize={{ w: itemCal.frmW, h: itemCal.frmH }}
                imageSize={{ w: itemCal.imgW, h: itemCal.imgH }}
                imageSource={imageSrc}
                antialiasing={true}
                debug={window.WEB_DEBUG._GUIDES.gridImagesCalculations}
                cropStrategy={GridDataHandler.getImageData(imgDat, "cropStrategy") || 'DEFAULT'}>
            </ImageItem>}

            {SHOW_ITEM_BANNER && <ForeverBrandBanner 
                className="brandBanner" 
                src={"josesoriarodriguez.svg"}
                paneSize={{ 
                    w: itemCal.frmW, 
                    h: itemCal.frmH - 10
                }} 
                top={ itemCal.imageCenter.y - window.WEB_CONFIG.brandLogo.size.h / 2}  
                w={window.WEB_CONFIG.brandLogo.size.w}
                h={window.WEB_CONFIG.brandLogo.size.h} 
            />}

            {SHOW_OVERLAY && <div 
                className="overlay" 
                style={{
                    "width": itemCal.frmW + "px",
                    "height": itemCal.frmH +"px",
                    "lineHeight": itemCal.frmH +"px",
                    "backgroundColor": "black",
                }}></div>}

            {SHOW_OVERLAY_TEXT && <div 
                className="overlayText" 
                style={{
                    "width": itemCal.frmW + "px",
                    "height": itemCal.frmH +"px",
                    "lineHeight": itemCal.frmH +"px",
                }}><span></span>view<span></span></div>}
            
            {imgDat.type === 'VIDEO' && <div className="center"><Icon center={true} width={60} name={'video-item'}></Icon></div>}

            {imgDat.type === 'FOLDER' && <div className="center"><Icon center={true} width={itemCal.frmW} name={'folder-item'}></Icon></div>}

            { window.WEB_DEBUG._GUIDES.imageIndexes && <><div className={"arrIndex"}>{imgDat.index}</div><div className={"debug " + (imgDat.parent?' is-children':'')}>{imgDat.id}<br/>
                {imgDat.type}{imgDat.children && <><br/><div className="debug children">{imgDat.children.map((id) => <div key={id} className="id">{id}</div>)}</div></>}</div></>}
            { (window.WEB_DEBUG._GUIDES.gridImagesTags && imgDat.tags) && <div className="tagsDebug">{imgDat.tags.map( (label) => <>{label}<br/></> )}</div>}
            { (window.WEB_DEBUG._GUIDES.gridImagesTags && (!imgDat.tags || imgDat.tags.length == 0)) && <div className="tagsDebug noTags">No tags!</div>}
            { (itemCal.headerOverlap && imgDat.header) && <ItemOverlapDetail position={'TOP'} itemData={imgDat.header} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}
            { (itemCal.footerOverlap && imgDat.footer) && <ItemOverlapDetail position={'BOTTOM'} itemData={imgDat.footer} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} />}
            { (itemCal.showFooter && imgDat.footer) && <ItemFooter footerData={imgDat.footer} frameData={{ w: itemCal.frmW, h: itemCal.frmH }} footerH={itemCal.myFooterHeight} /> }
        </div>;
    }
}

export default GridItem;