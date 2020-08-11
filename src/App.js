import React from 'react';
import './App.css';
import './bgMediaQueries.css';
import Colums from './components/containers/colums/index';
import ColumsDemoMenu from './components/columsDemoMenu';
import MainMenu from './components/mainMenu';
import EndOfContent from './components/items/endOfContentItem';

function App() {
    return (
        <div className="App">
            <ColumsDemoMenu onChangeCallback={(values)=>{console.log("Life is change! values:", values )}}/>
            <Colums min={1} max={7} minColumWidth={320} maxContainerWidth={1440} vmargin={10} hmargin={15}></Colums>
            <MainMenu />
            <EndOfContent />
        </div>
    );
}

export default App;