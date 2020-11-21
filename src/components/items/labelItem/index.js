import React, { Component }  from 'react';
import './index.css';

class LabelItem extends Component {

    render() {
        var itemData = this.props.imgDat;
        var itemCal = itemData.calculated;
        
        var classNameString = 'gridItem labelItem ';

        return <div 
            key={itemData.name}
            className={ classNameString } 
            style={{
                "width": "100%", 
                "height": itemCal.totalComponetH +"px", 
                //"backgroundColor": itemCal.imgBgColor || "transparent", 
                "position": "absolute",
                "top": itemCal.top +"px",
                "left": itemCal.left +"px"
            }}
        ><div className="label">{this.props.text}</div></div>;
    }
}

export default LabelItem;