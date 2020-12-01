import React from 'react'
import './index.css'
import { Component } from 'react'
import Icon from './../icon'
import ImageItem from './imageItem'
import GridDataHandler from './../landingGrid/gridDataHandler'
import MultiBackGround from './../backgrounds/multiBackGround'
import Avatar from 'react-string-avatar'
import BrandLogo from './../../assets/images/brand/brand-logo.svg'
import Cursor from './../cursor'

class MediaViewer extends Component {

    state = {
        browser_width: window.innerWidth,
        browser_height: window.innerHeight,
        currentPicturePositionInArray: 0,
        loaded: false,
        currentItem: null
    }

    setIsShown = (mouseIsOver) => {
        this.setState({hideMouseArrow: mouseIsOver})
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

    componentDidUpdate() {
        setTimeout(() => {
            var logo = document.getElementById("viewer-brand-logo")
            if (!logo) return

            // 1
            var elmnts = logo.getElementsByTagName("g");
            var fillCol = this.state.currentItem.mainColors?this.state.currentItem.mainColors[2]:"#00F";
            for (let item of elmnts) {
                item.setAttribute("fill", fillCol );
                item.setAttribute("stroke", "");
            }
            // 2
            var elmnts = logo.getElementsByTagName("path");
            for (let item of elmnts) {
                item.setAttribute("fill", fillCol );
                item.setAttribute("stroke", "");
            }

        }, 0);
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

    getVideoTop = () => {
        var top = 0
        if ( this.state.browser_width > this.state.currentItem.target.video.size.w ) {
            top = (this.state.browser_height/2) - ( this.state.currentItem.target.video.size.h / 2 );
        } else {
            var vh = this.state.currentItem.target.video.size.h * this.state.browser_width / this.state.currentItem.target.video.size.w
            top = (this.state.browser_height/2) - ( vh /2 );
        }
        return top +"px"
    };

    getVideoLeft = () => {
        var lft = 0
        if ( this.state.browser_width > this.state.currentItem.target.video.size.w ) {
            lft = (this.state.browser_width/2) - ( this.state.currentItem.target.video.size.w / 2 );
        }
        return lft +"px"
    };    

    render() {

        const {closeFunction, gallery} = this.props;
        if (!gallery) return <div className="mediaViewer error">No items in this gallery!</div>
        var arrPos = this.state.currentPicturePositionInArray;
        if (arrPos === null) {
            window.ajsrnotify({
                title: "Error!",
                msg: "<b>ERROR!</b> Media viewer ERROR. Cod. 101",
                type: "error", // null, "error", "info", "alert", "success"
                position: "center", // null, "right", "left"
                timeout: 2000,
                theme: null // null, "windows-98"
            })
            return null//<div className="mediaViewer error">Media viewer ERROR!</div>
        }
        var gi = gallery.items[arrPos];
        var ITEM_TYPE = (gi.type != undefined && gi.type === 'VIDEO' ) ? 'VIDEO' : 'IMAGE';
        var iw = GridDataHandler.getImageData( gi, "WIDTH", true );
        var ih = GridDataHandler.getImageData( gi, "HEIGHT", true );
        var src = GridDataHandler.getImageData( gi, "SOURCE", true );
        var cs = GridDataHandler.getImageData( gi, "cropStrategy", true );

        var cssStringNoCursor = {};
        if ( window.WEB_CONFIG.viewer.hideMouse ) cssStringNoCursor = {"cursor": "none"};

        var brandLogoStyle = {
            //fill: "#00f", 
            top: window.WEB_CONFIG.brandLogo.top, 
            left: "15px"
        }

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
                        top: this.getVideoTop(),
                        position: "relative",
                        margin: "auto",
                        maxWidth: this.state.currentItem.target.video.size.w +"px",
                        left: this.getVideoLeft(),
                        pointerEvents: "none"
                    }}>
                        <source src={this.state.currentItem.target.video.src} />
                        Your browser does not support the video tag.
                    </video>
                </div> }

                { window.WEB_CONFIG.viewer.hideMouse && !this.state.hideMouseArrow && <Cursor/>}

                <div className="layer-next" style={cssStringNoCursor} onClick={()=>{ this.getNextPictureNum(1); }}></div>
                <div className="layer-previous" style={cssStringNoCursor} onClick={()=>{ this.getNextPictureNum(-1); }}></div>
                { window.WEB_CONFIG.viewer.showNavigationArrows && <>
                    <div className="btn-picture next" onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}><Icon width={70} name={'arrow-right'} clickFunc={()=>{ this.getNextPictureNum(1); }}/></div>
                    <div className="btn-picture previous" onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}><Icon width={70} name={'arrow-left'} clickFunc={()=>{ this.getNextPictureNum(-1); }}/></div>                
                </>}
                { window.WEB_CONFIG.viewer.showImageCounters && <div className="info"><Avatar initials={arrPos +1} /> / {gallery.items.length} - {gallery.items[ arrPos ].name}</div>}
                { window.WEB_CONFIG.viewer.showBrandLogo && <BrandLogo id="viewer-brand-logo" className="brandLogo" style={brandLogoStyle} onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}></BrandLogo>}
                <div className="btn close" onClick={closeFunction} onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}><Icon width={70} name={'btn-close'} clickFunc={()=>{}}/></div>
        </div>;
    }
}

export default MediaViewer;