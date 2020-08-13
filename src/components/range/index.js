import React, { Component } from "react";
import './index.css';

class Range extends Component {
    render() {
        return (
            <div>
                <input type="range" id="mmm" name="mmm" className="rangeComponent" min={this.props.min} max={this.props.max} step={this.props.step} defaultValue={this.props.defaultValue} onChange={this.props.onChange} />
                <label htmlFor="mmm"> {this.props.label}: <b>{this.props.value}</b></label>
            </div>
        );
    }
}

export default Range;