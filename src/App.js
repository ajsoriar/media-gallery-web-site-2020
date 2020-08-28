import React from 'react';
import { Component } from 'react';
import './App.css';
import './bgMediaQueries.css';
import Columns from './components/containers/columns';
import MainMenu from './components/mainMenu';
import EndOfContent from './components/items/endOfContentItem';
import Range from './components/range';
import AboutInfo from './components/aboutInfo';
import AndresCheckBox from './components/checkBox';
import MediaViewer from './components/mediaViewer';
import GoToTop from './components/scroll/goToTop';
import PresetsMenu from './components/presetsMenu';
import ListOfTags from './components/tagsList';
import IframeContent from './components/iframeContent';
import TagsDataHandler from './components/tagsList/tagsDataHandler';

class App extends Component {

    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    state = {
        imagesData: null,
        // Configuration of the columns
        browser_width: window.innerWidth, 
        browser_height: window.innerHeight,
        maxContainerWidth: window.WEB_CONFIG.columnsGrid.maxContainerWidth,
        maxNumOfColumns: window.WEB_CONFIG.columnsGrid.maxNumOfColumns,
        minColumWidth: window.WEB_CONFIG.columnsGrid.minColumWidth,
        sideMargin: window.WEB_CONFIG.columnsGrid.sideMargin,
        hmargin: window.WEB_CONFIG.columnsGrid.hmargin,
        // Configuration of the gallery
        showChildrenItems: window.WEB_CONFIG.columnsGrid.showChildrenItems,
        galleryTop: window.WEB_CONFIG.columnsGrid.galleryTop,
        vMargin: window.WEB_CONFIG.columnsGrid.vMargin,
        // Configuration of gallery items
        showFooter: window.WEB_CONFIG.columnsGrid.showFooter,
        footerOverlap: window.WEB_CONFIG.columnsGrid.footerOverlap,
        headerOverlap: window.WEB_CONFIG.columnsGrid.headerOverlap,
        // Picture viewer
        showMediaViewer: false,
        picture: 0,
        // Iframe
        showIframeContent: false,
        iframeSrc: null,
        // Tags
        webTags: [],
        curentSelectedtagId: null
    }

    updateRange = (event, target) => {
        switch ( target ) {
            case 'maxContainerWidth':
                this.setState({maxContainerWidth: event.target.value});
                break;
            case 'maxNumOfColumns':
                this.setState({maxNumOfColumns: event.target.value});
                break;
            case 'minColumWidth':
                this.setState({minColumWidth: event.target.value});
                break;
            case 'vMargin':
                this.setState({vMargin: event.target.value});
                break;
            case 'hmargin':
                this.setState({hmargin: event.target.value});
                break;
            case 'sideMargin':
                this.setState({sideMargin: event.target.value});
                break;
            case 'galleryTop':
                this.setState({galleryTop: event.target.value});
                break;
        }
    }

    openCloseViewer = (pic) => { this.setState({showMediaViewer: !this.state.showMediaViewer, picture: pic}); }
    openCloseIframe = (page) => { 
        console.log("[App] openCloseIframe(), page: ", page);
        if (!page) {
            this.setState({showIframeContent: false}); 
            return
        }
        this.setState({showIframeContent: true, iframeSrc: page}); 
    }

    headerOverlap = () => { this.setState({headerOverlap: !this.state.headerOverlap}); }
    footerOverlap = () => { this.setState({footerOverlap: !this.state.footerOverlap}); }
    swichFooter = () => { this.setState({showFooter: !this.state.showFooter}); }
    swichChildren = () => { this.setState({showChildrenItems: !this.state.showChildrenItems}); }

    chooseColumnsData(id) {
        var newConfig = window.WEB_DEBUG_DATA.columnsGrid[ id ];
        this.setState({ 
            maxContainerWidth: newConfig.maxContainerWidth,
            maxNumOfColumns: newConfig.maxNumOfColumns,
            minColumWidth: newConfig.minColumWidth,
            sideMargin: newConfig.sideMargin,
            hmargin: newConfig.hmargin,
            showChildrenItems: newConfig.showChildrenItems,
            galleryTop: newConfig.galleryTop,
            vMargin: newConfig.vMargin,
            showFooter: newConfig.showFooter,
            footerOverlap: newConfig.footerOverlap,
            headerOverlap: newConfig.headerOverlap,
        });
    };

    chooseStylesData(themeName) {
        console.log("PresetsMenu -> click, themeName: ", themeName); 
        let previousTheme = document.documentElement.getAttribute('data-theme');
        document.querySelector('body').classList.remove(previousTheme);
        document.documentElement.setAttribute('data-theme', themeName);
        document.querySelector('body').classList.add(themeName);
    };

    chooseSourceData(src) {
        console.log("PresetsMenu -> click, src: ", src ); 
        var that = this;

        fetch("./"+ src)
        .then(response => response.json())
        .then(data => {
            console.log("response: ",data);
            that.setState({ 
                imagesData: data,
                webTags: data.galleryConfig.tags || []
            });
        })
        .catch(console.error);
    };

    filterImagesByTag = (tagName) => {
        console.log("[App] filterImagesByTag(), tagName: ", tagName );
        TagsDataHandler.setSelectedTagTo(tagName);
        this.setState({ 
            curentSelectedtagId: tagName,
        });
    }

