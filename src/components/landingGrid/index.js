import React from 'react';
import { Component } from 'react';
import GridDataHandler from './gridDataHandler.js';
import './index.css';
import GridItem from './../items/gridtem';
import TagsDataHandler from './../tagsList/tagsDataHandler';

class LandingGrid extends Component {

    render () {

        var LandingData = this.props.imagesData || null;
        if (LandingData === null ) return <div>NO ITEMS</div>;
        
        var data = GridDataHandler.removeInfoItems( LandingData.items ); // Clear visual guides / INFO

        data = GridDataHandler.getTags( data, TagsDataHandler.getSelectedTagID() );

        window.MEDIA_VIEWER_DATA = {
            "galleryConfig": LandingData.galleryConfig,
            "items": GridDataHandler.generateMediaViewerData( data )
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
            debug = { LandingData.galleryConfig.debug }
        />);

        return <div className='galleryGrid' style={{"top": this.props.top +'px', "left": this.props.left }}>
            {/* { !this.state.loaded && <div class="pictureLoading">Loading ...</div> } */}
            {/* { !this.state.loaded && <LoadingLayer/> } */}
            { listItems }
        </div>
    }
}

export default LandingGrid;