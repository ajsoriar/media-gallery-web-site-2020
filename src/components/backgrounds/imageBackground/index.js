import React from 'react'
import { Component } from 'react'

class ImageBackground extends Component { // includes crop functionality

    constructor() {
        super();
        this.state = {
            loaded: false //,
            //dimensions: {}
        };
        //this.onImgLoad = this.onImgLoad.bind(this);
    }

    setLoaded () {
        console.log("[ImageBackground] onImgLoad! to true");
        this.setState({"loaded": true });  
        if ( this.props.onLoadCallback ) this.props.onLoadCallback();
    }

    // onImgLoad({target:img}) {
    //     this.setState({
    //         dimensions:{
    //             height:img.offsetHeight,
    //             width:img.offsetWidth
    //         }
    //     });
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.imageSource !== this.props.imageSource) {
            this.setState({"loaded": false });  
        }
    }

    componentDidMount(props) {
        // var img = document.createElement('img');
        // img.src = props.imageSource;
        // img.onload = function () { console.log('Fully loaded'); }
    }

    render () {

        var { frameSize, imageSize } = this.props;
        var frm = {
            w: window.innerWidth,
            h: window.innerHeight
        }

        console.log("[ImageBackground] render; this.props:", this.props );

        var iw = imageSize.w,
            ih = imageSize.h,
            cw = null,
            ch = null,
            left = 0,
            top = 0;

        if ( iw > ih ) {
            cw = iw * frm.h / ih;
            ch = frm.h;
            left = ( frm.w / 2 - cw / 2);

            if ( frm.w / frm.h > iw / ih ) {
                cw = frm.w;
                ch = ih * frm.w / iw; 
                left = 0;
                top = ( frm.h / 2 - ch / 2);;
            }
        } else {
            cw = frm.w;
            ch = ih * frm.w / iw;
        }

        left = ( frm.w / 2 - cw / 2);
        top = ( frm.h / 2 - ch / 2);

        var cssContentString = {
            "display": 'inline-block',
            "width": + cw +'px',
            "height": + ch +'px',
            "top": top +'px',
            "left": + left +'px',
            "overflow": 'hidden',
            "position": 'absolute',
            "visibility": (!this.state.loaded) ? 'hidden' : ''
        }

        var classNameString = "";
        classNameString += (this.state.loaded === false) ? " visible": "";

        var cssFrameString = {
            "display": 'inline-block',
            "width": frm.w +'px',
            "height": frm.h +'px',
            "top": 0,
            "left": 0,
            "overflow": 'hidden',
            "position": 'absolute'
        }

        return <div className="imageBackground" style={cssFrameString}>

            {/* { !this.state.loaded && <div class="pictureLoading">Loading ...</div> } */}

            {/* { (props.loadingLayer && !this.state.loaded) && <LoadingLayer/> } */}

            <img 
                //id={props.id} 
                style={cssContentString} 
                className={classNameString} 
                src={this.props.src} 
                //alt={this.props.id} 
                width={cw} 
                height={ch} 
                onLoad={ () => this.setLoaded() } 
                onError={ () => this.setLoaded() } />

            {/* <img onLoad={this.onImgLoad} src={props.imageSource}/> */}

        </div>
    }
}

export default ImageBackground;