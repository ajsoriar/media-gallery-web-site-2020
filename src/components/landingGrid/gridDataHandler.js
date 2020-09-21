import FooterGridDataHandler from "../items/itemFooter/footerDataHandler";

var GridDataHandler = {};

GridDataHandler.getImageData = function (imageData, parameter, reversed) {

    switch (parameter) {

        case 'WIDTH':

            if (reversed) {
                if (imageData.target && imageData.target.size) return imageData.target.size.w;
                if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.w;
                if (imageData.size) return imageData.size.w;
            }

            if (imageData.size) return imageData.size.w;
            if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.w;
            if (imageData.target && imageData.target.size) return imageData.target.size.w;
            return null;

        case 'HEIGHT':

            if (reversed) {
                if (imageData.target && imageData.target.size) return imageData.target.size.h;
                if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.h;
                if (imageData.size) return imageData.size.h;
            }

            if (imageData.size) return imageData.size.h;
            if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.h;
            if (imageData.target && imageData.target.size) return imageData.target.size.h;
            return null;

        case 'SOURCE':

            // Low resolution source will be returned when available. 
            // That is OK in the landing gallery where we want thumbnails but in the pictures viewer 
            // we will need full resolution 1st

            if (reversed) {
                if (imageData.target && imageData.target.src) return imageData.target.src;
                if (imageData.thumbnail && imageData.thumbnail.src) return imageData.thumbnail.src;
                if (imageData.src) return imageData.src;
            }

            if (imageData.src) return imageData.src;
            if (imageData.thumbnail && imageData.thumbnail.src) return imageData.thumbnail.src;
            if (imageData.target && imageData.target.src) return imageData.target.src;
            return null

        case 'COLOR':
            if (imageData.color) return imageData.color;
            if (imageData.thumbnail && imageData.thumbnail.color) return imageData.thumbnail.color;
            if (imageData.target && imageData.target.color) return imageData.target.color;
            return null

        case 'cropStrategy':
            if (imageData.thumbnail && imageData.thumbnail.cropStrategy) return imageData.thumbnail.cropStrategy;
            return null

        default:

            return null;
    }
};

GridDataHandler.getFrameHeightFromWidth = function (imgW, imgH, columnWidth) {
    var calculatedHeigh = columnWidth * imgH / imgW;
    if (calculatedHeigh > imgH) calculatedHeigh = imgH;
    return calculatedHeigh
};

GridDataHandler.getFooterHeight = function( footerData ) { // this.getFooterHeight
    //console.log("[FooterDataHandler.getFooterHeight] footerData: ", footerData );
    if ( !footerData || footerData === false || footerData.length === 0 ) return 0;
    var calculatedHeigh = null;
    var rowHeight = 24;
    var numOfRows = 2;
    calculatedHeigh = rowHeight * numOfRows;
    return calculatedHeigh
};

GridDataHandler.utils = {
    arrOfTops : null,
    getTargetColum : function (temp) { // Smallest number in array and its position
        temp = GridDataHandler.utils.arrOfTops;
        var index = 0;
        var value = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] < value) {
                value = temp[i];
                index = i;
            }
        }
        return index;
    },
    getCurrentTopAndCalculateANewOneUpdatingColumnsRegistry : function (colNum, newItemHeight, ITEM_TOP_MARGIN) {
        var temp = GridDataHandler.utils.arrOfTops;
        var currentTop = temp[colNum];
        var newTop = currentTop + newItemHeight + ITEM_TOP_MARGIN;
        temp[colNum] = newTop;
        return currentTop;
    }
};

