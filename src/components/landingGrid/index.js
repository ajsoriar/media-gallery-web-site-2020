import React from 'react'
import { Component } from 'react'
import GridDataHandler from './gridDataHandler.js'
import './index.css'
import GridItem from './../items/gridtem'
import FolderItem from './../items/folderItem'
import TagsDataHandler from './../tagsList/tagsDataHandler'

const GetItemByType = function( itemData, clickFunc, i, debug ) {

    console.log("[GetItemByType] itemData: ", itemData );
    switch (itemData.type) {
        case "FOLDER":
            return <FolderItem
                key={ i }
                index = { i }
                imgDat = { itemData }
                clickFunc = { clickFunc }
                debug = { debug }
            />

        default:
            return <GridItem
                key={ i }
                index = { i }
                imgDat = { itemData }
                clickFunc = { clickFunc }
                debug = { debug }
            />
    }
}

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
        
        if ( !this.props.showChildrenItems ) data = GridDataHandler.removeChildrenItems( data ); // Clear children items

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

        return <div className='galleryGrid' style={{"top": this.props.top +'px', "left": this.props.left }}>
            { data && data.map((imgDat, i) => GetItemByType( imgDat, this.props.clickFunc, i, LandingData.galleryConfig.debug )) }
        </div>
    }
}

export default LandingGrid;