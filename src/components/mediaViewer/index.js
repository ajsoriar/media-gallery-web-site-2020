import React from 'react'
import './index.css'
import { Component } from 'react'
import Icon from './../icon'
import ImageItem from './imageItem'
import GridDataHandler from './../landingGrid/gridDataHandler'
import MultiBackGround from './../backgrounds/multiBackGround'
import Avatar from 'react-string-avatar';

class MediaViewer extends Component {

    state = {
        browser_width: window.innerWidth,
        browser_height: window.innerHeight,
        currentPicturePositionInArray: 0,
        loaded: false,
        currentItem: null
    }

    updateDimensions = () => {
        this.setState({
            browser_width: window.innerWidth,
            browser_height: window.innerHeight
        });
    };

    componentDidMount() {
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
        this.setState({ currentItem: null, loading: true}, goNext );
    }

    render() {

        var getVideoTop = () => {
            var top = 0
            if ( this.state.browser_width > this.state.currentItem.target.video.size.w ) {
                top = (this.state.browser_height/2) - ( this.state.currentItem.target.video.size.h / 2 );
            } else {
                var vh = this.state.currentItem.target.video.size.h * this.state.browser_width / this.state.currentItem.target.video.size.w
                top = (this.state.browser_height/2) - ( vh /2 );
            }
            return top +"px"
        };

        var getVideoLeft = () => {
            var lft = 0
            if ( this.state.browser_width > this.state.currentItem.target.video.size.w ) {
                lft = (this.state.browser_width/2) - ( this.state.currentItem.target.video.size.w / 2 );
            }
            return lft +"px"
        };

        const {closeFunction, gallery} = this.props;
        if (!gallery) return <div className="mediaViewer error">No items in this gallery!</div>
        var arrPos = this.state.currentPicturePositionInArray;
        if (arrPos === null) return <div className="mediaViewer error">Media viewer ERROR!</div>
        var gi = gallery.items[arrPos];
        var ITEM_TYPE = (gi.type != undefined && gi.type === 'VIDEO' ) ? 'VIDEO' : 'IMAGE';
        var iw = GridDataHandler.getImageData( gi, "WIDTH", true );
        var ih = GridDataHandler.getImageData( gi, "HEIGHT", true );
        var src = GridDataHandler.getImageData( gi, "SOURCE", true );
        var cs = GridDataHandler.getImageData( gi, "cropStrategy", true );

        return <div className="mediaViewer bg">

                <MultiBackGround gi={gi}></MultiBackGround>

                { (ITEM_TYPE === 'IMAGE') && <ImageItem
                    frameSize={{w: this.state.browser_width, h: this.state.browser_height }}
                    imageSize={{w: iw, h: ih}}
                    imageSource={src }
                    antialiasing={gi.antialiasing}
                    cropStrategy={cs || 'DEFAULT'}
                    loadingLayer={true}
                    debug={window.WEB_DEBUG._GUIDES.viewerImgCalculations}
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
                        maxWidth: this.state.currentItem.target.video.size.w +"px",
                        left: getVideoLeft(),
                        pointerEvents: "none"
                    }}>
                        <source src={this.state.currentItem.target.video.src} />
                        Your browser does not support the video tag.
                    </video>

                </div> }

                {/* { (props.loadingLayer && !this.state.loaded) && <LoadingLayer/> } */}
                {/* { this.state.loading && <LoadingLayer/> } */}

                <div className="layer-next" onClick={()=>{ this.getNextPictureNum(1); }}></div>
                <div className="layer-previous" onClick={()=>{ this.getNextPictureNum(-1); }}></div>
                <div className="btn-picture next"><Icon width={70} name={'arrow-right'} clickFunc={()=>{ this.getNextPictureNum(1); }}/></div>
                <div className="btn-picture previous"><Icon width={70} name={'arrow-left'} clickFunc={()=>{ this.getNextPictureNum(-1); }}/></div>
                <div className="btn close" onClick={closeFunction}><Icon width={70} name={'btn-close'} clickFunc={()=>{}}/></div>
                <div className="title"></div>
                {/* {gallery.galleryConfig.id} | {gallery.galleryConfig.name} - {gallery.galleryConfig.title} ({gallery.items.length} items)<br/> */}
                <div className="info"><Avatar initials={arrPos +1} /> / {gallery.items.length} - {gallery.items[ arrPos ].name}</div>
                {/* <SideInformationPane/> */}
        </div>;
    }
}

export default MediaViewer;