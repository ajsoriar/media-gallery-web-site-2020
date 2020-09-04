import React from 'react';
import './index.css';
import { Component } from 'react';
import Icon from './../icon';
import VideoBackGround from '../backgrounds/videoBackGround';
import ImageItem from './imageItem';
import GridDataHandler from './../landingGrid/gridDataHandler';
import ImageBackGround from '../backgrounds/imageBackground';

class MediaViewer extends Component {

    state = {
        browser_width: window.innerWidth, 
        browser_height: window.innerHeight,
        currentPicturePositionInArray: 0,
        loaded: false,
        currentItem: null
    }

    updateDimensions = () => {
        //console.log("[MediaViewer] updateDimensions!");
        this.setState({ 
            browser_width: window.innerWidth, 
            browser_height: window.innerHeight
        });
    };

    componentDidMount() {
        //console.log("[MediaViewer] componentDidMount!");
        window.addEventListener('resize', this.updateDimensions);
        if (!this.props.gallery) return
        let gItems = this.props.gallery.items;
        var currentPicturePositionInArray = GridDataHandler.getPositionInArrOfGalleryItemsById(gItems, this.props.picture.id);
        this.setState({ 
            currentPicturePositionInArray: currentPicturePositionInArray,
            currentItem: gItems[ currentPicturePositionInArray ]
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getNextPictureNum = (num) => {
        var goNext = () => {
            var pos = 0;
            if ( num < 0){
                if (this.state.currentPicturePositionInArray === 0){
                    pos = this.props.gallery.items.length - 1;
                }else {
                    pos =this.state.currentPicturePositionInArray -1;
                } 
            } else {
                if (this.state.currentPicturePositionInArray === this.props.gallery.items.length - 1) {
                    pos = 0;
                } else {
                    pos = this.state.currentPicturePositionInArray +1;
                }
            }
            this.setState({
                currentPicturePositionInArray: pos,
                currentItem: this.props.gallery.items[ pos ]
            });
        }
        this.setState({ currentItem: null}, goNext );
    }

    render() {

        var getVideoTop = () => {
            var top = 0
            if ( this.state.browser_width > this.state.currentItem.targetVideo.size.w ) {
                top = (this.state.browser_height/2) - ( this.state.currentItem.targetVideo.size.h / 2 );
            } else {
                var vh = this.state.currentItem.targetVideo.size.h * this.state.browser_width / this.state.currentItem.targetVideo.size.w 
                top = (this.state.browser_height/2) - ( vh /2 );              
            }
            return top +"px"
        };

        var getVideoLeft = () => {
            var lft = 0
            if ( this.state.browser_width > this.state.currentItem.targetVideo.size.w ) {
                lft = (this.state.browser_width/2) - ( this.state.currentItem.targetVideo.size.w / 2 );
            }
            return lft +"px"
        };

        //console.log("[MediaViewer] RENDER: ");

        const {closeFunction, gallery} = this.props;

        if (!gallery) return <div className="mediaViewer error">No items in this gallery!</div>
        var arrPos = this.state.currentPicturePositionInArray;  
        if (arrPos === null) return <div className="mediaViewer error">Some kind of error!</div>

        var i = gallery.items[arrPos];
        var SHOW_COLOR_BG = false;
        var SHOW_IMAGE_BG = false;
        var SHOW_VIDEO_BG = false;
        if ( i.background != undefined ){
            if ( i.background.video != undefined ){
                SHOW_VIDEO_BG = true;
            } else if ( i.background.image != undefined ){
                SHOW_IMAGE_BG = true;
            } else if ( i.background.color != undefined ){
                SHOW_COLOR_BG = true;
            } 
            // CSS3 GRADIENT
            // 3D
        }

        //console.log("ANDRES i:", i );
        var ITEM_TYPE = (i.type != undefined && i.type === 'VIDEO' ) ? 'VIDEO' : 'IMAGE';

        var iw = GridDataHandler.getImageData( i, "WIDTH", true );
        var ih = GridDataHandler.getImageData( i, "HEIGHT", true );
        var src = GridDataHandler.getImageData( i, "SOURCE", true );
        var cs = GridDataHandler.getImageData( i, "cropStrategy", true );

        return <div className="mediaViewer bg">

                { SHOW_COLOR_BG && <div id="gradient" className="gradient"></div> }

                { SHOW_IMAGE_BG && <ImageBackGround src={i.background.image.src} imageSize={{w: i.background.image.size.w, h: i.background.image.size.h}}></ImageBackGround> }

                { SHOW_VIDEO_BG && <VideoBackGround placeholder={null} src={i.background.video.src} loop={true} realWidth={640} realHeight={480}></VideoBackGround> }

                { (ITEM_TYPE === 'IMAGE') && <ImageItem 
                    frameSize={{w: this.state.browser_width, h: this.state.browser_height }}
                    imageSize={{w: iw, h: ih}}
                    imageSource={src }
                    antialiasing={i.antialiasing}
                    cropStrategy={cs || 'DEFAULT'} 
                    loadingLayer={true}
                    debug={window.WEB_DEBUG.viewerImages}
                />}
             
                { (ITEM_TYPE === 'VIDEO' && this.state.currentItem != null) && <div className="viewer-container" style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}>

                    <video width="100%" height="auto" controls autoPlay loop={false} style={{
                        top: getVideoTop(),
                        position: "relative",
                        margin: "auto",
                        maxWidth: this.state.currentItem.targetVideo.size.w +"px",
                        left: getVideoLeft()
                    }}>
                        <source src={this.state.currentItem.targetVideo.src} />
                        Your browser does not support the video tag.
                    </video>

                </div> }

                <div className="layer-next" onClick={()=>{ this.getNextPictureNum(1); }}></div>
                <div className="layer-previous" onClick={()=>{ this.getNextPictureNum(-1); }}></div>
                <div className="btn-picture next"><Icon width={70} name={'arrow-right'} clickFunc={()=>{ this.getNextPictureNum(1); }}/></div>
                <div className="btn-picture previous"><Icon width={70} name={'arrow-left'} clickFunc={()=>{ this.getNextPictureNum(-1); }}/></div>
                <div className="btn close" onClick={closeFunction}><Icon width={70} name={'btn-close'} clickFunc={()=>{}}/></div>
                <div className="title"></div>
                {/* {gallery.galleryConfig.id} | {gallery.galleryConfig.name} - {gallery.galleryConfig.title} ({gallery.items.length} items)<br/> */}
                <div className="info">{arrPos +1} / {gallery.items.length} - {gallery.items[ arrPos ].name}</div>                         
                {/* <SideInformationPane/> */}
        </div>;
    }
}

export default MediaViewer;