    updateDimensions() {
        this.setState({ 
            browser_width: window.innerWidth, 
            browser_height: window.innerHeight
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
        this.chooseSourceData('landing-data.2.json');
        this.chooseStylesData(window.WEB_DEBUG_DATA.mixMenu[2].paramArr[0]); // DEBUG
        this.chooseColumnsData(window.WEB_DEBUG_DATA.mixMenu[2].paramArr[1]); // DEBUG
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render () {
        var { maxContainerWidth, maxNumOfColumns, minColumWidth, vMargin, sideMargin, hmargin, browser_width, browser_height, galleryTop} = this.state;
        return  <>
            { this.state.imagesData && <Columns 
                browserWidth={browser_width}
                browserHeight={browser_height}
                maxNumOfColumns={maxNumOfColumns}
                minNumOfCoumns={1}
                minColumWidth={minColumWidth}
                maxContainerWidth={maxContainerWidth}
                vMargin={vMargin}
                sideMargin={sideMargin}
                hmargin={hmargin}
                itemsProperties={{
                    "galleryTop": this.state.galleryTop,
                    "vMargin": this.state.vMargin,
                    "headerOverlap": this.state.headerOverlap,
                    "footerOverlap": this.state.footerOverlap,
                    "showFooter": this.state.showFooter,
                    "showChildrenItems": this.state.showChildrenItems
                }}
                openCloseViewer={(pic) => {
                    this.setState({showMediaViewer: true, picture: pic}); 
                }}
                imagesData={this.state.imagesData }
            />}

            <MainMenu onClickFunction={(item)=> { 
                console.log(item);
                if ( item.type === 'TAG_FILTER' ) {
                    if (this.state.showIframeContent) this.openCloseIframe();
                    this.filterImagesByTag( item.tagName );
                } else if ( item.type === 'LINK' ) {
                    if (item.target="blank") {
                        window.open(item.url, '_blank');
                    } else {
                        window.open(item.url);
                    }
                } else if ( item.type === 'IFRAME_CONTENT' ) {
                    this.openCloseIframe( item.url );
                } else if ( item.type === 'ROUTE' ) {
                    // root/gallery:GALLERY_ID/item:ITEM_ID?
                }
            }} />

            {window.WEB_DEBUG.columnsDesigner && <div className="designer">
                <div className="debug-btn-close">close</div>
                <b>Gallery Columns</b>
                <Range label={'Max container width'} min="550" max="2600" step="50" defaultValue={maxContainerWidth} value={maxContainerWidth} onChange={(event)=> this.updateRange(event ,'maxContainerWidth')} />
                <Range label={'Max num. of columns'} min="1" max="20" step="1" defaultValue={maxNumOfColumns} value={maxNumOfColumns} onChange={(event)=> this.updateRange(event ,'maxNumOfColumns')} />
                <Range label={'Min column width'} min="120" max="300" step="10" defaultValue={minColumWidth} value={minColumWidth} onChange={(event)=> this.updateRange(event ,'minColumWidth')} />
                <Range label={'Columns margin'} min="0" max="100" step="5" defaultValue={hmargin} value={hmargin} onChange={(event)=> this.updateRange(event ,'hmargin')} />
                <Range label={'Side margins'} min="0" max="200" step="10" defaultValue={sideMargin} value={sideMargin} onChange={(event)=> this.updateRange(event ,'sideMargin')} />
                <br/>
                <b>Gallery Items</b>
                <Range label={'Gallery top'} min="0" max="200" step="10" defaultValue={galleryTop} value={galleryTop} onChange={(event)=> this.updateRange(event ,'galleryTop')} />
                <Range label={'Items v. margin'} min="0" max="100" step="5" defaultValue={vMargin} value={vMargin} onChange={(event)=> this.updateRange(event ,'vMargin')} />
                <AndresCheckBox label="Overlap header" callback={this.headerOverlap} checked={this.state.headerOverlap}></AndresCheckBox>
                <AndresCheckBox label="Overlap details" callback={this.footerOverlap} checked={this.state.footerOverlap}></AndresCheckBox>
                <AndresCheckBox label="Show footer" callback={this.swichFooter} checked={this.state.showFooter}></AndresCheckBox>
                <AndresCheckBox label="Show children items" callback={this.swichChildren} checked={this.state.showChildrenItems}></AndresCheckBox>
            </div>}

            <AboutInfo/>

            <ListOfTags listOfTags={this.state.webTags} onClickFunction={(param)=>this.filterImagesByTag(param)}/>
            
            { this.state.showMediaViewer && <MediaViewer 
                items={[]} 
                picture={this.state.picture}
                closeFunction={this.openCloseViewer}
                gallery={window.MEDIA_VIEWER_DATA} />}

            { this.state.showIframeContent && <IframeContent 
                configParams={{showHeader: true, showCloseButton:true, title:'Default title', url: this.state.iframeSrc }} 
                closeFunction={this.openCloseIframe} />}

            { window.WEB_DEBUG.themesDesigner && <div className="controls-presets">
                <PresetsMenu title={'Columns & Style'} mnuData={ window.WEB_DEBUG_DATA.mixMenu }
                    clickFunction={ (i) => { 
                        console.log("i:", i );
                        this.chooseStylesData(i.paramArr[0]);
                        this.chooseColumnsData(i.paramArr[1]); 
                    }} />

                <PresetsMenu title={'Columns'} mnuData={ window.WEB_DEBUG_DATA.columnsMenu }
                    clickFunction={ (i) => { this.chooseColumnsData(i.id); }} />

                <PresetsMenu title={'Styles'} mnuData={ window.WEB_DEBUG_DATA.stylesMenu }
                    clickFunction={ (i) => { this.chooseStylesData(i.themeName) }} />

                <PresetsMenu  mnuData={ window.WEB_DEBUG_DATA.sourcesMenu }
                    clickFunction={ (i) => { this.chooseSourceData(i.fileName) }}
                    title={'Sources'}/>
            </div>}

            <GoToTop />
        </>
    }
}

export default App;