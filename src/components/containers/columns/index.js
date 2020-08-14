import React from 'react';
import './index.css';
import { Component } from 'react';
import ColumnsDataHandler from './columnsDatahandler';
import DisplayColumsDebug from './displayColumsDebug';

class Columns extends Component {

    render() {

        var calc = ColumnsDataHandler.calculateColums(this.props), 
            columns = [];

        var columnHtml = (colNum) => <div key={colNum} className="debugColumn" style={{
            width: calc.width_of_one_column,
            left: calc.width_of_one_column * ( colNum - 1) + this.props.hmargin * ( colNum - 1)
        }}>{colNum}</div>

        for (let i = 1; i <= calc.current_Columns_num; i++) columns.push(columnHtml(i));

        var strHtml = <div className="columnsContainer" style={{ width: calc.container_width, left: calc.container_side_margin }}>
            { this.props.debug && <DisplayColumsDebug calc={calc} inputs={this.props} />}
            {columns}
        </div>;

        return strHtml;
    }
}

export default Columns;