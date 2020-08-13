const ColumnsDataHandler = {};

ColumnsDataHandler.calculateColums = function ( props ) {

    var browser_width = parseInt(props.browserWidth);
    //var screen_height = parseInt(props.browserHeight);
    var maxColumns = parseInt(props.maxNumOfColumns);
    var minColumWidth = parseInt(props.minColumWidth);
    var maxWidth = parseInt(props.maxContainerWidth);
    var hmargin = parseInt(props.hmargin);
    var sideMargin = parseInt(props.sideMargin);
    //var vmargin = parseInt(props.vmargin);
    
    var calc =  {
        current_Columns_num: null,
        times: null,
        width_of_one_column: null,
        container_side_margin: sideMargin,
        container_width: null,
        number_of_margins_between_Columns: null,
        sum_of_margins_between_Columns: null
    };

    // - Width of the main container - 
    calc.container_width = browser_width - (calc.container_side_margin * 2)

    if ( calc.container_width > maxWidth ) {
        calc.container_width = maxWidth;
        calc.container_side_margin = Math.trunc( (browser_width - calc.container_width) / 2 );
    } 

    if (calc.container_width >= minColumWidth ) {// lets check how many Columns can we draw...
        calc.times = (calc.container_width + hmargin) / minColumWidth; 
        calc.current_Columns_num = Math.trunc(calc.times);
        if ( calc.current_Columns_num > maxColumns ) calc.current_Columns_num = maxColumns;
    }else {
        calc.current_Columns_num = 1;
        if (calc.container_width < minColumWidth) calc.container_width = minColumWidth;
        calc.container_side_margin = Math.trunc( (browser_width - calc.container_width) / 2 );
    }

    calc.number_of_margins_between_Columns = calc.current_Columns_num - 1;
    calc.sum_of_margins_between_Columns = calc.number_of_margins_between_Columns * hmargin;
    calc.width_of_one_column = Math.trunc( (calc.container_width - calc.sum_of_margins_between_Columns) / calc.current_Columns_num );

    return calc
};

export default ColumnsDataHandler;