GridDataHandler.calculateGrid = function (imagesData, numOfColumns, columnWidth, columnMargin, vMargin, showFooter, footerOverlap, headerOverlap) {

    var ITEM_TOP_MARGIN = vMargin; //columnMargin;
    var COLUMS_MARGIN = columnMargin;

    //console.log("[GridDataHandler.calculateGrid] imagesData: ", imagesData );
    //console.log("[GridDataHandler.calculateGrid] numOfColumns: ", numOfColumns );
    //console.log("[GridDataHandler.calculateGrid] columnWidth: ", columnWidth );

    GridDataHandler.utils.arrOfTops = Array(numOfColumns).fill(0); //[0,0,0,0];

    var lon = imagesData.length;
    if (lon === 0) return [];
    var arr = [];

    for (var i = 0; i < lon; i++) {
        var imgDat = imagesData[i];
        arr.push(imgDat);

        var imgW = 256;
        var imgH = 256;

        if (imgDat.type != "FOLDER") {
            imgW = GridDataHandler.getImageData(imgDat, "WIDTH");
            imgH = GridDataHandler.getImageData(imgDat, "HEIGHT");
        }

        // Footer
        var footerH = 0;
        var footerTopMargin = 0;
        if (showFooter === true) {
            footerH = FooterGridDataHandler.getFooterHeight(imgDat.footer);
            footerTopMargin = footerH > 0 ? window.DEFAULTS.FOOTER_TOP_MARGIN : 0;
        }

        var frmH = this.getFrameHeightFromWidth(imgW, imgH, columnWidth);

        //console.log("[GridDataHandler.calculateGrid] columnWidth, frmH: ", columnWidth, ", ",frmH );

        arr[i].calculated = {
            imgW: imgW,
            imgH: imgH,
            frmW: columnWidth,
            frmH: frmH,
            imgBgColor: imgDat.type != "FOLDER"? this.getImageData(imgDat, "COLOR"): 'transparent',
            footerH: footerH,
            footerTopMargin: footerTopMargin,
            showFooter: showFooter,
            footerOverlap: footerOverlap,
            headerOverlap: headerOverlap,
            imageCenter: {
                x: columnWidth/2,
                y: frmH/2
            }
        }

        arr[i].calculated.footerTopMargin = arr[i].calculated.footerH > 0 ? 10 : 0;
        arr[i].calculated.totalComponetH = arr[i].calculated.frmH + arr[i].calculated.footerTopMargin + arr[i].calculated.footerH;
        var targetColum = GridDataHandler.utils.getTargetColum();
        arr[i].calculated.left = targetColum * (columnWidth + COLUMS_MARGIN);
        arr[i].calculated.top = GridDataHandler.utils.getCurrentTopAndCalculateANewOneUpdatingColumnsRegistry(targetColum, arr[i].calculated.totalComponetH, ITEM_TOP_MARGIN);
    }

    console.log("[GridDataHandler.calculateGrid] arr: ", arr );

    return arr
};

GridDataHandler.removeChildrenItems = function (itemsArr) {
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.parent) {
            continue;
        }
        arr.push(imgDat);
    }
    return arr
};

// imgDat.type
// removeItemsWithNoGalleryPicture

GridDataHandler.removeInfoItems = function (itemsArr) {

    /*
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    var cont = 0;
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.type === "INFO") { // || imgDat.type === "FOLDER") {
            continue;
        } else {
            imgDat.index = cont++;
            arr.push(imgDat);
        }
    }
    return arr
    */

    return this.removeItemsByType(itemsArr, "INFO");
};

GridDataHandler.removeItemsByType = function (itemsArr, itemType) { // itemType: INFO, FOLDER, ...
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    var cont = 0;
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.type === itemType) {
            continue;
        } else {
            imgDat.index = cont++;
            arr.push(imgDat);
        }
    }
    return arr
};

GridDataHandler.generateMediaViewerData = function (itemsArr) {
    itemsArr = this.removeInfoItems(itemsArr);
    itemsArr = this.removeItemsByType(itemsArr, "FOLDER");
    return itemsArr
};

GridDataHandler.getPositionInArrOfGalleryItemsById = function (itemsArr, shearchId) {
    console.log("[GridDataHandler.getPositionInArrOfGalleryItemsById] itemsArr: ", itemsArr);
    console.log("[GridDataHandler.getPositionInArrOfGalleryItemsById] shearchId: ", shearchId);
    var lon = itemsArr.length;
    if (lon === 0) return [];
    for (var i = 0; i < lon; i++) {
        if (itemsArr[i].id === shearchId) return i
    }
    return null
};

GridDataHandler.getTags = function ( items, selectedTag ) {
    if ( selectedTag ==  null) return items;
    var arr = [];
    var i_1 = 0, 
        lon_1 = items.length;
    for (var i_1; i_1 < lon_1; i_1++) { // items
        var i_2 = 0; 
        if (!items[i_1].tags) continue;
        var lon_2 = items[i_1].tags.length || 0;
        for (var i_2; i_2 < lon_2; i_2++) { // tags
            var a = selectedTag;
            var b = items[i_1].tags[i_2]
            if ( a === b ){
                arr.push( items[i_1] );
                break; // breaks out of the loop
            } 
        }
    }
    return arr
}

export default GridDataHandler;