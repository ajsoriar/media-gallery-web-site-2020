import React from 'react';
import { Component } from 'react';
import './App.css';
import './bgMediaQueries.css';
import Columns from './components/containers/columns';
import ColumnsDemoMenu from './components/columnsDemoMenu';
import MainMenu from './components/mainMenu';
import EndOfContent from './components/items/endOfContentItem';
import Range from './components/range';
import AboutInfo from './components/aboutInfo';
import AndresCheckBox from './components/checkBox';

class App extends Component {

    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    state = {

        // Configuration of the columns
        browser_width: window.innerWidth, 
        browser_height: window.innerHeight,
        maxContainerWidth:1440,
        maxNumOfColumns:5,
        minColumWidth:190, 
        sideMargin:180,
        hmargin:15,
      
        // Configuration of the gallery
        showMediaViewer: false,
        showChildrenItems: true,
        galleryTop: 35,
        vMargin:10,

        // Configuration of gallery items
        showFooter: true,
        footerOverlap: true,
        headerOverlap: true,
       
        // Picture viewer
        //picture: null,
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

    //opencloseViewer = (pic) => { this.setState({showMediaViewer: !this.state.showMediaViewer, picture: pic}); }
    headerOverlap = () => { this.setState({headerOverlap: !this.state.headerOverlap}); }
    footerOverlap = () => { this.setState({footerOverlap: !this.state.footerOverlap}); }
    swichFooter = () => { this.setState({showFooter: !this.state.showFooter}); }
    swichChildren = () => { this.setState({showChildrenItems: !this.state.showChildrenItems}); }

    updateDimensions() {
        this.setState({ 
            browser_width: window.innerWidth, 
            browser_height: window.innerHeight
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render () {
        var { maxContainerWidth, maxNumOfColumns, minColumWidth, vMargin, sideMargin, hmargin, browser_width, browser_height, galleryTop} = this.state;
        return  <>
            <Columns 
                browserWidth={browser_width}
                browserHeight={browser_height}
                debug={true}
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
            />

            {/*<MainMenu /> */}

            <div className="designer">
                <b>Gallery Columns</b>
                <Range label={'Max container width'} min="550" max="1600" step="50" defaultValue={maxContainerWidth} value={maxContainerWidth} onChange={(event)=> this.updateRange(event ,'maxContainerWidth')} />
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
            </div>
            <AboutInfo/>
        </>
    }
}

export default App;