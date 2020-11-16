import React from 'react'
import { Component } from 'react'
import LoadingLayer from '../../loadingLayer';
import Icon from './../../icon';
import './spinner.css';
import './index.css';

class ImageItem extends Component { // includes crop functionality

    constructor() {
        super();
        this.state = {
            loaded: false,
            imgError: false
        }
    }

    setLoaded () {
        if (this.props.onLoad) this.props.onLoad();
        this.setState({"loaded": true, "imgError": false });
    }

    setError () {
        if (this.props.onError) this.props.onError();
        this.setState({"loaded": true, "imgError": true });  
    }

    componentDidUpdate(prevProps) {
        //console.log("[ImageItem] componentDidUpdate()")
        if (prevProps.imageSource !== this.props.imageSource) {
            this.setState({"loaded": false },() =>{
                //console.log("[ImageItem] componentDidUpdate() UPDATED!")
            });  
        }
    }

    render () {
        var op = this.state.loaded? 1:0;
        //console.log("[ImageItem] RENDER! opacity: ", op );

        var props = this.props;
        var { frameSize, imageSize } = props;
        var frm =  frameSize;
        var cssFrameString = {
            "display": 'inline-block',
            "width": frm.w +'px',
            "height": frm.h +'px',
            "top": 0,
            "left": 0,
            "overflow": 'hidden',
            "position": 'absolute',
            "opacity": op
        };
        var iw = imageSize.w,
            ih = imageSize.h,
            cw = null,
            ch = null,
            left = 0,
            top = 0;

        if (props.cropStrategy === 'FILL-THE-FRAME' ) { // FILL like a background

            if (iw > ih ) { // Landscape // TODO: Compare aspect ratio of the frame and the video instead of this?
                cw = iw * frameSize.h / ih;
                ch = frameSize.h;
                left = ( frameSize.w / 2 - cw / 2);
    
                if ( frameSize.w / frameSize.h > iw / ih ) { // Fix needed!!! Compare aspect ratio of the frame and the video!
                    cw = frameSize.w;
                    ch = ih * frameSize.w / iw; 
                    left = 0;
                    top = ( frameSize.h / 2 - ch / 2);;
                }
            } else { // Portrait or squared
                cw = frameSize.w;
                ch = ih * frameSize.w / iw;
            }

        } else { // Strategy = FIT to w or h

            if (iw > ih ) { // Landscape
                if ( frm.h > ih && frm.w > iw ) {
                    ch = ih;
                    cw = iw;
                } else {
                    if (frm.w > iw) {
                        cw = iw * frm.h / ih;
                        ch = frm.h;
                    } else {
                        cw = frm.w;
                        ch = ih * frm.w / iw;
                    }
                }  
            } else { // Portrait or squared
                if ( frm.h > ih && frm.w > iw ) {
                    ch = ih;
                    cw = iw;
                } else {
                    if (frm.h > ih) {
                        ch = ih;
                        cw = iw;
                    } else {
                        ch = frm.h;
                        cw = frm.h * iw / ih;
                    }
                }
            }      
        }

        if (props.align === "left"){
            left = 0;
        } else if (props.align === "right") {
            left = frm.w - cw;
        } else {
            left = ( frm.w / 2 - cw / 2);
            top = ( frm.h / 2 - ch / 2);
        }

        var cssContentString = {
                                "display": 'inline-block',
                                "width": + cw +'px',
                                "height": + ch +'px',
                                "top": top +'px',
                                "left": + left +'px',
                                "overflow": 'hidden',
                                "position": 'absolute',
                                "visibility": (!this.state.loaded || this.state.imgError) ? 'hidden' : '',
                                "opacity": op
                            }  

        var classNameString = (props.antialiasing === false) ? "pixelated": "";
        classNameString += " opacityTransition";

        return <>
            { (this.props.hideLoading && props.loadingLayer && !this.state.loaded) && <div className="mLL-frame">
                <div className="mLL-container">
                    <div className="mLL-spinner"></div>
                </div>    
            </div> }       

            <div className="imageItem opacityTransition" style={cssFrameString}>

                <img 
                    id={props.id} 
                    style={cssContentString} 
                    className={classNameString} 
                    src={props.imageSource} 
                    alt={props.id} 
                    width={cw} 
                    height={ch} 
                    onLoad={ () => this.setLoaded() } 
                    onError={ () => this.setError() } />

                { props.debug && <div className="image-debug">
                    align: { props.align }<br/>
                    antialiasing: { (props.antialiasing === false) ? "NO": "YES" }<br/>
                    cropStrategy: { props.cropStrategy }<br/>
                    <b>Original image</b><br/>
                    imageSize.w: { iw +'px' }<br/>
                    imageSize.h: { ih +'px' }<br/>
                    <b>Available space</b><br/>
                    frm.w: { frm.w +'px' }<br/>
                    frm.h: { frm.h +'px' }<br/>
                    <b>New image size</b><br/>
                    width: { cw +'px' }<br/>
                    height: { ch +'px' }<br/>
                </div>} 

                {this.state.imgError && <div className="center"><Icon center={true} width={60} name={'no-picture'}></Icon></div>}

            </div>

        </>
    }
}

export default ImageItem;