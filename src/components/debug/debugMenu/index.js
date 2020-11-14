import React, { Component } from "react"
import AndresCheckBox from './../../checkBox'
import './index.css';

class DebugMenu extends Component {

    constructor() {
        super();
        this.state = {
            value: null,
            minimized: !window.WEB_DEBUG._debugPaletteMaximized, //true,
            debugObjKeys_PANELS: null,
            debugObjKeys_GUIDES: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState(() => {
            return {
                value,
            };
        },()=>{ });
    }

    reversevalue( keyName ){
        window.WEB_DEBUG._PANELS[ keyName ] = !window.WEB_DEBUG._PANELS[ keyName ];
        window.WEB_DEBUG._GUIDES[ keyName ] = !window.WEB_DEBUG._GUIDES[ keyName ];
    }

    debugAll(){
        this.state.debugObjKeys_PANELS.map(( objKeyName, i ) => { window.WEB_DEBUG._PANELS[ objKeyName ] = true; });
        this.state.debugObjKeys_GUIDES.map(( objKeyName, i ) => { window.WEB_DEBUG._GUIDES[ objKeyName ] = true; });
    }

    debugNone(){
        this.state.debugObjKeys_PANELS.map(( objKeyName, i ) => { window.WEB_DEBUG._PANELS[ objKeyName ] = false; });
        this.state.debugObjKeys_GUIDES.map(( objKeyName, i ) => { window.WEB_DEBUG._GUIDES[ objKeyName ] = false; });
    }

    maxMin(){
        this.setState({"minimized": !this.state.minimized })
    }

    componentWillMount () {  
        var debufFlags_PANELS = [];
        var debufFlags_GUIDES = [];
        Object.keys(window.WEB_DEBUG._PANELS).forEach(function(key) { debufFlags_PANELS.push( key ) });
        Object.keys(window.WEB_DEBUG._GUIDES).forEach(function(key) { debufFlags_GUIDES.push( key ) });
        this.setState({ 
            debugObjKeys_PANELS: debufFlags_PANELS, 
            debugObjKeys_GUIDES: debufFlags_GUIDES 
        });
    }

    render() {
        var strClass = this.state.minimized?"debugMenu minimized":"debugMenu";
        return (
            <div className={strClass}>
                <div className="controls">
                    <h2>Panels</h2>
                    {this.state.debugObjKeys_PANELS && this.state.debugObjKeys_PANELS.map(( objKeyName, index ) => <AndresCheckBox 
                        key={index} 
                        label={objKeyName} 
                        callback={()=>{
                            this.reversevalue(objKeyName);
                            this.props.clickFunc();
                        }} 
                        checked={ window.WEB_DEBUG._PANELS[objKeyName]} ></AndresCheckBox> )}
                    <h2>Guides</h2>
                    {this.state.debugObjKeys_GUIDES && this.state.debugObjKeys_GUIDES.map(( objKeyName, index ) => <AndresCheckBox 
                        key={index} 
                        label={objKeyName} 
                        callback={()=>{
                            this.reversevalue(objKeyName);
                            this.props.clickFunc();
                        }} 
                        checked={ window.WEB_DEBUG._GUIDES[objKeyName]} ></AndresCheckBox> )}
                    <button type="button" onClick={()=>{ this.debugAll(); this.props.clickFunc(); }}>All</button>
                    <button type="button" onClick={()=>{ this.debugNone(); this.props.clickFunc(); }}>None</button>
                </div>
                <button type="button" className={'debugMenu-btnMin'} onClick={()=>{ this.maxMin(); }}>Min</button>
            </div>
        );
    }
}

export default DebugMenu;