import React, { Component } from "react";
import './index.css';

class TagItem extends Component {
    render() {
        return (
            <div
                className={(this.props.id === window.WEB_CONFIG.tags.curretSelectedTag)?'tagItem selected':'tagItem'} 
                onClick={()=>this.props.onClickFunction(this.props.id)}>{this.props.label}</div>
        );
    }
}

export default TagItem;