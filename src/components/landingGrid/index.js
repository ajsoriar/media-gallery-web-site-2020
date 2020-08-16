import React from 'react'
import { Component } from 'react'
import Landingdata from './../../demo/landing-data.json'
import GridDataHandler from './gridDataHandler.js'
import './index.css'
import GridItem from './../items/gridtem'

class LandingGrid extends Component {

    render () {

        // TODO: Remove all this stuff from render ASAP!

        var data;

        data = GridDataHandler.removeInfoItems( Landingdata.items ); // Clear visual guides / INFO

        window.MEDIA_VIEWER_DATA = {
            "galleryConfig": GridDataHandler.galleryConfig,
            "items": GridDataHandler.generateMediaViewerData( Landingdata.items )
        };
        
        if ( this.props.showChildrenItems !== true ) {
            data = GridDataHandler.removeChildrenItems( data ); // Clear children items
        }

        data = GridDataHandler.calculateGrid(
            data, 
            this.props.columnsNum, 
            this.props.columnWidth, 
            this.props.columnMargin, 
            this.props.vMargin,
            this.props.showFooter, 
            this.props.footerOverlap,
            this.props.headerOverlap  
        );
 
        console.log('[LandingGrid] data:', data );        

        const listItems = data.map((imgDat, index) => <GridItem
            key={index}
            index = { index }
            imgDat = { imgDat }
            clickFunc = { this.props.clickFunc }
            debug = { Landingdata.galleryConfig.debug }
        />);

        return <div className='galleryGrid' style={{"top": this.props.top +'px', "left": this.props.left }}>
            {/* { !this.state.loaded && <div class="pictureLoading">Loading ...</div> } */}
            {/* { !this.state.loaded && <LoadingLayer/> } */}
            { listItems }
        </div>
    }
}

export default LandingGrid;