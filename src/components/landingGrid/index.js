import React from 'react'
import { Component } from 'react'
import GridDataHandler from './gridDataHandler.js'
import './index.css'
import GridItem from './../items/gridtem'
import FolderItem from './../items/folderItem'
import WideItem from './../items/wideItem'
import TagsDataHandler from './../tagsList/tagsDataHandler'
import NoResultsMessage from './../noResultsMessage'
import GoToTop from './../scroll/goToTop'
import TitleItem from './../items/titleItem'

const GetItemByType = function( itemData, clickFunc, i, debug ) {

    //console.log("[GetItemByType] itemData: ", itemData );
    switch (itemData.type) {
        case "FOLDER":
            return <FolderItem
                key={ i }
                index = { i }
                imgDat = { itemData }
                clickFunc = { clickFunc }
                debug = { debug }
            />

        case "WIDE_ITEM":
            return <WideItem
                key={ i }
                index = { i }
                imgDat = { itemData }
                clickFunc = { clickFunc }
                debug = { debug }
            />
        
        case "TITLE":
            return <TitleItem
                key={ i }
                index = { i }
                imgDat = { itemData }
                text = { itemData.title }
                size = { itemData.size || 1 }
            />

        case "END_OF_GALLERY":
            
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
        
        var data = GridDataHandler.removeItemsByType(LandingData.items, "INFO");

        data = GridDataHandler.getTags( data, TagsDataHandler.getSelectedTagID() );
        
        //console.log("[LandingGrid] data:", data );

        if ( data.length === 0 ) {
            window.WEB_GLOBAL.gallery_w = 0;
            return <NoResultsMessage></NoResultsMessage>
        }

        window.MEDIA_VIEWER_DATA = {
            "galleryConfig": LandingData.galleryConfig,
            "items": GridDataHandler.generateMediaViewerData( data )
        };
        
        if ( !this.props.showChildrenItems ) data = GridDataHandler.removeChildrenItems( data ); // Clear children items

        var jsonData = GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS(
            data, 
            this.props.columnsNum, 
            this.props.columnWidth, 
            this.props.columnMargin, 
            this.props.vMargin,
            this.props.showFooter, 
            this.props.footerOverlap,
            this.props.headerOverlap  
        );

        console.log("[LandingGrid] jsonData:", jsonData );

        var gallery_w = jsonData.w;
        var gallery_h = jsonData.h;
        data = jsonData.arr;

        window.WEB_GLOBAL.gallery_w = gallery_h;

        return <>
            <div className='galleryGrid' style={{"top": this.props.top +'px', "left": this.props.left, width: gallery_w, height: gallery_h }}>
                { data && data.map((imgDat, i) => GetItemByType( imgDat, this.props.clickFunc, i, LandingData.galleryConfig.debug )) }
            </div>
            { window.WEB_GLOBAL && window.innerHeight < window.WEB_GLOBAL.gallery_w && <GoToTop /> }
        </>
    }
}

export default LandingGrid;