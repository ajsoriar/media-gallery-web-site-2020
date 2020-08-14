var FooterDataHandler = {};

FooterDataHandler.getFooterHeight = function( footerData ) {

    console.log("[FooterDataHandler.getFooterHeight] footerData: ", footerData );

    if ( !footerData || footerData === false || footerData.length === 0 ) return 0;

    var calculatedHeigh = null;

    var rowHeight = 24;

    var numOfRows = 2;

    calculatedHeigh = rowHeight * numOfRows;

    return calculatedHeigh
};

export default FooterDataHandler;