import React from 'react'
import './index.css'
import { Component } from 'react'

class Colums extends Component {

    constructor() {
        super();

        this.state = {
            maxColums: 4,
            minCoums: 1,
            browser_width: window.innerWidth, 
            screen_height: window.innerHeight,
            minColumWidth: 320,
            vmargin:10,
            hmargin:15,
            maxWidth: 1440, 
            width: 0, 
            height: 0 
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({ 
            browser_width: window.innerWidth, 
            screen_height: window.innerHeight
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {

        const { browser_width, minColumWidth, hmargin } = this.state; // data-row-num

        var current_colums_num = null;
        var width_of_one_column = null;
        var container_side_margin = 50;
        var container_width = browser_width - (container_side_margin * 2);

        if ( container_width > this.state.maxWidth ) {
            container_width = this.state.maxWidth;
            container_side_margin = Math.trunc( (this.state.browser_width - container_width) / 2 );
        } 

        var times = null;

        if (container_width >= minColumWidth ) {// lets check how many colums can we draw...
            times = (container_width + this.state.hmargin) / minColumWidth;
            current_colums_num = Math.trunc(times);
            if ( current_colums_num > this.state.maxColums ) current_colums_num = this.state.maxColums;
        } else {
            current_colums_num = 1;
            if (container_width < minColumWidth) container_width = minColumWidth;
            container_side_margin = Math.trunc( (this.state.browser_width - container_width) / 2 );
        }

        var number_of_margins_between_colums = current_colums_num - 1;
        var sum_of_margins_between_colums = number_of_margins_between_colums * hmargin;
        width_of_one_column = Math.trunc( (container_width - sum_of_margins_between_colums) / current_colums_num );

        var columnHtml = (colNum) => <div key={colNum} className="debugColumn" style={{
            width: width_of_one_column,
            left: width_of_one_column * ( colNum - 1) + hmargin * ( colNum - 1)
        }}></div>

        const items = [];

        for (let i = 1; i <= current_colums_num; i++) {
            items.push(columnHtml(i));
        }

        var strHtml = <div className="columsContainer" style={{
            width: container_width,
            left: container_side_margin
        }}>
            <div className="debug">
                maxColums: {this.state.maxColums}<br/>
                minCoums: {this.state.minCoums}<br/>
                browser_width: {this.state.browser_width}<br/>
                screen_height: {this.state.screen_height}<br/>
                minColumWidth: {this.state.minColumWidth}<br/>
                vmargin: {this.state.vmargin}<br/>
                hmargin: {this.state.hmargin}<br/>
                <br/>
                container_side_margin: {container_side_margin}<br/>
                container_width: {container_width}<br/>
                times: {times}<br/>
                current_colums_num: {current_colums_num}<br/>
                number_of_margins_between_colums: {number_of_margins_between_colums}<br/>
                sum_of_margins_between_colums: {sum_of_margins_between_colums}<br/>
                width_of_one_column: {width_of_one_column}<br/>
                %_of_one_column: {( width_of_one_column * 100  / this.state.browser_width).toFixed(3) }<br/>
                %_of_column_margin: { ( hmargin * 100 / this.state.browser_width).toFixed(3) }<br/>
            </div>
            {items}
        </div>;

        return strHtml;
    }
}

export default Colums;