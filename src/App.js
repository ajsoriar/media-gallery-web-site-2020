import React from 'react'
import { Component } from 'react'
import './css/App.css'
import './css/bgMediaQueries.css'
import './css/header.css'
import Columns from './components/containers/columns'
import MainMenu from './components/mainMenu'
import Range from './components/range'
import AboutInfo from './components/aboutInfo'
import AndresCheckBox from './components/checkBox'
import MediaViewer from './components/mediaViewer'
import PresetsMenu from './components/presetsMenu'
import ListOfTags from './components/tagsList'
import IframeContent from './components/iframeContent'
import TagsDataHandler from './components/tagsList/tagsDataHandler'
import WindowCloseButton from './components/windowCloseButton'
import Router from './router'
import BackButton from './components/buttons/backButton'
import ContentWidthFollower from './components/containers/contentWidthFollower'
import NavigationMap from './components/navigationMap'
import BrandLogo from './components/brandLogo'
import MultiBackGround from './components/backgrounds/multiBackGround'
import DebugMenu from './components/debug/debugMenu'
import Fade from './components/fadeInAndOut/index'
import SafeFrame from './components/safeFrame'

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
        showGalleriesHeader: window.WEB_CONFIG.showGalleriesHeader,
        showGalleriesBg: window.WEB_CONFIG.showGalleriesBg,
        galleryTop: window.WEB_CONFIG.columnsGrid.galleryTop,
        vMargin: window.WEB_CONFIG.columnsGrid.vMargin,
        // Configuration of gallery items
        showFooter: window.WEB_CONFIG.columnsGrid.showFooter,
        footerOverlap: window.WEB_CONFIG.columnsGrid.footerOverlap,
        headerOverlap: window.WEB_CONFIG.columnsGrid.headerOverlap,
        // Picture viewer
        showMediaViewer: false,
        picture: null,
        // Iframe
        showIframeContent: false,
        iframeData: null,
        // Tags
        webTags: [],
        // About Info
        showAboutInfo: false
    }

    _DEBUG_updateRange = (event, target) => {
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
    openCloseIframe = (iframeData) => { 
        console.log("[App] openCloseIframe(), iframeData: ", iframeData);
        if (!iframeData) {
            this.setState({showIframeContent: false}); 
            return
        }
        this.setState({showIframeContent: true, iframeData: iframeData}); 
    }

    headerOverlap = () => { this.setState({headerOverlap: !this.state.headerOverlap}); }
    footerOverlap = () => { this.setState({footerOverlap: !this.state.footerOverlap}); }
    swichFooter = () => { this.setState({showFooter: !this.state.showFooter}); }
    swichChildren = () => { this.setState({showChildrenItems: !this.state.showChildrenItems}); }
    swichGalleriesHeader = () => { this.setState({showGalleriesHeader: !this.state.showGalleriesHeader}); }
    swichGalleriesBg = () => { this.setState({showGalleriesBg: !this.state.showGalleriesBg}); }

    _DEBUG_chooseColumnsData(id) {
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
    }

    _DEBUG_chooseStylesData(themeName) {
        console.log("PresetsMenu -> click, themeName: ", themeName); 
        let previousTheme = document.documentElement.getAttribute('data-theme');
        document.querySelector('body').classList.remove(previousTheme);
        document.documentElement.setAttribute('data-theme', themeName);
        document.querySelector('body').classList.add(themeName);
    }

    chooseDataSource(fileName, item) {
        if ( !fileName ) return
        console.log("PresetsMenu -> click, fileName: ", fileName ); 
        var that = this;
        fetch(window.WEB_CONFIG.dataPath + fileName)
        .then(response => response.json())
        .then(data => {
            console.log("response: ",data);

            if ( item != null ){
                console.log("!1");
                Router.navigationTree.add({
                    title: data.galleryConfig.title || "Untitled Gallery",
                    galleryFile: item.target.file.src,
                    selectedItemID: item.id
                })
            } else {
                console.log("!2");
                if( Router.navigationTree.line.length === 0){
                    Router.navigationTree.add({
                        title: data.galleryConfig.title || "Home",
                        galleryFile: fileName,
                        selectedItemID: null
                    })
                }
            }

            that.setState({ 
                imagesData: data,
                webTags: data.galleryConfig.tags || []
            });
        })
        .catch( error => {
            console.log("!");
            window.ajsrnotify({
                title: "Error!",
                msg: "<b>ERROR!</b> Gallery file not found!",
                type: "error", // null, "error", "info", "alert", "success"
                position: "center", // null, "right", "left"
                timeout: 2000,
                theme: null // null, "windows-98"
            })
        })
    }

    filterImagesByTag = (tagName) => {
        console.log("[App] filterImagesByTag(), tagName: ", tagName );
        TagsDataHandler.setSelectedTagTo(tagName);
        this.setState({}); // refresh the page
    }

    choseMenuOption = (item) => {
        console.log(item);
        switch ( item.type ){
            case 'TAG_FILTER':
                if (this.state.showIframeContent) this.openCloseIframe();
                this.filterImagesByTag( item.tagName );
                break;
            case 'LINK':
                if (item.target="blank") {
                    window.open(item.url, '_blank');
                } else {
                    window.open(item.url);
                }
                break;
            case 'IFRAME_CONTENT':
                this.openCloseIframe( item );
            case 'OPEN_GALLERY':
                this.chooseDataSource( item.targetFile );
            case 'ROUTE':
                // root/gallery:GALLERY_ID/item:ITEM_ID?
        }
    }

    updateDimensions() {
        this.setState({ 
            browser_width: window.innerWidth, 
            browser_height: window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
        this.chooseDataSource( window.WEB_CONFIG.rootDataFile );
        if ( window.WEB_DEBUG._GUIDES.initialize ) this._DEBUG_chooseStylesData(window.WEB_DEBUG_DATA.mixMenu[2].paramArr[0]);
        if ( window.WEB_DEBUG._GUIDES.initialize ) this._DEBUG_chooseColumnsData(window.WEB_DEBUG_DATA.mixMenu[2].paramArr[1]);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render () {
        var { maxContainerWidth, maxNumOfColumns, minColumWidth, vMargin, sideMargin, hmargin, browser_width, browser_height, galleryTop} = this.state;

        console.log("[App] render()");

        window.WEB_DEBUG._GUIDES.outlines? document.body.classList.add("outlines"): document.body.classList.remove("outlines");

        return  <>

            { window.WEB_DEBUG._GUIDES.responsiveBgColor && <div className="body-gradient"></div>}

            { this.state.showGalleriesBg && this.state.imagesData && <MultiBackGround gi={this.state.imagesData.galleryConfig}></MultiBackGround> }

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
                clickOnGalleryItem={(item) => {
                    console.log("item:", item );
                    if ( item.target && item.target.file ) {
                        this.chooseDataSource( item.target.file.src, item );
                    } else {
                        this.setState({
                            showMediaViewer: true, 
                            picture: item
                        }); 
                    }  
                }}
                imagesData={this.state.imagesData }
            />}

            <Fade/>

            <ContentWidthFollower 
                top={0} 
                browserWidth={browser_width} 
                minColumWidth={minColumWidth} 
                maxContainerWidth={maxContainerWidth} 
                sideMargin={sideMargin}
            >
                <BrandLogo 
                    source={window.WEB_CONFIG.brandLogo}
                    clickFunc={()=>{ this.setState({showAboutInfo: true })}}>    
                </BrandLogo>
                <MainMenu clickFunc={(item)=>this.choseMenuOption(item)} />
                <>
                    {window.WEB_CONFIG.showGoBack && Router.navigationTree.line.length > 1 &&<BackButton clickFunc={()=>{ this.chooseDataSource(Router.navigationTree.down()); }} ></BackButton>}
                    {window.WEB_CONFIG.showNavigationMap && Router.navigationTree.line.length > 1 &&<NavigationMap 
                        data={Router.navigationTree.line}
                        clickFunc={(index)=>{
                            console.log("Click on NavigationMap Item ", index, "!")
                            this.chooseDataSource(Router.navigationTree.goToIndex(index));
                        }} ></NavigationMap>}
                </>
                {(this.state.showGalleriesHeader && this.state.imagesData) && <>
                    <div className="header title">{this.state.imagesData.galleryConfig.title}</div>
                    <div className="header description">{this.state.imagesData.galleryConfig.description}</div>
                </>}          
            </ContentWidthFollower>

            {window.WEB_DEBUG._PANELS.panel_gallery && <div className="designer">
                <WindowCloseButton clickFunc={()=>{window.WEB_DEBUG._PANELS.panel_gallery=false;this.setState({})}}></WindowCloseButton>
                <b>Gallery Columns</b>
                <Range label={'Max container width'} min="550" max="2600" step="50" defaultValue={maxContainerWidth} value={maxContainerWidth} onChange={(event)=> this._DEBUG_updateRange(event ,'maxContainerWidth')} />
                <Range label={'Max num. of columns'} min="1" max="20" step="1" defaultValue={maxNumOfColumns} value={maxNumOfColumns} onChange={(event)=> this._DEBUG_updateRange(event ,'maxNumOfColumns')} />
                <Range label={'Min column width'} min="120" max="300" step="10" defaultValue={minColumWidth} value={minColumWidth} onChange={(event)=> this._DEBUG_updateRange(event ,'minColumWidth')} />
                <Range label={'Columns margin'} min="0" max="100" step="5" defaultValue={hmargin} value={hmargin} onChange={(event)=> this._DEBUG_updateRange(event ,'hmargin')} />
                <Range label={'Side margins'} min="0" max="200" step="10" defaultValue={sideMargin} value={sideMargin} onChange={(event)=> this._DEBUG_updateRange(event ,'sideMargin')} />
                <br/>
                <b>Gallery Items</b>
                <Range label={'Gallery top'} min="0" max="300" step="10" defaultValue={galleryTop} value={galleryTop} onChange={(event)=> this._DEBUG_updateRange(event ,'galleryTop')} />
                <Range label={'Items v. margin'} min="0" max="100" step="5" defaultValue={vMargin} value={vMargin} onChange={(event)=> this._DEBUG_updateRange(event ,'vMargin')} />
                <AndresCheckBox label="Overlap header" callback={this.headerOverlap} checked={this.state.headerOverlap}></AndresCheckBox>
                <AndresCheckBox label="Overlap details" callback={this.footerOverlap} checked={this.state.footerOverlap}></AndresCheckBox>
                <AndresCheckBox label="Show footer" callback={this.swichFooter} checked={this.state.showFooter}></AndresCheckBox>
                <AndresCheckBox label="Show children items" callback={this.swichChildren} checked={this.state.showChildrenItems}></AndresCheckBox>
                <AndresCheckBox label="Show Galleries Header" callback={this.swichGalleriesHeader} checked={this.state.showGalleriesHeader}></AndresCheckBox>
                <AndresCheckBox label="Show Galleries Background" callback={this.swichGalleriesBg} checked={this.state.showGalleriesBg}></AndresCheckBox>
            </div>}

            {this.state.showAboutInfo && <AboutInfo clickFunc={()=>{ this.setState({showAboutInfo: false })}}/>}

            {window.WEB_DEBUG._PANELS.panel_tags && <ListOfTags 
                clickFunc={()=>{window.WEB_DEBUG._PANELS.panel_tags=false;this.setState({})}}
                listOfTags={this.state.webTags} 
                onClickFunction={(param)=>this.filterImagesByTag(param)}/>}
            
            { this.state.showMediaViewer && <MediaViewer 
                items={[]} 
                picture={this.state.picture}
                closeFunction={this.openCloseViewer}
                gallery={window.MEDIA_VIEWER_DATA} />}

            { this.state.showIframeContent && <IframeContent 
                configParams={this.state.iframeData}
                closeFunction={this.openCloseIframe} 
                showCloseButton={false}
            />}

            { window.WEB_DEBUG._PANELS.panel_themes && <div className="controls-presets">
                <WindowCloseButton clickFunc={()=>{window.WEB_DEBUG._PANELS.panel_themes=false;this.setState({})}}></WindowCloseButton>
                <PresetsMenu title={'Columns & Style'} mnuData={ window.WEB_DEBUG_DATA.mixMenu }
                    clickFunction={ (i) => { 
                        console.log("i:", i );
                        this._DEBUG_chooseStylesData(i.paramArr[0]);
                        this._DEBUG_chooseColumnsData(i.paramArr[1]); 
                    }} />

                <PresetsMenu title={'Columns'} mnuData={ window.WEB_DEBUG_DATA.columnsMenu }
                    clickFunction={ (i) => { this._DEBUG_chooseColumnsData(i.id); }} />

                <PresetsMenu title={'Styles'} mnuData={ window.WEB_DEBUG_DATA.stylesMenu }
                    clickFunction={ (i) => { this._DEBUG_chooseStylesData(i.themeName) }} />

                <PresetsMenu  mnuData={ window.WEB_DEBUG_DATA.sourcesMenu }
                    clickFunction={ (i) => {  Router.navigationTree.reset(); this.chooseDataSource(i.fileName) }}
                    title={'Sources'}/>
            </div>}

            { window.WEB_DEBUG._showDebugPalette && <DebugMenu source={this.state} clickFunc={()=>{ this.setState({}) }}/> }

            { window.WEB_DEBUG._GUIDES.tvSafeFrame && <SafeFrame frameWidth="27" opacity={0.7}></SafeFrame> }
        </>
    }
}

export default App;