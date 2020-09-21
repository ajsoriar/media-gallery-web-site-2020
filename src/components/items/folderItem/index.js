import React from 'react';
import './index.css';
import { Component } from 'react';
import GridDataHandler from '../../landingGrid/gridDataHandler';
import ImageItem from '../../mediaViewer/imageItem';
import ItemFooter from '../itemFooter';
import ItemOverlapDetail from '../itemOverlapDetail';
//import FooterDataHandler from './../itemFooter/dataHandler';
import ForeverBrandBanner from '../../banners/foreverBrandBanner';
import Icon from '../../icon'

class FolderItem extends Component {

    render() {

        var imgDat = this.props.imgDat;
        var itemCal = imgDat.calculated;

        var SHOW_ZOOM = window.WEB_CONFIG.ITEMS_HOVER.zoom.isOn;
        if (imgDat.hover != undefined && imgDat.hover.zoom != undefined ) SHOW_ZOOM = imgDat.hover.zoom;
        var classNameString = 'folderItem';
        if ( SHOW_ZOOM ) classNameString += ' _show_zoom';

        var name = imgDat.name || "Untitled folder";

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

            <div className={'folderNameContainer'} style={{
                top: itemCal.frmW - 19 + "px"
            }}>
                <div className={'folderName'}>{name}</div>
            </div>

            <Icon center={false} width={itemCal.frmW} name={'folder-item'}></Icon>

            { (itemCal.showFooter && imgDat.footer) && <ItemFooter 
                footerData={imgDat.footer} 
                frameData={{ w: itemCal.frmW, h: itemCal.frmH }} 
                footerH={itemCal.myFooterHeight}
            /> }

        </div>;
    }
}

export default FolderItem;