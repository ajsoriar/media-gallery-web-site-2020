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
import LandingGrid from './components/landingGrid';

class App extends Component {

    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    state = {
        browser_width: window.innerWidth, 
        browser_height: window.innerHeight,
        maxContainerWidth:1440,
        maxNumOfColumns:5,
        minColumWidth:190, 
        vmargin:10,
        sideMargin:180,
        hmargin:15,
        
        showMediaViewer: false,
        columnsNum:5,
        columnWidth:200,
        columnMargin:10,
        showFooter: true,
        footerOverlap: true,
        headerOverlap: true,
        showChildrenItems: true,
        picture: null
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
            case 'vmargin':
                this.setState({vmargin: event.target.value});
                break;
            case 'hmargin':
                this.setState({hmargin: event.target.value});
                break;
            case 'sideMargin':
                this.setState({sideMargin: event.target.value});
                break;
        }
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
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render () {
        var { maxContainerWidth, maxNumOfColumns, minColumWidth, vmargin, sideMargin, hmargin, browser_width, browser_height } = this.state;
        return  <>
            <div className="App">
                <ColumnsDemoMenu onChangeCallback={(values)=>{
                    console.log("[Menu] Life is change! values" )
                }}/>
                <Columns browserWidth={browser_width} browserHeight={browser_height} debug={true} maxNumOfColumns={maxNumOfColumns} minNumOfCoumns={1} minColumWidth={minColumWidth} maxContainerWidth={maxContainerWidth} vmargin={vmargin} sideMargin={sideMargin} hmargin={hmargin} />
                <MainMenu />
                <EndOfContent />
            </div>
            <div className="designer">
                <Range label={'Max container width'} min="550" max="1600" step="50" defaultValue={maxContainerWidth} value={maxContainerWidth} onChange={(event)=> this.updateRange(event ,'maxContainerWidth')} />
                <Range label={'Max num. of columns'} min="1" max="20" step="1" defaultValue={maxNumOfColumns} value={maxNumOfColumns} onChange={(event)=> this.updateRange(event ,'maxNumOfColumns')} />
                <Range label={'Min column width'} min="120" max="300" step="10" defaultValue={minColumWidth} value={minColumWidth} onChange={(event)=> this.updateRange(event ,'minColumWidth')} />
                <Range label={'Columns margin'} min="0" max="100" step="5" defaultValue={hmargin} value={hmargin} onChange={(event)=> this.updateRange(event ,'hmargin')} />
                <Range label={'Side margins'} min="0" max="200" step="10" defaultValue={sideMargin} value={sideMargin} onChange={(event)=> this.updateRange(event ,'sideMargin')} />
                {/* <Range label={'Items v. margin'} min="0" max="200" step="10" defaultValue={vmargin} value={vmargin} onChange={(event)=> this.updateRange(event ,'vmargin')} /> */}
            </div>
            <LandingGrid 
                columnsNum={this.state.columnsNum *1}
                columnWidth={this.state.columnWidth *1}
                columnMargin={this.state.columnMargin *1}
                headerOverlap={this.state.headerOverlap}
                footerOverlap={this.state.footerOverlap}
                showFooter={this.state.showFooter}
                showChildrenItems={this.state.showChildrenItems}
                className={'landingGridStyle'} 
                clickFunc={ ( pic ) => {
                    console.log("pic:", pic );
                    this.opencloseViewer( pic );
                } }/>
            <AboutInfo/>
        </>
    }
}

export default App;