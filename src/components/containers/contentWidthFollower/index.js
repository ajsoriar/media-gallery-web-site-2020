import React from 'react';
import './index.css';
import { Component } from 'react';
import ColumnsDataHandler from './../columns/columnsDatahandler';
//import DisplayColumnsDebug from './displayColumnsDebug';
//import LandingGrid from './../../landingGrid/index';

class ContentWidthFollower extends Component {

    /*

    ColumnsDataHandler.calculateMainContainer = function ( props ) {

    var browser_width = parseInt(props.browserWidth);
    var minColumWidth = parseInt(props.minColumWidth);
    var maxWidth = parseInt(props.maxContainerWidth);
    var sideMargin = parseInt(props.sideMargin);

    */
        
    render() {

        var calc = ColumnsDataHandler.calculateColumns(this.props);
        //     columns = [];

        // var columnHtml = (colNum) => <div key={colNum} className="debugColumn" style={{
        //     width: calc.width_of_one_column,
        //     left: calc.width_of_one_column * ( colNum - 1) + this.props.hmargin * ( colNum - 1)
        // }}>{colNum}</div>

        // for (let i = 1; i <= calc.current_Columns_num; i++) columns.push(columnHtml(i));

        // var strHtml = <div className="columnsContainer" style={{ width: calc.container_width, left: calc.container_side_margin }}> 
        //     {columns}
        // </div>;

        // var grid = {

        //     // Configuration of the gallery
        //     galleryTop: 0; //parseInt(this.props.itemsProperties.galleryTop),
        //     galleryLeft: parseInt(calc.container_side_margin),

        //     // Configuration of gallery items
        //     showChildrenItems: this.props.itemsProperties.showChildrenItems,
        //     vMargin: parseInt(this.props.itemsProperties.vMargin),
        //     headerOverlap: this.props.itemsProperties.headerOverlap,
        //     footerOverlap: this.props.itemsProperties.footerOverlap,
        //     showFooter: this.props.itemsProperties.showFooter
        // };

        var styleObj = {
            width: calc.container_width,
            left: calc.container_side_margin,
            top: this.props.top || 0
        };

        return <>
            {/* {window.WEB_DEBUG._GUIDES.columns && strHtml}
            {window.WEB_DEBUG._PANELS.panel_algorithm && <DisplayColumnsDebug 
                calc={calc}
                inputs={this.props}
                clickFunc={()=>{window.WEB_DEBUG._PANELS.panel_algorithm=false;this.setState({})}}
            />} */}

            <div className={'contentWidthFollower'} style={ styleObj }>
                {this.props.children}
            </div>
        </>
    }
}

export default ContentWidthFollower;