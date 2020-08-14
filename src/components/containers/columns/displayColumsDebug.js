import React, { Component } from "react";
import './displayColumsDebug.css';

class DisplayColumsDebug extends Component {
    render() {
        var _i = this.props.inputs;
        var _c = this.props.calc;
        return (
            <div className="displayColumsDebug">
                
                <b>Input</b><br/>

                maxContainerWidth: {_i.maxContainerWidth}<br/>
                maxNumOfColumns: {_i.maxNumOfColumns}<br/>
                minNumOfCoumns: {_i.minNumOfCoumns}<br/>
                browserWidth: {_i.browserWidth}<br/>
                browserHeight: {_i.browserHeight}<br/>
                minColumWidth: {_i.minColumWidth}<br/>
                vmargin: {_i.vmargin}<br/>
                sideMargin: {_i.sideMargin}<br/>
                hmargin: {_i.hmargin}<br/>
                <br/>

                <b>Output</b><br/>

                container_side_margin: {_c.container_side_margin}<br/>
                container_width: {_c.container_width}<br/>
                times: {_c.times}<br/>
                current_Columns_num: {_c.current_Columns_num}<br/>
                number_of_margins_between_Columns: {_c.number_of_margins_between_Columns}<br/>
                sum_of_margins_between_Columns: {_c.sum_of_margins_between_Columns}<br/>
                width_of_one_column: {_c.width_of_one_column}<br/>
                %_of_one_column: {( _c.width_of_one_column * 100  / _i.browserWidth).toFixed(3) }<br/>
                %_of_column_margin: { ( _i.hmargin * 100 / _i.browserWidth).toFixed(3) }<br/>
            </div>
        );
    }
}

export default DisplayColumsDebug;