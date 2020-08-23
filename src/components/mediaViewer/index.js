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
        loaded: false
    }

    updateDimensions = () => {
        console.log("[MediaViewer] updateDimensions!");
        this.setState({ 
            browser_width: window.innerWidth, 
            browser_height: window.innerHeight
        });
    };

    componentDidMount() {
        console.log("[MediaViewer] componentDidMount!");
        window.addEventListener('resize', this.updateDimensions);
        this.setState({ currentPicturePositionInArray: GridDataHandler.getPositionInArrOfGalleryItemsById(this.props.gallery.items, this.props.picture.id)});
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getNextPictureNum= (num) => {
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
        this.setState({currentPicturePositionInArray: pos});
    }

    render() {

        //console.log("[MediaViewer] RENDER: ");

        const {closeFunction} = this.props;
        var gallery = this.props.gallery;
        var arrPos = this.state.currentPicturePositionInArray;

        if (arrPos === null) return <div className="mediaViewer error">Some kind of error!</div>
        //console.log("[MediaViewer] arrPos:", arrPos);

        var i = gallery.items[arrPos];
        var iw = GridDataHandler.getImageData( i, "WIDTH", true );
        var ih = GridDataHandler.getImageData( i, "HEIGHT", true );
        var src = GridDataHandler.getImageData( i, "SOURCE", true );
        var cs = GridDataHandler.getImageData( i, "cropStrategy", true );

        return <div className="mediaViewer bg">

                {/* <ImageBackGround src={''} realWidth={640} realHeight={480}></ImageBackGround> */}

                <VideoBackGround src={'https:/www.subidote.com/video/sources/demo2/mp4/videobg-1280x720.mp4'} loop={true} realWidth={640} realHeight={480}></VideoBackGround>

                <ImageBackGround src={''} realWidth={640} realHeight={480}></ImageBackGround> 

                {/* IN THE CASE OF AN IMAGE */}
                ( <ImageItem 
                    frameSize={{w: this.state.browser_width, h: this.state.browser_height }}
                    imageSize={{w: iw, h: ih}}
                    imageSource={src }
                    antialiasing={i.antialiasing} // + "?lol="+ Date.now() 
                    cropStrategy={cs || 'DEFAULT'} 
                    loadingLayer={true}
                    debug={window.WEB_DEBUG.viewerImages}
                /> 
                {/* IN THE CASE OF AN IMAGE */}

                {/* IN THE CASE OF A VIDEO */}
                    {/*                 
                        <div className="viewer-container">
                            <video width="320" height="240" controls autoPlay>
                                <source src={activeItem.src} />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    */}
                {/* IN THE CASE OF A VIDEO */}


                {/* LAYER PICTURE */}
                <div className="layer-next" onClick={()=>{ this.getNextPictureNum(1); }}></div>
                <div className="layer-previous" onClick={()=>{ this.getNextPictureNum(-1); }}></div>
                {/* LAYER PICTURE */}  


                {/* BTN PICTURE */}
                <div className="btn-picture next"><Icon width={70} name={'arrow-right'} clickFunc={()=>{ this.getNextPictureNum(1); }}/></div>
                <div className="btn-picture previous"><Icon width={70} name={'arrow-left'} clickFunc={()=>{ this.getNextPictureNum(-1); }}/></div>
                {/* BTN PICTURE */}  

                <div className="btn close" onClick={closeFunction}><Icon width={70} name={'btn-close'} clickFunc={()=>{}}/></div>
                <div className="title">{/* {gallery.galleryConfig.id} | {gallery.galleryConfig.name} - {gallery.galleryConfig.title} ({gallery.items.length} items)<br/> */}</div>
                <div className="info">{arrPos +1} / {gallery.items.length} - {gallery.items[ arrPos ].name}</div>                         
                        
                {/* <SideInformationPane/> */}
        </div>;
    }
}

export default MediaViewer;