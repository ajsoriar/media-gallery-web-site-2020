import React from 'react'
import { Component } from 'react'

class ImageCropper extends Component {

    constructor() {
        super();
        this.state = {
            loaded: false
        }
    }

    setLoaded () {
        this.setState({"loaded": true });  
    }

    componentDidUpdate() {
        console.log("componentDidUpdate!");
    }

    componentWillMount() {
        console.log("componentWillMount!");
    }

    render () {

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
                                "position": 'absolute'
                            }

        var iw = imageSize.w,
            ih = imageSize.h,
            cw = null,
            ch = null,
            left = 0,
            top = 0,
            aspectRatio = null;

        if (props.cropStrategy === 'FILL-THE-FRAME' ) { // FILL like a background

            if (iw > ih ) { // Landscape // TODO: Compare aspect ratio of the frame and the video instead of this?
                console.log("[VideoBackGround]: -Landscape- !");
                cw = iw * frameSize.h / ih;
                ch = frameSize.h;
                left = ( frameSize.w / 2 - cw / 2);
                if ( frameSize.w / frameSize.h > iw / ih ) { // Fix needed!!! Compare aspect ratio of the frame and the video?
                    cw = frameSize.w;
                    ch = ih * frameSize.w / iw; 
                    left = 0;
                    top = ( frameSize.h / 2 - ch / 2);;
                }
            } else { // Portrait and Squared
                console.log("[VideoBackGround]: -Portrait- !");
                cw = frameSize.w;
                ch = ih * frameSize.w / iw;
            } 

        } else { // Strategy = FIT to w or h

            if (iw > ih ) { // Landscape
                aspectRatio = "Landscape";
                console.log("[ImageCropper] Landscape ");
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
            } else { // Portrait and Squared
                aspectRatio = "Portrait";
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

        var classNameString = (props.antialiasing === false) ? "pixelated": "";

        return <div className="imageCropper" style={cssFrameString}>
            <img id={props.id} style={cssContentString} className={classNameString} src={props.imageSource} alt={props.id} width={cw} height={ch} onLoad={() => this.setLoaded()} /> 

            <div className="debug">
                antialiasing: { (props.antialiasing === false) ? "NO": "YES" }<br/>
                cropStrategy: { props.cropStrategy }<br/>
                aspectRatio: { aspectRatio}<br/>
                <b>Original image</b><br/>
                imageSize.w: { iw +'px' }<br/>
                imageSize.h: { ih +'px' }<br/>
                <b>Available space</b><br/>
                frm.w: { frm.w +'px' }<br/>
                frm.h: { frm.h +'px' }<br/>
                <b>New image size</b><br/>
                width: { cw +'px' }<br/>
                height: { ch +'px' }<br/>
            </div>         
        </div>
    }
}

export default ImageCropper;