import React, { Component }  from 'react';
import './index.css';

// <TitleItem size={5} text={'LOL'}></TitleItem>
class TitleItem extends Component {

    render() {
        var itemData = this.props.imgDat;
        var itemCal = itemData.calculated;
        
        var size = 1;

        if ( this.props.size ) size = this.props.size;
        if ( size > 6 ) size = 6
        
        var classNameString = 'gridItem titleItem '+ "size-" + size;

        return <div 
            key={itemData.name}
            className={ classNameString } 
            style={{
                "width": itemCal.frmW + 0 + "px", 
                "height": itemCal.totalComponetH +"px", 
                "backgroundColor": itemCal.imgBgColor || "transparent", 
                "position": "absolute",
                "top": itemCal.top +"px",
                "left": itemCal.left +"px"
            }}
        >{this.props.text}</div>;
    }
}

export default TitleItem;