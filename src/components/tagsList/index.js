import React, { Component } from "react";
import TagItem from './../items/tag';
import './index.css';

class tagsList extends Component {
    render() {
        const tags = this.props.listOfTags.map((tagItem, index) => <TagItem 
            onClickFunction={this.props.onClickFunction} 
            key={index} 
            id={tagItem.id} 
            label={tagItem.label} 
        />);
        return (
            <div className="tagsList">{tags}</div>
        );
    }
}
export default tagsList;