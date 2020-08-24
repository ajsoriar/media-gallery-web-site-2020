import React from 'react';
import './index.css';
import { Component } from 'react';
import ColumnsDataHandler from './columnsDatahandler';
import DisplayColumnsDebug from './displayColumnsDebug';
import LandingGrid from './../../landingGrid/index';

class Columns extends Component {

    render() {

        var calc = ColumnsDataHandler.calculateColumns(this.props), 
            columns = [];

        var columnHtml = (colNum) => <div key={colNum} className="debugColumn" style={{
            width: calc.width_of_one_column,
            left: calc.width_of_one_column * ( colNum - 1) + this.props.hmargin * ( colNum - 1)
        }}>{colNum}</div>

        for (let i = 1; i <= calc.current_Columns_num; i++) columns.push(columnHtml(i));

        var strHtml = <div className="columnsContainer" style={{ width: calc.container_width, left: calc.container_side_margin }}>
            <DisplayColumnsDebug calc={calc} inputs={this.props} />
            {columns}
        </div>;

        var grid = {

            // Configuration of the gallery
            galleryTop: parseInt(this.props.itemsProperties.galleryTop),
            galleryLeft: parseInt(calc.container_side_margin),
            showMediaViewer: false,
            columnsNum: parseInt (calc.current_Columns_num),
            columnWidth: parseInt(calc.width_of_one_column),
            columnMargin: parseInt(this.props.hmargin),
            
            // Configuration of gallery items
            showChildrenItems: this.props.itemsProperties.showChildrenItems,
            vMargin: parseInt(this.props.itemsProperties.vMargin),
            headerOverlap: this.props.itemsProperties.headerOverlap,
            footerOverlap: this.props.itemsProperties.footerOverlap,
            showFooter: this.props.itemsProperties.showFooter
        };

        return <>
            {window.WEB_DEBUG.gridAlgorithm && strHtml}
            <LandingGrid 
                top={grid.galleryTop}
                left={grid.galleryLeft}
                columnsNum={grid.columnsNum}
                columnWidth={grid.columnWidth}
                columnMargin={grid.columnMargin}
                vMargin={grid.vMargin}
                headerOverlap={grid.headerOverlap}
                footerOverlap={grid.footerOverlap}
                showFooter={grid.showFooter}
                showChildrenItems={grid.showChildrenItems}
                className={'landingGridStyle'} 
                clickFunc={ ( pic ) => {
                    console.log("pic:", pic );
                    this.props.openCloseViewer( pic );
                } }
                imagesData={this.props.imagesData}
            />
        </>
    }
}

export default Columns;