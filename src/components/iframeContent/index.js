import React from 'react';
import './index.css';
import { Component } from 'react';
import Icon from '../icon';
import Spinner from './../spinner';

class IframeContent extends Component {

    state = {
        loading: true
    }

    hideSpinner = () => {
        this.setState({
          loading: false
        });
    };

    render() {
        const {closeFunction, configParams} = this.props;
        var classNameString = "contentIframe";
        if ( configParams.showHeader === false ) classNameString += " hideHeader";

        return <div className="iframeViewer">

                {(configParams.showCloseButton != false) && <div className="btn close" onClick={ () => closeFunction(null) || ( () => { console.log("[] Close!")} ) }>
                    <Icon width={70} name={'btn-close'} clickFunc={()=>{}}/>
                </div>}

                {(configParams.showHeader != false) && <div className="title">{configParams.title}</div>}

                <iframe 
                    style={{display: this.state.loading? 'none': 'block'}}
                    src={ !configParams.url? './static/empty.html': configParams.url } 
                    className={classNameString}
                    title="Iframe Example"
                    onLoad={this.hideSpinner}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                />

                {this.state.loading ? ( <Spinner/>) : null}
        </div>;
    }
}

export default IframeContent;

/*
    title: this.state.iframeData.title,
    url: this.state.iframeData.src

    configParams={{
        showHeader: true, 
        showCloseButton:true, 
        iframeConfig: this.state.iframeData
    }} 
*/